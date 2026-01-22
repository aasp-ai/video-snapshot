import express from 'express';
import cors from 'cors';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { bundle } from '@remotion/bundler';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

export type PlatformPreset = 
    | 'tiktok'
    | 'reels'
    | 'youtube_shorts'
    | 'youtube'
    | 'twitter'
    | 'linkedin'
    | 'instagram_post'
    | 'generic_vertical'
    | 'generic_horizontal';

export type QualityTier = 'draft' | 'standard' | 'high' | 'professional';

export interface ResolutionConfig {
    width: number;
    height: number;
    fps: number;
}

export interface QualityConfig {
    crf: number;
    videoBitrate: string;
    audioBitrate: string;
    x264Preset: string;
}

export const PLATFORM_PRESETS: Record<PlatformPreset, ResolutionConfig> = {
    tiktok: { width: 1080, height: 1920, fps: 30 },
    reels: { width: 1080, height: 1920, fps: 30 },
    youtube_shorts: { width: 1080, height: 1920, fps: 60 },
    youtube: { width: 1920, height: 1080, fps: 60 },
    twitter: { width: 1280, height: 720, fps: 30 },
    linkedin: { width: 1200, height: 627, fps: 30 },
    instagram_post: { width: 1080, height: 1080, fps: 30 },
    generic_vertical: { width: 1080, height: 1920, fps: 30 },
    generic_horizontal: { width: 1920, height: 1080, fps: 30 },
};

export const QUALITY_TIERS: Record<QualityTier, QualityConfig> = {
    draft: {
        crf: 28,
        videoBitrate: '2M',
        audioBitrate: '128k',
        x264Preset: 'ultrafast',
    },
    standard: {
        crf: 23,
        videoBitrate: '5M',
        audioBitrate: '192k',
        x264Preset: 'fast',
    },
    high: {
        crf: 18,
        videoBitrate: '10M',
        audioBitrate: '256k',
        x264Preset: 'medium',
    },
    professional: {
        crf: 15,
        videoBitrate: '20M',
        audioBitrate: '320k',
        x264Preset: 'slow',
    },
};

interface RenderRequest {
    composition: string;
    preset?: PlatformPreset;
    quality?: QualityTier;
    startFrame?: number;
    endFrame?: number;
    audio?: boolean;
}

function sendEvent(res: express.Response, event: string, data: unknown) {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
}

app.post('/api/render', async (req, res) => {
    const {
        composition,
        preset = 'youtube',
        quality = 'high',
        startFrame,
        endFrame,
        audio = true,
    } = req.body as RenderRequest;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const platformConfig = PLATFORM_PRESETS[preset];
        const qualityConfig = QUALITY_TIERS[quality];

        sendEvent(res, 'status', {
            status: 'initializing',
            message: `Starting render for ${preset} (${platformConfig.width}x${platformConfig.height} @ ${platformConfig.fps}fps)`,
            preset,
            quality,
        });

        sendEvent(res, 'status', { status: 'bundling', message: 'Bundling project...' });

        const bundledLocation = await bundle({
            entryPoint: path.join(__dirname, 'src/index.tsx'),
            webpackOverride: (config) => config,
        });

        sendEvent(res, 'status', { status: 'selecting', message: 'Selecting composition...' });

        const selectedComposition = await selectComposition({
            serveUrl: bundledLocation,
            id: composition,
            inputProps: {},
        });

        const outputFilename = `render_${Date.now()}.mp4`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);

        sendEvent(res, 'status', {
            status: 'rendering',
            message: 'Rendering video...',
            filename: outputFilename,
            codec: 'h264',
        });

        await renderMedia({
            composition: selectedComposition,
            serveUrl: bundledLocation,
            outputLocation: outputPath,
            codec: 'h264',
            crf: qualityConfig.crf,
            videoBitrate: qualityConfig.videoBitrate,
            x264Preset: qualityConfig.x264Preset as 'ultrafast' | 'fast' | 'medium' | 'slow',
            audioCodec: 'aac',
            // audioBitrate: qualityConfig.audioBitrate,
            // mute: !audio,
            startFrame,
            endFrame,
            fps: platformConfig.fps,
            width: platformConfig.width,
            height: platformConfig.height,
            onProgress: ({ progress }) => {
                sendEvent(res, 'progress', {
                    progress: Math.round(progress * 100),
                    percentage: progress,
                });
            },
        });

        sendEvent(res, 'complete', {
            success: true,
            filename: outputFilename,
            downloadUrl: `http://localhost:${PORT}/api/download/${outputFilename}`,
            preset,
            quality,
        });

    } catch (error) {
        console.error('Render error:', error);
        sendEvent(res, 'error', {
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    } finally {
        res.end();
    }
});

app.get('/api/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(OUTPUT_DIR, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

app.get('/api/presets', (_req, res) => {
    res.json({
        platforms: Object.keys(PLATFORM_PRESETS),
        qualities: Object.keys(QUALITY_TIERS),
        presets: Object.entries(PLATFORM_PRESETS).map(([name, config]) => ({
            name,
            ...config,
        })),
        // qualities: Object.entries(QUALITY_TIERS).map(([name, config]) => ({
        //     name,
        //     ...config,
        // })),
    });
});

app.get('/api/status', (_req, res) => {
    const files = fs.readdirSync(OUTPUT_DIR);
    res.json({
        status: 'ready',
        message: 'Render API is ready',
        platforms: Object.keys(PLATFORM_PRESETS),
        qualities: Object.keys(QUALITY_TIERS),
        rendersCount: files.length,
    });
});

app.listen(PORT, () => {
    console.log(`🎬 Rendering server running on http://localhost:${PORT}`);
    console.log(`📁 Renders directory: ${OUTPUT_DIR}`);
    console.log(`📱 Platforms: ${Object.keys(PLATFORM_PRESETS).join(', ')}`);
    console.log(`⚡ Qualities: ${Object.keys(QUALITY_TIERS).join(', ')}`);
});

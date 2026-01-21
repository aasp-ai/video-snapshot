import express from 'express';
import cors from 'cors';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { bundle } from '@remotion/bundler';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const OUTPUT_DIR = path.join(__dirname, 'output');

type SocialMediaPreset = 'tiktok' | 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'linkedin';

type QualityConfig = {
    codec: 'h264' | 'prores';
    crf?: number;
    videoBitrate?: `${number}M`;
    x264Preset: 'medium' | 'slow' | 'fast';
    audioCodec: 'aac';
    audioBitrate: `${number}k`;
    description: string;
    maxDuration: string;
    bitrateTarget: string;
};

type CustomOptions = {
    codec?: string;
    crf?: number;
    videoBitrate?: string;
    x264Preset?: string;
    audioCodec?: string;
    audioBitrate?: string;
};

const getQualityConfig = (preset: string | undefined, customOptions?: CustomOptions): QualityConfig => {
    const presets: Record<SocialMediaPreset, QualityConfig> = {
        tiktok: {
            codec: 'h264' as const,
            crf: 20,
            videoBitrate: undefined,
            x264Preset: 'medium',
            audioCodec: 'aac',
            audioBitrate: '128k' as const,
            description: 'TikTok Reels (1080x1920, 60fps recommended)',
            maxDuration: '60 seconds',
            bitrateTarget: '8 Mbps - Optimized for mobile upload'
        },
        instagram: {
            codec: 'h264' as const,
            crf: 20,
            videoBitrate: undefined,
            x264Preset: 'medium',
            audioCodec: 'aac',
            audioBitrate: '192k' as const,
            description: 'Instagram Reels/IGTV (1080x1920, 30-60fps)',
            maxDuration: '90 seconds (Reels), 60 minutes (IGTV)',
            bitrateTarget: '10 Mbps - Higher quality for feed'
        },
        youtube: {
            codec: 'h264' as const,
            crf: 18,
            videoBitrate: undefined,
            x264Preset: 'slow',
            audioCodec: 'aac',
            audioBitrate: '320k' as const,
            description: 'YouTube (1920x1080, 30-60fps)',
            maxDuration: '12 hours max',
            bitrateTarget: '20 Mbps - High quality for streaming'
        },
        twitter: {
            codec: 'h264' as const,
            crf: undefined,
            videoBitrate: '6M' as const,
            x264Preset: 'fast',
            audioCodec: 'aac',
            audioBitrate: '128k' as const,
            description: 'Twitter/X Video (1920x1080, 30fps)',
            maxDuration: '2 minutes 20 seconds',
            bitrateTarget: '6 Mbps - Fast upload, good quality'
        },
        facebook: {
            codec: 'h264' as const,
            crf: 20,
            videoBitrate: undefined,
            x264Preset: 'medium',
            audioCodec: 'aac',
            audioBitrate: '192k' as const,
            description: 'Facebook Reels/Feed (1080x1920 or 1920x1080)',
            maxDuration: '240 minutes',
            bitrateTarget: '8 Mbps - Balanced for social'
        },
        linkedin: {
            codec: 'h264' as const,
            crf: 20,
            videoBitrate: undefined,
            x264Preset: 'medium',
            audioCodec: 'aac',
            audioBitrate: '192k' as const,
            description: 'LinkedIn Video (1920x1080, 30fps)',
            maxDuration: '10 minutes',
            bitrateTarget: '10 Mbps - Professional quality'
        }
    };

    if (customOptions) {
        return {
            codec: (customOptions.codec as 'h264' | 'prores') || 'h264',
            crf: customOptions.crf,
            videoBitrate: (customOptions.videoBitrate as `${number}M`),
            x264Preset: (customOptions.x264Preset as 'medium' | 'slow' | 'fast') || 'medium',
            audioCodec: 'aac',
            audioBitrate: (customOptions.audioBitrate as `${number}k`) || '128k' as const,
            description: 'Custom configuration',
            maxDuration: 'Custom',
            bitrateTarget: 'Custom bitrate'
        };
    }

    const safePreset = (preset as SocialMediaPreset) || 'instagram';
    return presets[safePreset] || presets.instagram;
};

app.post('/api/render', async (req, res) => {
    const { 
        compositionId = 'MotivationReel',
        preset = 'instagram',
        customOptions 
    } = req.body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const sendEvent = (event: string, data: unknown) => {
        res.write(`event: ${event}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
        const qualityConfig = getQualityConfig(preset, customOptions);

        sendEvent('status', { 
            status: 'initializing', 
            message: `Starting render with ${preset} preset...`,
            preset: preset,
            quality: qualityConfig
        });
        
        console.log(`Received render request for compositionId: ${compositionId}, preset: ${preset}`);

        sendEvent('status', { status: 'bundling', message: 'Bundling project...' });

        const bundledLocation = await bundle({
            entryPoint: path.join(__dirname, 'src/index.tsx'),
            webpackOverride: (config) => config,
        });

        sendEvent('status', { status: 'selecting', message: 'Selecting composition...' });

        const composition = await selectComposition({
            serveUrl: bundledLocation,
            id: compositionId,
            inputProps: {},
        });

        const outputFile = path.join(OUTPUT_DIR, `video-${Date.now()}.mp4`);

        sendEvent('status', { 
            status: 'rendering', 
            message: 'Rendering video...', 
            fileName: path.basename(outputFile),
            codec: qualityConfig.codec,
            crf: qualityConfig.crf,
            bitrate: qualityConfig.videoBitrate
        });

        await renderMedia({
            composition,
            serveUrl: bundledLocation,
            outputLocation: outputFile,
            codec: qualityConfig.codec,
            ...(qualityConfig.crf !== undefined && { crf: qualityConfig.crf }),
            ...(qualityConfig.videoBitrate !== undefined && { videoBitrate: qualityConfig.videoBitrate }),
            x264Preset: qualityConfig.x264Preset,
            audioCodec: qualityConfig.audioCodec,
            audioBitrate: qualityConfig.audioBitrate,
            inputProps: {},
            onProgress: ({ progress, renderedFrames, encodedFrames, stitchStage }) => {
                sendEvent('progress', {
                    progress: Math.round(progress * 100),
                    renderedFrames,
                    encodedFrames,
                    stage: stitchStage
                });
            },
        });

        sendEvent('complete', {
            success: true,
            filePath: outputFile,
            fileName: path.basename(outputFile),
            downloadUrl: `http://localhost:3001/api/download/${path.basename(outputFile)}`,
            preset: preset,
            quality: qualityConfig
        });

    } catch (error) {
        console.error('Render error:', error);
        sendEvent('error', {
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    } finally {
        res.end();
    }
});

app.get('/api/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(OUTPUT_DIR, filename);

    res.download(filePath, (err) => {
        if (err) {
            console.error('Download error:', err);
            res.status(404).json({ error: 'File not found' });
        }
    });
});

app.get('/api/status', (_req, res) => {
    res.json({ status: 'ready', message: 'Render API is ready' });
});

app.listen(PORT, () => {
    console.log(`Render API server running on http://localhost:${PORT}`);
});

import { useState } from 'react';
import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle } from '../card';

interface ExportSettingsProps {
    onExport: (options: ExportOptions) => void;
    isExporting?: boolean;
    progress?: number;
    downloadUrl?: string | null;
    renderId?: string | null;
    errorMessage?: string | null;
}

export interface ExportOptions {
    platform: string;
    quality: string;
    format: string;
}

const PLATFORMS = [
    { value: 'tiktok', label: 'TikTok', width: 1080, height: 1920 },
    { value: 'reels', label: 'Reels', width: 1080, height: 1920 },
    { value: 'youtube_shorts', label: 'YouTube Shorts', width: 1080, height: 1920 },
    { value: 'youtube', label: 'YouTube', width: 1920, height: 1080 },
    { value: 'twitter', label: 'Twitter', width: 1280, height: 720 },
    { value: 'linkedin', label: 'LinkedIn', width: 1200, height: 627 },
    { value: 'instagram_post', label: 'Instagram Post', width: 1080, height: 1080 },
];

const QUALITIES = [
    { value: 'draft', label: 'Draft', crf: 28, description: 'Fast render, lower quality' },
    { value: 'standard', label: 'Standard', crf: 23, description: 'Balanced for social media' },
    { value: 'high', label: 'High', crf: 18, description: 'High quality for distribution' },
    { value: 'professional', label: 'Professional', crf: 15, description: 'Maximum quality' },
];

const FORMATS = [
    { value: 'mp4', label: 'MP4 (H.264)', description: 'Most compatible format' },
    { value: 'webm', label: 'WebM (VP9)', description: 'Web optimized' },
];

export const ExportSettings: React.FC<ExportSettingsProps> = ({
    onExport,
    isExporting = false,
    progress = 0,
    downloadUrl = null,
    renderId = null,
    errorMessage = null,
}) => {
    const [platform, setPlatform] = useState('youtube');
    const [quality, setQuality] = useState('high');
    const [format, setFormat] = useState('mp4');

    const selectedPlatform = PLATFORMS.find(p => p.value === platform);
    const selectedQuality = QUALITIES.find(q => q.value === quality);

    const handleExport = () => {
        onExport({ platform, quality, format });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Export Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-3">
                    <label className="text-sm font-medium">Platform Preset</label>
                    <div className="grid grid-cols-4 gap-2">
                        {PLATFORMS.map((p) => (
                            <Button
                                key={p.value}
                                variant={platform === p.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setPlatform(p.value)}
                                className="flex flex-col items-center py-3"
                            >
                                <span className="text-xs">{p.label}</span>
                                <span className="text-[10px] text-muted-foreground">
                                    {p.width}x{p.height}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">Quality</label>
                    <div className="grid grid-cols-2 gap-2">
                        {QUALITIES.map((q) => (
                            <Button
                                key={q.value}
                                variant={quality === q.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setQuality(q.value)}
                                className="flex flex-col items-start py-3"
                            >
                                <span>{q.label}</span>
                                <span className="text-[10px] text-muted-foreground">
                                    CRF: {q.crf}
                                </span>
                            </Button>
                        ))}
                    </div>
                    {selectedQuality && (
                        <p className="text-xs text-muted-foreground">
                            {selectedQuality.description}
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">Format</label>
                    <div className="grid grid-cols-2 gap-2">
                        {FORMATS.map((f) => (
                            <Button
                                key={f.value}
                                variant={format === f.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFormat(f.value)}
                            >
                                {f.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {selectedPlatform && selectedQuality && (
                    <div className="p-3 bg-secondary rounded-lg">
                        <div className="text-sm font-medium mb-2">Export Summary</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                            <div>Platform: {selectedPlatform.label}</div>
                            <div>Resolution: {selectedPlatform.width}x{selectedPlatform.height}</div>
                            <div>Quality: {selectedQuality.label} (CRF {selectedQuality.crf})</div>
                            <div>Format: {FORMATS.find(f => f.value === format)?.label}</div>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                        {errorMessage}
                    </div>
                )}

                {downloadUrl && !isExporting && (
                    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs">
                        <div className="font-medium mb-2">Export Ready</div>
                        {renderId && (
                            <div className="text-muted-foreground mb-2">Render ID: {renderId}</div>
                        )}
                        <a
                            href={downloadUrl}
                            className="text-primary underline"
                            download
                        >
                            Download Video
                        </a>
                    </div>
                )}

                {isExporting ? (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Exporting...</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <Button onClick={handleExport} className="w-full" size="lg">
                        Export Video
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

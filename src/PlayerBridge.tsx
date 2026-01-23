import { useEffect, useMemo, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import type { PlayerRef } from '@remotion/player';
import { MyComposition } from './workspace/Composition';
import { VIDEO_CONFIG } from './workspace/VideoConfig';
import { ExportSettings } from './components/ui/video/ExportSettings';

export const PlayerBridge = () => {
    const playerRef = useRef<PlayerRef>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [renderId, setRenderId] = useState<string | null>(null);
    const [exportError, setExportError] = useState<string | null>(null);

    const compositions = [
        {
            id: VIDEO_CONFIG.id,
            label: 'Workspace Composition',
            component: MyComposition,
            durationInFrames: VIDEO_CONFIG.durationInFrames,
            width: VIDEO_CONFIG.width,
            height: VIDEO_CONFIG.height,
            fps: VIDEO_CONFIG.fps,
        },
    ];

    const [selectedCompositionId, setSelectedCompositionId] = useState(compositions[0].id);
    const selectedComposition = compositions.find((comp) => comp.id === selectedCompositionId) ?? compositions[0];

    const apiBase = (import.meta as any).env?.VITE_AGENT_API_URL || "";
    const sandboxId = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('sandboxId') || (window as any).__SANDBOX_ID__ || "";
    }, []);

    useEffect(() => {
        const handleMsg = (e: MessageEvent) => {
            const player = playerRef.current;
            if(!player) return;

            if(e.data.type === 'PLAY') player.play();
            if(e.data.type === 'PAUSE') player.pause();
            if(e.data.type === 'SEEK') player.seekTo(e.data.frame);
        };
        window.addEventListener('message', handleMsg);
        return () => window.removeEventListener('message', handleMsg);
    }, []);

    const handleExport = async ({ platform, quality, format }: { platform: string; quality: string; format: string }) => {
        setExportError(null);
        setDownloadUrl(null);
        setRenderId(null);

        if (!sandboxId) {
            setExportError("Missing sandboxId. Provide ?sandboxId= in the URL.");
            return;
        }

        setIsExporting(true);
        setProgress(10);

        try {
            const response = await fetch(`${apiBase}/video/export`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sandboxId,
                    compositionId: selectedComposition.id,
                    format,
                    platform,
                    quality,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.error || "Export failed");
            }

            const url = data?.url || "";
            const normalized = url.startsWith("http")
                ? url
                : `${window.location.origin}${url.startsWith("/") ? url : `/${url}`}`;

            setRenderId(data?.renderId || null);
            setDownloadUrl(normalized);
            setProgress(100);
        } catch (error) {
            setExportError(error instanceof Error ? error.message : "Export failed");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 24, overflow: 'hidden', background: 'transparent', boxSizing: 'border-box' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, height: '100%' }}>
                <div style={{ borderRadius: 16, overflow: 'hidden', background: 'transparent' }}>
                    <Player
                        ref={playerRef}
                        key={selectedComposition.id}
                        component={selectedComposition.component}
                        durationInFrames={selectedComposition.durationInFrames}
                        compositionWidth={selectedComposition.width}
                        compositionHeight={selectedComposition.height}
                        fps={selectedComposition.fps}
                        controls={true}
                        style={{ width: '100%', height: '100%' }}
                        autoPlay={false}
                        loop
                        acknowledgeRemotionLicense
                    />
                </div>
                <div style={{ overflowY: 'auto' }}>
                    <ExportSettings
                        onExport={handleExport}
                        isExporting={isExporting}
                        progress={progress}
                        downloadUrl={downloadUrl}
                        renderId={renderId}
                        errorMessage={exportError}
                    />
                </div>
            </div>
        </div>
    );
};

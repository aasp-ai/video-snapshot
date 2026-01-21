import { useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import type { PlayerRef } from '@remotion/player';
import { MyVideo, VIDEO_CONFIG } from './Composition';

type RenderProgress = {
    progress: number;
    renderedFrames?: number;
    encodedFrames?: number;
    stage?: string;
};

type SocialMediaPreset = 'tiktok' | 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'linkedin' | 'custom';

const PRESETS: { key: SocialMediaPreset; label: string; emoji: string }[] = [
    { key: 'tiktok', label: 'TikTok Reels', emoji: '🎵' },
    { key: 'instagram', label: 'Instagram Reels', emoji: '📸' },
    { key: 'youtube', label: 'YouTube', emoji: '▶️' },
    { key: 'twitter', label: 'Twitter/X', emoji: '🐦' },
    { key: 'facebook', label: 'Facebook', emoji: '👥' },
    { key: 'linkedin', label: 'LinkedIn', emoji: '💼' },
    { key: 'custom', label: 'Custom', emoji: '⚙️' }
];

export const PlayerBridge = () => {
    const playerRef = useRef<PlayerRef>(null);
    const [isRendering, setIsRendering] = useState(false);
    const [renderProgress, setRenderProgress] = useState(0);
    const [renderStatus, setRenderStatus] = useState('');
    const [renderedFrames, setRenderedFrames] = useState<number>(0);
    const [encodedFrames, setEncodedFrames] = useState<number>(0);
    const [stage, setStage] = useState<string>('');
    const [selectedPreset, setSelectedPreset] = useState<SocialMediaPreset>('tiktok');
    const [qualityInfo, setQualityInfo] = useState<Record<string, string> | null>(null);
    const [showPresetMenu, setShowPresetMenu] = useState(false);

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

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (showPresetMenu && !(e.target as HTMLElement).closest('.preset-menu-container')) {
                setShowPresetMenu(false);
            }
        };

        if (showPresetMenu) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showPresetMenu]);

    const handleRenderVideo = () => {
        setIsRendering(true);
        setRenderProgress(0);
        setRenderStatus('Connecting to server...');
        setRenderedFrames(0);
        setEncodedFrames(0);
        setStage('');

        const eventSource = new EventSource('http://localhost:3001/api/render');

        eventSource.addEventListener('status', (e: MessageEvent) => {
            const data = JSON.parse(e.data);
            setRenderStatus(data.message);
            if (data.quality) setQualityInfo(data.quality);
        });

        eventSource.addEventListener('progress', (e: MessageEvent) => {
            const data: RenderProgress = JSON.parse(e.data);
            setRenderProgress(data.progress);
            if (data.renderedFrames !== undefined) setRenderedFrames(data.renderedFrames);
            if (data.encodedFrames !== undefined) setEncodedFrames(data.encodedFrames);
            if (data.stage) setStage(data.stage);
        });

        eventSource.addEventListener('complete', (e: MessageEvent) => {
            const data = JSON.parse(e.data);
            setRenderStatus('Download started!');
            eventSource.close();

            window.location.href = data.downloadUrl;

            setTimeout(() => {
                setIsRendering(false);
                setRenderStatus('');
                setStage('');
                setQualityInfo(null);
            }, 2000);
        });

        eventSource.addEventListener('error', (e: MessageEvent) => {
            const data = JSON.parse(e.data);
            setRenderStatus(`Error: ${data.error}`);
            eventSource.close();
            setTimeout(() => {
                setIsRendering(false);
                setRenderStatus('');
                setQualityInfo(null);
            }, 3000);
        });

        const requestBody = JSON.stringify({
            compositionId: VIDEO_CONFIG.id,
            preset: selectedPreset
        });

        fetch('http://localhost:3001/api/render', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        }).catch(error => {
            console.error('Failed to start render:', error);
            setRenderStatus('Failed to start render');
            eventSource.close();
            setIsRendering(false);
        });
    };

    const currentPreset = PRESETS.find(p => p.key === selectedPreset);

    return (
            <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                <div className="preset-menu-container" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowPresetMenu(!showPresetMenu)}
                            disabled={isRendering}
                            style={{
                                padding: '12px 20px',
                                backgroundColor: isRendering ? '#666' : '#1f2937',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: isRendering ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                minWidth: '180px'
                            }}
                        >
                            {currentPreset?.emoji} {currentPreset?.label}
                            <span style={{ marginLeft: 'auto' }}>{showPresetMenu ? '▲' : '▼'}</span>
                        </button>
                        {showPresetMenu && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                marginTop: '8px',
                                right: '0',
                                backgroundColor: '#1f2937',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                                zIndex: 1001,
                                minWidth: '240px'
                            }}>
                                {PRESETS.map(preset => (
                                    <button
                                        key={preset.key}
                                        onClick={() => {
                                            setSelectedPreset(preset.key);
                                            setShowPresetMenu(false);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <span>{preset.emoji}</span>
                                        <span style={{ flex: 1 }}>{preset.label}</span>
                                        {selectedPreset === preset.key && <span>✓</span>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleRenderVideo}
                        disabled={isRendering}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: isRendering ? '#666' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: isRendering ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        {isRendering ? `Rendering... ${renderProgress}%` : 'Render & Save Video'}
                    </button>
                </div>
                {(isRendering || qualityInfo) && (
                    <div style={{
                        padding: '16px 20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minWidth: '320px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                    }}>
                        {isRendering && (
                            <>
                                <div style={{ marginBottom: '12px', fontWeight: 'bold', fontSize: '15px' }}>
                                    {renderStatus}
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span>Progress:</span>
                                        <span style={{ fontWeight: 'bold' }}>{renderProgress}%</span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '10px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: '5px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${renderProgress}%`,
                                            height: '100%',
                                            backgroundColor: '#3b82f6',
                                            transition: 'width 0.3s ease',
                                            borderRadius: '5px'
                                        }} />
                                    </div>
                                </div>
                                {renderedFrames > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span>Rendered Frames:</span>
                                        <span style={{ fontWeight: 'bold' }}>{renderedFrames}</span>
                                    </div>
                                )}
                                {encodedFrames > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span>Encoded Frames:</span>
                                        <span style={{ fontWeight: 'bold' }}>{encodedFrames}</span>
                                    </div>
                                )}
                                {stage && (
                                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255, 0.2)' }}>
                                        <span>Stage: </span>
                                        <span style={{ fontWeight: 'bold', marginLeft: '4px' }}>{stage}</span>
                                    </div>
                                )}
                            </>
                        )}
                        {qualityInfo && !isRendering && (
                            <>
                                <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '15px', color: '#3b82f6' }}>
                                    {currentPreset?.emoji} {currentPreset?.label} Export Settings
                                </div>
                                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                                    <div style={{ marginBottom: '6px', color: '#9ca3af' }}>{qualityInfo.description}</div>
                                    <div style={{ marginBottom: '6px' }}>
                                        <span style={{ fontWeight: '500' }}>Duration:</span> {qualityInfo.maxDuration}
                                    </div>
                                    <div style={{ marginBottom: '6px' }}>
                                        <span style={{ fontWeight: '500' }}>Bitrate:</span> {qualityInfo.bitrateTarget}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#9ca3af' }}>
                                        <div>CRF: {qualityInfo.crf}</div>
                                        <div>Video: {qualityInfo.videoBitrate}</div>
                                        <div>Audio: {qualityInfo.audioBitrate}</div>
                                        <div>Codec: {qualityInfo.codec}</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            <Player
                ref={playerRef}
                component={MyVideo}
                durationInFrames={VIDEO_CONFIG.durationInFrames}
                compositionWidth={VIDEO_CONFIG.width}
                compositionHeight={VIDEO_CONFIG.height}
                fps={VIDEO_CONFIG.fps}
                controls={true}
                style={{ width: '100%', height: '100%' }}
                autoPlay={true}
                loop
                acknowledgeRemotionLicense 
            />
        </div>
    );
};

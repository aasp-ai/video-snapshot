import { useState, useEffect } from 'react';
import { useCurrentFrame, AbsoluteFill, Sequence, Audio } from 'remotion';
import { useAudioData } from '@remotion/media-utils';

export const MediaLoader = () => {
    const frame = useCurrentFrame();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        setAudioUrl('/audio.mp3');
        setVideoUrl('/video.mp4');
    }, []);

    const videoOpacity = Math.min(1, (frame - 245) / 15);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <Sequence from={240} durationInFrames={60}>
                {audioUrl && (
                    <Audio 
                        src={audioUrl} 
                        volume={1}
                    />
                )}
                
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '30%',
                    transform: 'translateX(-50%)',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: videoOpacity
                }}>
                    <div style={{ textAlign: 'center', color: 'white' }}>
                        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎵</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Audio Loading</div>
                        <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.7 }}>
                            {audioUrl ? 'Audio source ready' : 'Loading...'}
                        </div>
                    </div>
                </div>

                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '60%',
                    transform: 'translateX(-50%)',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: videoOpacity
                }}>
                    <div style={{ textAlign: 'center', color: 'white' }}>
                        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎬</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Video Loading</div>
                        <div style={{ fontSize: '16px', marginTop: '10px', opacity: 0.7 }}>
                            {videoUrl ? 'Video source ready' : 'Loading...'}
                        </div>
                    </div>
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};

export const AudioVisualizer = () => {
    const frame = useCurrentFrame();
    const audioUrl = '/audio.mp3';
    const audioData = useAudioData(audioUrl);

    if (!audioData) {
        return (
            <div style={{
                position: 'absolute',
                left: '20px',
                bottom: '20px',
                background: 'rgba(0, 0, 0, 0.8)',
                padding: '15px',
                borderRadius: '10px',
                color: 'white'
            }}>
                Loading audio...
            </div>
        );
    }

    const frequencies = Array.from({ length: 32 }, (_, i) => {
        const sampleIndex = Math.floor((frame / 30) * audioData.sampleRate) * (i + 1);
        const sample = audioData.channelWaveforms?.[0]?.[sampleIndex] || 0;
        return Math.abs(sample) * 100;
    });

    return (
        <div style={{
            position: 'absolute',
            left: '20px',
            bottom: '20px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '3px',
            height: '100px',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '10px',
            borderRadius: '10px'
        }}>
            {frequencies.map((freq, i) => (
                <div
                    key={i}
                    style={{
                        width: '8px',
                        height: `${freq}%`,
                        background: `hsl(${(i / 32) * 360}, 70%, 50%)`,
                        borderRadius: '4px',
                        transition: 'height 0.05s ease'
                    }}
                />
            ))}
        </div>
    );
};

export const ImageGallery = () => {
    const frame = useCurrentFrame();
    const images = [
        { url: '/image1.jpg', alt: 'Image 1' },
        { url: '/image2.jpg', alt: 'Image 2' },
        { url: '/image3.jpg', alt: 'Image 3' }
    ];

    const currentIndex = Math.floor(frame / 30) % images.length;

    return (
        <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '300px',
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '20px',
            overflow: 'hidden'
        }}>
            <img
                src={images[currentIndex].url}
                alt={images[currentIndex].alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+SW1hZ2UgTG9hZGluZzwvdGV4dD48L3N2Zz4=';
                }}
            />
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '5px 10px',
                borderRadius: '5px',
                color: 'white',
                fontSize: '14px'
            }}>
                {images[currentIndex].alt}
            </div>
        </div>
    );
};

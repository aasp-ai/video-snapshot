import React from 'react';
import { Button } from '../ui/button';

interface PlaybackControlsProps {
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onPrev: () => void;
    onNext: () => void;
    onFirst: () => void;
    onLast: () => void;
    onSpeedChange?: (speed: number) => void;
    speed?: number;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
    isPlaying,
    onPlay,
    onPause,
    onPrev,
    onNext,
    onFirst,
    onLast,
    onSpeedChange,
    speed = 1,
}) => {
    const speeds = [0.25, 0.5, 1, 1.5, 2];

    return (
        <div className="flex flex-col items-center gap-4 p-4 bg-card rounded-lg">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={onFirst}>
                    ⏮
                </Button>
                <Button variant="outline" size="icon" onClick={onPrev}>
                    ⏪
                </Button>
                <Button
                    variant={isPlaying ? 'secondary' : 'default'}
                    size="icon"
                    onClick={isPlaying ? onPause : onPlay}
                    className="w-12 h-12"
                >
                    {isPlaying ? '⏸' : '▶'}
                </Button>
                <Button variant="outline" size="icon" onClick={onNext}>
                    ⏩
                </Button>
                <Button variant="outline" size="icon" onClick={onLast}>
                    ⏭
                </Button>
            </div>
            {onSpeedChange && (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Speed:</span>
                    {speeds.map((s) => (
                        <Button
                            key={s}
                            variant={speed === s ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => onSpeedChange(s)}
                            className="w-12"
                        >
                            {s}x
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

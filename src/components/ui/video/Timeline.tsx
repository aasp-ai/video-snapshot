import { useState } from 'react';
import { Slider } from '../slider';
import { Button } from '../button';

interface TimelineProps {
    duration: number;
    currentFrame: number;
    onSeek: (frame: number) => void;
    fps?: number;
}

export const Timeline: React.FC<TimelineProps> = ({
    duration,
    currentFrame,
    onSeek,
    fps = 30,
}) => {
    const [localFrame, setLocalFrame] = useState(currentFrame);

    const formatTime = (frames: number) => {
        const seconds = Math.floor(frames / fps);
        const remainingFrames = frames % fps;
        return `${seconds.toString().padStart(2, '0')}:${remainingFrames.toString().padStart(2, '0')}`;
    };

    const handleChange = (value: number[]) => {
        setLocalFrame(value[0]);
    };

    const handleCommit = () => {
        onSeek(localFrame);
    };

    return (
        <div className="flex flex-col gap-2 p-4 bg-card rounded-lg">
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(localFrame)}</span>
                <span>{formatTime(duration)}</span>
            </div>
            <Slider
                value={[localFrame]}
                max={duration}
                step={1}
                onValueChange={handleChange}
                onValueCommit={handleCommit}
            />
            <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onSeek(0)}>
                    ⏮
                </Button>
                <Button variant="outline" size="sm" onClick={() => onSeek(Math.max(0, currentFrame - 30))}>
                    ⏪
                </Button>
                <Button variant="outline" size="sm" onClick={() => onSeek(Math.min(duration, currentFrame + 30))}>
                    ⏩
                </Button>
                <Button variant="outline" size="sm" onClick={() => onSeek(duration)}>
                    ⏭
                </Button>
            </div>
        </div>
    );
};

interface FrameCounterProps {
    current: number;
    total: number;
    fps?: number;
}

export const FrameCounter: React.FC<FrameCounterProps> = ({
    current,
    total,
    fps = 30,
}) => {
    const formatTime = (frames: number) => {
        const seconds = Math.floor(frames / fps);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const progress = (current / total) * 100;

    return (
        <div className="flex items-center gap-4 px-4 py-2 bg-card rounded-lg">
            <div className="text-lg font-mono">
                <span className="text-primary">{formatTime(current)}</span>
                <span className="text-muted-foreground"> / </span>
                <span>{formatTime(total)}</span>
            </div>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="text-sm text-muted-foreground">
                {Math.round(progress)}%
            </div>
        </div>
    );
};

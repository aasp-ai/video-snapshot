import { Easing, useCurrentFrame } from 'remotion';

export const FPS = 30;

export function secondsToFrames(seconds: number): number {
    return Math.round(seconds * FPS);
}

export function framesToSeconds(frames: number): number {
    return frames / FPS;
}

export function formatTimecode(frames: number): string {
    const totalSeconds = Math.floor(framesToSeconds(frames));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const frameRemainder = frames % FPS;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${frameRemainder.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${frameRemainder.toString().padStart(2, '0')}`;
}

export function getFrameRange(startSeconds: number, endSeconds: number): [number, number] {
    return [secondsToFrames(startSeconds), secondsToFrames(endSeconds)];
}

export function useFrameProgress(startFrame: number, durationFrames: number) {
    const frame = useCurrentFrame();
    const progress = Math.max(0, Math.min(1, (frame - startFrame) / durationFrames));
    return progress;
}

export function easeInOut(t: number): number {
    return Easing.inOut(t);
}

export function easeOut(t: number): number {
    return Easing.out(t);
}

export function easeIn(t: number): number {
    return Easing.in(t);
}

export function springConfig(damping: number = 200, mass: number = 1) {
    return { damping, mass };
}

export function loopFrame(frame: number, totalFrames: number): number {
    return frame % totalFrames;
}

export function pingPong(frame: number, totalFrames: number): number {
    const halfCycle = totalFrames / 2;
    const cyclePosition = frame % totalFrames;
    if (cyclePosition < halfCycle) {
        return cyclePosition / halfCycle;
    }
    return 1 - (cyclePosition - halfCycle) / halfCycle;
}

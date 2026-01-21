const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;
const SCENE_SECONDS = [4, 4, 4, 4, 4, 4, 6, 5, 2, 8];

// Calculate frames
const SCENE_FRAMES = SCENE_SECONDS.map(s => Math.round(s * FPS));
const TOTAL_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);

export const VIDEO_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    fps: FPS,
    durationInFrames: TOTAL_FRAMES,
    id: "MotivationReel"
};
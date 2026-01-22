export const VIDEO_CONFIG = {
    fps: 30,
    defaultDuration: 5,
    defaultWidth: 1920,
    defaultHeight: 1080,
};

export const SOCIAL_SIZES = {
    tiktok: { width: 1080, height: 1920 },
    reels: { width: 1080, height: 1920 },
    youtube_shorts: { width: 1080, height: 1920 },
    youtube: { width: 1920, height: 1080 },
    twitter: { width: 1280, height: 720 },
    linkedin: { width: 1200, height: 627 },
    instagram_post: { width: 1080, height: 1080 },
};

export const SCENE_TRANSITIONS = {
    fade: 'fade',
    slide: 'slide',
    wipe: 'wipe',
    zoom: 'zoom',
    blur: 'blur',
} as const;

export const TEXT_ANIMATIONS = {
    reveal: 'reveal',
    typewriter: 'typewriter',
    glitch: 'glitch',
    slideUp: 'slideUp',
    scaleIn: 'scaleIn',
    blurIn: 'blurIn',
} as const;

export const CHART_TYPES = {
    bar: 'bar',
    line: 'line',
    pie: 'pie',
    donut: 'donut',
    progress: 'progress',
} as const;

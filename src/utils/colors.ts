export const COLOR_PRESETS = {
    dark: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        primary: '#3b82f6',
        secondary: '#1e1e1e',
        accent: '#8b5cf6',
        muted: '#262626',
        border: '#333333',
    },
    light: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        primary: '#3b82f6',
        secondary: '#f5f5f5',
        accent: '#8b5cf6',
        muted: '#f5f5f5',
        border: '#e5e5e5',
    },
    neon: {
        background: '#000000',
        foreground: '#ffffff',
        primary: '#00ff88',
        secondary: '#1a1a2e',
        accent: '#ff00ff',
        muted: '#0f0f1a',
        border: '#00ff88',
    },
    sunset: {
        background: '#1a0b2e',
        foreground: '#ffffff',
        primary: '#ff6b6b',
        secondary: '#2d1b4e',
        accent: '#ffa500',
        muted: '#1a0b2e',
        border: '#ff6b6b',
    },
    ocean: {
        background: '#0a192f',
        foreground: '#e6f1ff',
        primary: '#64ffda',
        secondary: '#112240',
        accent: '#00bcd4',
        muted: '#0a192f',
        border: '#64ffda',
    },
    forest: {
        background: '#0d1117',
        foreground: '#c9d1d9',
        primary: '#3fb950',
        secondary: '#161b22',
        accent: '#7ee787',
        muted: '#0d1117',
        border: '#3fb950',
    },
};

export type ColorPresetName = keyof typeof COLOR_PRESETS;

export function getColorPreset(name: ColorPresetName) {
    return COLOR_PRESETS[name] || COLOR_PRESETS.dark;
}

export const GRADIENTS = {
    'primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'sunset': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'ocean': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'forest': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'midnight': 'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)',
    'warm': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'cool': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'dark': 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
    'neon': 'linear-gradient(135deg, #ff00cc 0%, #333399 100%)',
    'fire': 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
};

export type GradientName = keyof typeof GRADIENTS;

export function getGradient(name: GradientName) {
    return GRADIENTS[name] || GRADIENTS.primary;
}

export const SHADOWS = {
    'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
    'glow-accent': '0 0 20px rgba(139, 92, 246, 0.5)',
    'glow-success': '0 0 20px rgba(63, 185, 80, 0.5)',
};

export type ShadowName = keyof typeof SHADOWS;

export function getShadow(name: ShadowName) {
    return SHADOWS[name];
}

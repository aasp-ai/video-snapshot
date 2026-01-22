export interface FontConfig {
    family: string;
    category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
    weights: number[];
    variants: string[];
}

export const CURATED_FONTS: FontConfig[] = [
    {
        family: 'Inter',
        category: 'sans-serif',
        weights: [400, 500, 600, 700, 800, 900],
        variants: ['regular', 'medium', 'semibold', 'bold', 'extrablack'],
    },
    {
        family: 'Poppins',
        category: 'sans-serif',
        weights: [400, 500, 600, 700, 800, 900],
        variants: ['regular', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    {
        family: 'Montserrat',
        category: 'sans-serif',
        weights: [400, 500, 600, 700, 800, 900],
        variants: ['regular', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    {
        family: 'Playfair Display',
        category: 'serif',
        weights: [400, 500, 600, 700, 800, 900],
        variants: ['regular', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    {
        family: 'Oswald',
        category: 'display',
        weights: [400, 500, 600, 700],
        variants: ['regular', 'medium', 'semibold', 'bold'],
    },
    {
        family: 'Bebas Neue',
        category: 'display',
        weights: [400],
        variants: ['regular'],
    },
    {
        family: 'Anton',
        category: 'display',
        weights: [400],
        variants: ['regular'],
    },
    {
        family: 'Roboto',
        category: 'sans-serif',
        weights: [400, 500, 700],
        variants: ['regular', 'medium', 'bold'],
    },
    {
        family: 'Open Sans',
        category: 'sans-serif',
        weights: [400, 500, 600, 700, 800],
        variants: ['regular', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    {
        family: 'Lato',
        category: 'sans-serif',
        weights: [400, 700],
        variants: ['regular', 'bold'],
    },
    {
        family: 'JetBrains Mono',
        category: 'monospace',
        weights: [400, 500, 700],
        variants: ['regular', 'medium', 'bold'],
    },
    {
        family: 'Fira Code',
        category: 'monospace',
        weights: [400, 500, 600, 700],
        variants: ['regular', 'medium', 'semibold', 'bold'],
    },
    {
        family: 'Dancing Script',
        category: 'handwriting',
        weights: [400, 500, 600, 700],
        variants: ['regular', 'medium', 'semibold', 'bold'],
    },
    {
        family: 'Permanent Marker',
        category: 'handwriting',
        weights: [400],
        variants: ['regular'],
    },
    {
        family: 'Space Mono',
        category: 'monospace',
        weights: [400, 700],
        variants: ['regular', 'bold'],
    },
];

export function getGoogleFontsCSS(): string {
    const fontFamilies = CURATED_FONTS.map((font) => {
        const weights = font.weights.join(';');
        return `family=${font.family.replace(/ /g, '+')}:wght@${weights}`;
    }).join('&');

    return `
@import url('https://fonts.googleapis.com/css2?${fontFamilies}&display=swap');
`;
}

export function getGoogleFontsUrl(): string {
    const fontFamilies = CURATED_FONTS.map((font) => {
        const weights = font.weights.join(';');
        return `family=${font.family.replace(/ /g, '+')}:wght@${weights}`;
    }).join('&');

    return `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;
}

export function getFontOptions() {
    return CURATED_FONTS.map((font) => ({
        value: font.family,
        label: font.family,
        category: font.category,
    }));
}

export function getFontsByCategory(category: FontConfig['category']) {
    return CURATED_FONTS.filter((font) => font.category === category);
}

export function getDefaultFont(): FontConfig {
    return CURATED_FONTS[0];
}

export function getDisplayFont(): FontConfig {
    return CURATED_FONTS.find((f) => f.family === 'Bebas Neue') || CURATED_FONTS[4];
}

export function getMonospaceFont(): FontConfig {
    return CURATED_FONTS.find((f) => f.family === 'JetBrains Mono') || CURATED_FONTS[10];
}

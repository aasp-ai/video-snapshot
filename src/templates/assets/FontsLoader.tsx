import { AbsoluteFill, Sequence, interpolate } from 'remotion';

export const FontsLoader = () => {
    const frame = 0;
    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <Sequence from={0} durationInFrames={270}>
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%)`,
                    opacity,
                    width: '800px',
                    height: '600px',
                    background: 'rgba(0, 0, 0, 0.9)',
                    borderRadius: '20px',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px'
                }}>
                    <FontDemo 
                        fontFamily="Roboto" 
                        fontName="Roboto" 
                        text="Clean and Modern"
                        color="#ffffff"
                    />
                    
                    <FontDemo 
                        fontFamily="Open Sans" 
                        fontName="Open Sans" 
                        text="Friendly and Readable"
                        color="#0070f3"
                    />
                    
                    <FontDemo 
                        fontFamily="Montserrat" 
                        fontName="Montserrat" 
                        text="Geometric and Bold"
                        color="#ff6b6b"
                    />
                    
                    <FontDemo 
                        fontFamily="Playfair Display" 
                        fontName="Playfair Display" 
                        text="Elegant and Stylish"
                        color="#00ff00"
                    />
                    
                    <FontDemo 
                        fontFamily="Oswald" 
                        fontName="Oswald" 
                        text="Strong and Impactful"
                        color="#ffff00"
                    />
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};

interface FontDemoProps {
    fontFamily: string;
    fontName: string;
    text: string;
    color: string;
}

const FontDemo = ({ fontFamily, fontName, text, color }: FontDemoProps) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            borderLeft: `4px solid ${color}`
        }}>
            <div style={{
                flex: 1,
                fontSize: '36px',
                fontWeight: 'bold',
                fontFamily,
                color
            }}>
                {text}
            </div>
            <div style={{
                padding: '8px 16px',
                background: color,
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white'
            }}>
                {fontName}
            </div>
        </div>
    );
};

export const TypographyShowcase = () => {
    const frame = 0;
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const y = interpolate(frame, [0, 15], [50, 0], { extrapolateRight: 'clamp' });

    return (
        <Sequence from={30} durationInFrames={270}>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '10%',
                transform: `translate(-50%, ${y}px)`,
                opacity,
                textAlign: 'center',
                width: '100%'
            }}>
                <h1 style={{
                    fontFamily: 'Playfair Display',
                    fontSize: '72px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '10px',
                    textShadow: '0 0 30px rgba(0, 112, 243, 0.5)'
                }}>
                    Typography
                </h1>
                <p style={{
                    fontFamily: 'Roboto',
                    fontSize: '24px',
                    color: 'rgba(255, 255, 255, 0.7)'
                }}>
                    Powered by @remotion/google-fonts
                </p>
            </div>
        </Sequence>
    );
};

export const AnimatedText = () => {
    const frame = 0;
    const characters = "AI VIDEO COMPOSITION".split('');

    return (
        <div style={{
            position: 'absolute',
            left: '50%',
            top: '85%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '5px'
        }}>
            {characters.map((char, i) => {
                const delay = i * 3;
                const opacity = interpolate(frame, [delay, delay + 15], [0, 1]);
                const y = interpolate(frame, [delay, delay + 15], [30, 0]);
                const scale = interpolate(frame, [delay, delay + 15], [0.5, 1]);
                const color = `hsl(${(frame + i * 20) % 360}, 70%, 60%)`;

                return (
                    <span
                        key={i}
                        style={{
                            fontFamily: 'Montserrat',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            color,
                            opacity,
                            transform: `translateY(${y}px) scale(${scale})`,
                            display: 'inline-block',
                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                );
            })}
        </div>
    );
};

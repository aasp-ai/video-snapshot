import { AbsoluteFill, Sequence, interpolate } from 'remotion';
import { Lottie, type LottieAnimationData } from '@remotion/lottie';

const lottieAnimation: LottieAnimationData = {
    v: '5.7.0',
    fr: 30,
    ip: 0,
    op: 90,
    w: 500,
    h: 500,
    nm: 'AI Composition',
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: 'Circle Layer',
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                r: { a: 1, k: [
                    { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
                    { t: 90, s: [360] }
                ]},
                p: { a: 0, k: [250, 250, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 1, k: [
                    { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [100, 100, 100] },
                    { t: 45, s: [150, 150, 100] },
                    { t: 90, s: [100, 100, 100] }
                ]}
            },
            ao: 0,
            shapes: [{
                ty: 'gr',
                it: [{
                    d: 1,
                    ty: 'el',
                    s: { a: 0, k: [200, 200] },
                    p: { a: 0, k: [0, 0] }
                }, {
                    ty: 'fl',
                    c: { a: 0, k: [0, 0.44, 0.95, 1] }
                }]
            }],
            ip: 0,
            op: 90,
            st: 0
        }
    ]
};

export const LottieAnimation = () => {
    const frame = 0;
    const opacity = interpolate(frame, [270, 285], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <Sequence from={270} durationInFrames={30}>
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{
                        width: '300px',
                        height: '300px',
                        background: 'rgba(0, 0, 0, 0.9)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 60px rgba(0, 112, 243, 0.5)'
                    }}>
                        <Lottie
                            animationData={lottieAnimation}
                            style={{ width: '200px', height: '200px' }}
                        />
                    </div>
                    
                    <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0 0 20px rgba(0, 112, 243, 0.8)'
                    }}>
                        Lottie Animation
                    </div>
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};

export const LottiePlayer = ({ animationData, loop }: { 
    animationData: LottieAnimationData; 
    loop: boolean 
}) => {
    return (
        <Lottie
            animationData={animationData}
            loop={loop}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export const AnimatedIcon = ({ frame, size = 100 }: { frame: number; size?: number }) => {
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const scale = interpolate(frame, [0, 15], [0.5, 1], { extrapolateRight: 'clamp' });

    return (
        <div style={{
            opacity,
            transform: `scale(${scale})`,
            width: size,
            height: size
        }}>
            <Lottie
                animationData={lottieAnimation}
                loop={true}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export const LottieShowcase = () => {
    const frame = 0;

    const animations = [
        { id: 1, delay: 0, x: 50, y: 50, size: 80 },
        { id: 2, delay: 10, x: 70, y: 50, size: 60 },
        { id: 3, delay: 20, x: 50, y: 75, size: 70 },
        { id: 4, delay: 30, x: 70, y: 75, size: 50 }
    ];

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {animations.map((anim) => (
                <div
                    key={anim.id}
                    style={{
                        position: 'absolute',
                        left: `${anim.x}%`,
                        top: `${anim.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: anim.size,
                        height: anim.size
                    }}
                >
                    <AnimatedIcon frame={frame - anim.delay} size={anim.size} />
                </div>
            ))}
        </AbsoluteFill>
    );
};

import { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import gsap from 'gsap';

export const GSAPTimeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.children;

        const tl = gsap.timeline({ paused: true });

        tl.from(elements[0], {
            x: -200,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        })
        .from(elements[1], {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.5')
        .from(elements[2], {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .to(elements[0], {
            x: 0,
            y: -20,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        }, '+=0.5')
        .to(elements[1], {
            rotation: 360,
            duration: 3,
            ease: 'none',
            repeat: -1
        }, '-=1')
        .to(elements[2], {
            scale: 1.2,
            duration: 1,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        }, '-=2');

        tlRef.current = tl;

        return () => {
            tl.kill();
        };
    }, []);

    useEffect(() => {
        if (tlRef.current) {
            tlRef.current.seek(frame / fps);
        }
    }, [frame, fps]);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <div 
                ref={containerRef}
                style={{
                    position: 'absolute',
                    left: '10%',
                    top: '35%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px'
                }}
            >
                <div style={{
                    width: '150px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #0070f3, #00d4ff)',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 112, 243, 0.5)'
                }} />
                
                <div style={{
                    width: '150px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #ff6b6b, #ff9933)',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(255, 107, 107, 0.5)'
                }} />
                
                <div style={{
                    width: '150px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #00ff00, #00cc99)',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 255, 0, 0.5)'
                }} />
            </div>
        </AbsoluteFill>
    );
};

export const GSAPTextAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({ paused: true });

        const text = containerRef.current;

        tl.from(text, {
            opacity: 0,
            scale: 0.5,
            filter: 'blur(20px)',
            duration: 1.5,
            ease: 'power3.out'
        })
        .to(text, {
            textShadow: '0 0 40px rgba(0, 112, 243, 0.8)',
            duration: 1,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });

        return () => {
            tl.kill();
        };
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            const tl = gsap.timeline({ paused: true });
            tl.fromTo(
                containerRef.current,
                { opacity: 0, scale: 0.5, filter: 'blur(20px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
            );
            tl.seek(frame / fps);
            tl.kill();
        }
    }, [frame, fps]);

    return (
        <div 
            ref={containerRef}
            style={{
                position: 'absolute',
                left: '50%',
                top: '70%',
                transform: 'translateX(-50%)',
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center'
            }}
        >
            GSAP Animation
        </div>
    );
};

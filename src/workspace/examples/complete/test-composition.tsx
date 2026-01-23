import React, { useState } from 'react';
import { Composition, useCurrentFrame } from 'remotion';
import { Heading, Subheading, GlitchText, Typewriter, SplitText } from '../../../templates/typography';
import { GeometricShapes, GradientOverlay, PatternBackground, BorderGlow, NoiseTexture } from '../../../templates/graphics';
import { BarChart, LineChart, ProgressRing, DonutChart } from '../../../templates/charts';
import { Fade, Slide, Wipe, Zoom } from '../../../templates/transitions';
import { LowerThird, Captions, CenterText } from '../../../templates/overlay';
import { ImageFrame, AudioBars } from '../../../templates/media';
import { Entrance, Continuous, Countdown } from '../../../templates/animation';
import { getColorPreset, GRADIENTS } from '../../../utils/colors';

const FRAMES_PER_SCENE = 120;
const TOTAL_SCENES = 8;

export const TestComposition = () => {
    return (
        <>
            <Composition
                id="TestComposition"
                component={TestCompositionWrapper}
                durationInFrames={FRAMES_PER_SCENE * TOTAL_SCENES + 60}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};

const TestCompositionWrapper = () => {
    const frame = useCurrentFrame();
    const currentScene = Math.floor(frame / FRAMES_PER_SCENE);
    const sceneProgress = (frame % FRAMES_PER_SCENE) / FRAMES_PER_SCENE;

    return (
        <div style={{ width: '100%', height: '100%', background: '#0a0a0a' }}>
            <NoiseTexture opacity={0.03} />
            {currentScene === 0 && <Scene1 frame={frame} progress={sceneProgress} />}
            {currentScene === 1 && <Scene2 frame={frame} progress={sceneProgress} />}
            {currentScene === 2 && <Scene3 frame={frame} progress={sceneProgress} />}
            {currentScene === 3 && <Scene4 frame={frame} progress={sceneProgress} />}
            {currentScene === 4 && <Scene5 frame={frame} progress={sceneProgress} />}
            {currentScene === 5 && <Scene6 frame={frame} progress={sceneProgress} />}
            {currentScene === 6 && <Scene7 frame={frame} progress={sceneProgress} />}
            {currentScene === 7 && <Scene8 frame={frame} progress={sceneProgress} />}
            
            <SceneIndicator scene={currentScene + 1} total={TOTAL_SCENES} />
        </div>
    );
};

const SceneIndicator = ({ scene, total }: { scene: number; total: number }) => (
    <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        padding: '8px 16px',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: 8,
        fontFamily: 'JetBrains Mono',
        fontSize: 14,
        color: '#ffffff',
    }}>
        Scene {scene} / {total}
    </div>
);

const Scene1 = ({ frame, progress }: { frame: number; progress: number }) => {
    const colors = getColorPreset('neon');
    
    return (
        <div style={{ position: 'absolute', inset: 0, background: colors.background }}>
            <GradientOverlay type="neon" opacity={0.8} />
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Entrance animation="scaleIn" duration={30}>
                    <GlitchText
                        text="TEMPLATE TEST"
                        size={80}
                        startFrame={0}
                    />
                </Entrance>
                <div style={{ marginTop: 30 }}>
                    <Typewriter
                        text="Testing all templates in one composition"
                        speed={3}
                        startFrame={30}
                    />
                </div>
            </div>
            <LowerThird
                name="Test Suite"
                title="Template Verification"
                startFrame={60}
                duration={120}
            />
        </div>
    );
};

const Scene2 = ({ frame, progress }: { frame: number; progress: number }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, background: '#1a1a2e' }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 100,
            }}>
                <Heading
                    text="Typography Templates"
                    size={56}
                    animation="reveal"
                    startFrame={0}
                />
                <div style={{ marginTop: 60, display: 'flex', flexDirection: 'column', gap: 30 }}>
                    <SplitText
                        text="Split text by word reveals"
                        animation="word"
                        stagger={8}
                        startFrame={30}
                    />
                    <SplitText
                        text="Character by character animation"
                        animation="char"
                        stagger={3}
                        startFrame={90}
                    />
                </div>
            </div>
        </div>
    );
};

const Scene3 = ({ frame, progress }: { frame: number; progress: number }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}>
            <PatternBackground pattern="grid" color="#3b82f6" opacity={0.1} animated />
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 80,
            }}>
                <div>
                    <Heading
                        text="Chart Templates"
                        size={48}
                        align="center"
                        startFrame={0}
                    />
                    <BarChart
                        data={[
                            { label: 'A', value: 40, color: '#3b82f6' },
                            { label: 'B', value: 70, color: '#8b5cf6' },
                            { label: 'C', value: 55, color: '#06b6d4' },
                            { label: 'D', value: 90, color: '#10b981' },
                            { label: 'E', value: 65, color: '#f59e0b' },
                        ]}
                        width={700}
                        height={350}
                        startFrame={30}
                    />
                </div>
            </div>
        </div>
    );
};

const Scene4 = ({ frame, progress }: { frame: number; progress: number }) => {
    const lineData = Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: 20 + Math.sin(i * 0.5) * 15 + Math.random() * 10,
    }));

    return (
        <div style={{ position: 'absolute', inset: 0, background: '#0f0f1a' }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 80,
            }}>
                <Heading
                    text="Line Chart Animation"
                    size={48}
                    startFrame={0}
                />
                <LineChart
                    data={lineData}
                    width={800}
                    height={300}
                    strokeColor="#00ff88"
                    strokeWidth={3}
                    fillColor="#00ff88"
                    fillOpacity={0.1}
                    startFrame={30}
                />
            </div>
        </div>
    );
};

const Scene5 = ({ frame, progress }: { frame: number; progress: number }) => {
    const chartData = [
        { value: 35, color: '#3b82f6', label: 'A' },
        { value: 25, color: '#8b5cf6', label: 'B' },
        { value: 20, color: '#06b6d4', label: 'C' },
        { value: 20, color: '#10b981', label: 'D' },
    ];

    return (
        <div style={{ position: 'absolute', inset: 0, background: '#1a1a2e' }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 80,
            }}>
                <div>
                    <Heading
                        text="Progress Ring"
                        size={36}
                        align="center"
                        startFrame={0}
                    />
                    <ProgressRing
                        progress={0.75}
                        size={200}
                        startFrame={30}
                    />
                </div>
                <div>
                    <Heading
                        text="Donut Chart"
                        size={36}
                        align="center"
                        startFrame={0}
                    />
                    <DonutChart
                        data={chartData}
                        size={200}
                        startFrame={30}
                        centerText="100%"
                    />
                </div>
            </div>
        </div>
    );
};

const Scene6 = ({ frame, progress }: { frame: number; progress: number }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <BorderGlow
                    color="#3b82f6"
                    intensity={0.8}
                    size={25}
                >
                    <CenterText
                        text="Border Glow"
                        subtext="Neon glow effect template"
                        backgroundColor="rgba(0,0,0,0.9)"
                        startFrame={0}
                    />
                </BorderGlow>
            </div>
            <Captions
                text="This is a caption overlay template"
                style="bottom"
                startFrame={30}
            />
        </div>
    );
};

const Scene7 = ({ frame, progress }: { frame: number; progress: number }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, background: '#1a0b2e' }}>
            <GradientOverlay type="sunset" opacity={0.9} />
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Countdown
                    from={5}
                    to={0}
                    duration={90}
                    startFrame={0}
                    size={150}
                />
                <Heading
                    text="Get Ready!"
                    size={48}
                    animation="slideUp"
                    startFrame={90}
                />
            </div>
            <Continuous animation="pulse" speed={2}>
                <div style={{
                    position: 'absolute',
                    bottom: 100,
                    right: 100,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                }} />
            </Continuous>
        </div>
    );
};

const Scene8 = ({ frame, progress }: { frame: number; progress: number }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}>
            <PatternBackground pattern="circles" color="#8b5cf6" opacity={0.15} animated />
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <GeometricShapes
                    shapes={[
                        { type: 'circle', radius: 60, color: '#3b82f6', x: 200, y: 100, animation: 'pulse' },
                        { type: 'rect', width: 80, height: 80, color: '#8b5cf6', x: 500, y: 200, animation: 'rotate' },
                        { type: 'polygon', sides: 6, radius: 50, color: '#06b6d4', x: 800, y: 150, animation: 'scaleIn' },
                        { type: 'star', sides: 5, radius: 45, color: '#10b981', x: 1100, y: 100, animation: 'pulse' },
                    ]}
                    startFrame={0}
                />
                <Heading
                    text="Geometric Shapes"
                    size={56}
                    animation="reveal"
                    startFrame={0}
                    style={{ marginTop: 400 }}
                />
            </div>
            <LowerThird
                name="All Templates"
                title="Verified & Working"
                startFrame={60}
                duration={120}
            />
        </div>
    );
};

export default TestComposition;

export const TestCompositionPlayer = TestCompositionWrapper;

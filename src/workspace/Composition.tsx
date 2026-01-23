import { AbsoluteFill, Sequence } from "remotion";

/**
 * EXAMPLE: How to create custom compositions using modular template system
 * 
 * This demonstrates how AI agents can mix and match components from template
 * library to create custom videos.
 */
import Scene1 from './Scenes/Scene1.tsx';
import Scene2 from './Scenes/Scene2.tsx';
import Scene3 from './Scenes/Scene3.tsx';




/**
 * EXAMPLE 4: Multi-scene composition
 */
export const MyComposition = () => {
    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={300}>
                <Scene1 />
            </Sequence>
            <Sequence from={300} durationInFrames={600}>
                <Scene2 />
            </Sequence>
            <Sequence from={600} durationInFrames={900}>
                <Scene3 />
            </Sequence>
        </AbsoluteFill>
    );
};

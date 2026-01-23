import { AbsoluteFill, Sequence } from "remotion";
import Scene1 from "./Scenes/Scene1";
import { TOTAL_FRAMES } from "./VideoConfig";

export const MyComposition = () => {
    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={TOTAL_FRAMES}>
                <Scene1 />
            </Sequence>
            
        </AbsoluteFill>
    );
};

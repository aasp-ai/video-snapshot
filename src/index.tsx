import { registerRoot, Composition } from 'remotion';
import { MyComposition } from './workspace/Composition';
import { VIDEO_CONFIG } from './workspace/VideoConfig';

export const RemotionRoot = () => {
    return (
        <>
            <Composition
                id={VIDEO_CONFIG.id}
                component={MyComposition}
                durationInFrames={VIDEO_CONFIG.durationInFrames}
                width={VIDEO_CONFIG.width}
                height={VIDEO_CONFIG.height}
                fps={VIDEO_CONFIG.fps}
            />
        </>
    );
};

registerRoot(RemotionRoot);

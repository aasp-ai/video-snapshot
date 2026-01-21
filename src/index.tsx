import { registerRoot, Composition } from 'remotion';
import { MyVideo, VIDEO_CONFIG } from './Composition';

export const RemotionRoot = () => {
    return (
        <>
            <Composition
                id={VIDEO_CONFIG.id}
                component={MyVideo}
                durationInFrames={VIDEO_CONFIG.durationInFrames}
                width={VIDEO_CONFIG.width}
                height={VIDEO_CONFIG.height}
                fps={VIDEO_CONFIG.fps}
            />
        </>
    );
};

registerRoot(RemotionRoot);
import { useEffect, useRef, useCallback } from 'react';
import { Player } from '@remotion/player';
import type { PlayerRef } from '@remotion/player';
import { MyComposition  } from './Composition';
import { VIDEO_CONFIG } from './Root';

export const PlayerBridge = () => {
    const playerRef = useRef<PlayerRef>(null);

    // 1. Listen for commands from Parent
    useEffect(() => {
        const handleMsg = (e: MessageEvent) => {
            const player = playerRef.current;
            if(!player) return;
            
            if(e.data.type === 'PLAY') player.play();
            if(e.data.type === 'PAUSE') player.pause();
            if(e.data.type === 'SEEK') player.seekTo(e.data.frame);
        };
        window.addEventListener('message', handleMsg);
        return () => window.removeEventListener('message', handleMsg);
    }, []);

    const onUpdate = useCallback((e: { frame: number }) => {
        window.parent.postMessage({ type: 'FRAME_UPDATE', frame: e.frame }, '*');
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <Player
                ref={playerRef}
                component={MyComposition}
                durationInFrames={VIDEO_CONFIG.durationInFrames}
                compositionWidth={VIDEO_CONFIG.width}
                compositionHeight={VIDEO_CONFIG.height}
                fps={VIDEO_CONFIG.fps}
                controls={false} // HIDE NATIVE UI
                style={{ width: '100%', height: '100%' }}
                autoPlay={true}
                loop
                acknowledgeRemotionLicense 
                // onFrameUpdate={onUpdate}
            />
        </div>
    );
};

    

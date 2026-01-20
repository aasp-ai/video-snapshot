import { AbsoluteFill } from 'remotion';

export const Captions = () => {
    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <div style={{
                position: 'absolute',
                bottom: '100px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '20px 40px',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{
                    color: 'white',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                    Caption Example
                </div>
            </div>
        </AbsoluteFill>
    );
};

export const SubtitleExample = () => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '200px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'white',
            fontSize: '28px',
            fontWeight: '600',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
        }}>
            Subtitle Example
        </div>
    );
};

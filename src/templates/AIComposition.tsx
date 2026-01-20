import { AbsoluteFill } from 'remotion';

export const AIComposition = () => {
    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white'
            }}>
                <h1 style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '20px' }}>
                    AI Video Composition
                </h1>
                <p style={{ fontSize: '24px', opacity: 0.8 }}>
                    Modular Template System
                </p>
                <div style={{ 
                    marginTop: '40px', 
                    fontSize: '18px', 
                    opacity: 0.6,
                    maxWidth: '600px',
                    lineHeight: '1.6'
                }}>
                    Import individual components from the templates directory to create custom videos.
                    <br /><br />
                    All 60+ packages are referenced and ready to use.
                </div>
            </div>
        </AbsoluteFill>
    );
};

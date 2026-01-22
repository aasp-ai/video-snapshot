import { AbsoluteFill } from "remotion";

const Scene2 = () => (
    <AbsoluteFill style={{ background: '#ff6b6b' }}>
        <div style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '64px',
            fontWeight: 'bold'
        }}>
            Scene 2
        </div>
    </AbsoluteFill>
);

export default Scene2;
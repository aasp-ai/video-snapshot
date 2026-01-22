import { AbsoluteFill } from "remotion";

const Scene3 = () => (
    <AbsoluteFill style={{ background: '#00ff00' }}>
        <div style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '64px',
            fontWeight: 'bold'
        }}>
            Scene 3
        </div>
    </AbsoluteFill>
);

export default Scene3;

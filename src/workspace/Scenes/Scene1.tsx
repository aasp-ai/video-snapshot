import { AbsoluteFill } from "remotion";

const Scene1 = () => (
    <AbsoluteFill style={{ background: '#0070f3' }}>
        <div style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '64px',
            fontWeight: 'bold'
        }}>
            Scene 1
        </div>
    </AbsoluteFill>
);

export default Scene1;


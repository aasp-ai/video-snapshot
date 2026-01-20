import { AbsoluteFill } from 'remotion';
import { Circle, Rect, Triangle, Polygon, Star } from '@remotion/shapes';

export const ShapesScene = () => {
    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <ShapeScene />
        </AbsoluteFill>
    );
};

const ShapeScene = () => {
    return (
        <AbsoluteFill>
            <AnimatedCircles />
            <AnimatedRects />
            <AnimatedTriangles />
            <AnimatedPolygons />
            <AnimatedStars />
            <CustomPaths />
        </AbsoluteFill>
    );
};

const AnimatedCircles = () => {
    return (
        <>
            <div style={{ position: 'absolute', left: '15%', top: '20%' }}>
                <Circle radius={100} fill="#0070f3" />
            </div>
            <div style={{ position: 'absolute', left: '25%', top: '35%' }}>
                <Circle radius={80} fill="#ff6b6b" />
            </div>
            <div style={{ position: 'absolute', left: '35%', top: '50%' }}>
                <Circle radius={60} fill="#00ff00" />
            </div>
        </>
    );
};

const AnimatedRects = () => {
    return (
        <>
            <div style={{ position: 'absolute', left: '60%', top: '20%' }}>
                <Rect width={150} height={100} fill="#ff00ff" />
            </div>
            <div style={{ position: 'absolute', left: '65%', top: '35%' }}>
                <Rect width={120} height={80} fill="#ffff00" />
            </div>
            <div style={{ position: 'absolute', left: '70%', top: '50%' }}>
                <Rect width={90} height={60} fill="#00ffff" />
            </div>
        </>
    );
};

const AnimatedTriangles = () => {
    return (
        <>
            <div style={{ position: 'absolute', left: '15%', top: '60%' }}>
                <Triangle length={120} direction="up" fill="#ff9900" />
            </div>
            <div style={{ position: 'absolute', left: '25%', top: '75%' }}>
                <Triangle length={100} direction="up" fill="#0099ff" />
            </div>
        </>
    );
};

const AnimatedPolygons = () => {
    return (
        <>
            <div style={{ position: 'absolute', left: '50%', top: '60%' }}>
                <Polygon points={6} radius={80} fill="#99ff00" />
            </div>
            <div style={{ position: 'absolute', left: '65%', top: '75%' }}>
                <Polygon points={8} radius={60} fill="#ff0099" />
            </div>
        </>
    );
};

const AnimatedStars = () => {
    return (
        <div style={{ position: 'absolute', left: '50%', top: '80%' }}>
            <Star points={5} innerRadius={30} outerRadius={80} fill="#ffff99" />
        </div>
    );
};

const CustomPaths = () => {
    return (
        <>
            <div style={{ position: 'absolute', left: '80%', top: '15%' }}>
                <div style={{ width: 100, height: 100, border: '2px solid white' }} />
            </div>
            <div style={{ position: 'absolute', left: '80%', top: '40%' }}>
                <div style={{ width: 100, height: 100, background: 'rgba(255, 107, 107, 0.3)', border: '3px solid #ff6b6b', borderRadius: '10px' }} />
            </div>
        </>
    );
};

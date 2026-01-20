import { useCurrentFrame, AbsoluteFill, Sequence, interpolate, spring } from 'remotion';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as Slot from '@radix-ui/react-slot';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-white text-black hover:bg-gray-200',
                primary: 'bg-blue-600 text-white hover:bg-blue-700',
                secondary: 'bg-gray-600 text-white hover:bg-gray-700',
                outline: 'border-2 border-white text-white hover:bg-white hover:text-black',
                ghost: 'hover:bg-white/10 text-white',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const cardVariants = cva(
    'rounded-lg border p-6 shadow-lg',
    {
        variants: {
            variant: {
                default: 'border-gray-700 bg-gray-900/50 text-white',
                glass: 'border-white/20 bg-white/10 backdrop-blur-md text-white',
                neon: 'border-blue-500 bg-blue-900/30 text-blue-100 shadow-[0_0_30px_rgba(59,130,246,0.5)]',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
    const Comp = asChild ? Slot.Slot : 'button';
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = ({ className, variant, ...props }: CardProps) => (
    <div className={cn(cardVariants({ variant, className }))} {...props} />
);

export const StyledComponents = () => {
    const frame = useCurrentFrame();

    const scale = spring({
        frame: frame - 210,
        fps: 30,
        config: { damping: 15, stiffness: 100 }
    });

    const opacity = interpolate(frame, [210, 225], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            <Sequence from={210} durationInFrames={90}>
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    opacity,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'center'
                }}>
                    <Card variant="glass" className="w-96">
                        <h2 className="text-2xl font-bold mb-4">Tailwind CSS v4</h2>
                        <p className="text-gray-300 mb-4">Styled components with CVA and Radix UI</p>
                        <div className="flex gap-2">
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                        </div>
                    </Card>
                    
                    <Card variant="neon" className="w-96">
                        <h2 className="text-2xl font-bold mb-4">Glass Morphism</h2>
                        <p className="text-blue-100 mb-4">Blur effects and neon shadows</p>
                        <div className="flex gap-2">
                            <Button variant="ghost" className="text-white">Ghost</Button>
                            <Button variant="default" size="sm">Small</Button>
                            <Button variant="primary" size="lg">Large</Button>
                        </div>
                    </Card>
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};

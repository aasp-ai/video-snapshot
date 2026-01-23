import * as React from "react";
import { cn } from "../../lib/utils";

type SliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
};

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, onValueCommit, min = 0, max = 100, step = 1, ...props }, ref) => {
    const currentValue = value?.[0] ?? 0;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value);
      onValueChange?.([nextValue]);
    };

    const handleCommit = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
      const nextValue = Number((event.target as HTMLInputElement).value);
      onValueCommit?.([nextValue]);
    };

    return (
      <input
        ref={ref}
        type="range"
        className={cn(
          "h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary",
          className,
        )}
        value={currentValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onMouseUp={handleCommit}
        onTouchEnd={handleCommit}
        {...props}
      />
    );
  },
);

Slider.displayName = "Slider";

export { Slider };

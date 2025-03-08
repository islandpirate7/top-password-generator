"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center min-h-[24px]",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

// Create a more mobile-friendly slider that uses native HTML input
const NativeSlider = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { 
    label?: string;
    showValue?: boolean;
  }
>(({ className, label, showValue = false, ...props }, ref) => {
  const [value, setValue] = React.useState(props.value || props.defaultValue || 0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  
  return (
    <div className="w-full mobile-slider-container">
      {label && (
        <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium">{label}</label>
        {showValue && <span className="text-sm font-medium">{value}</span>}
      </div>
      )}
      <div className="relative py-4">
        <input
          type="range"
          ref={ref}
          className={cn(
            "w-full h-4 bg-secondary rounded-lg appearance-none cursor-pointer native-slider",
            className
          )}
          onChange={handleChange}
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(Number(value) - Number(props.min || 0)) / (Number(props.max || 100) - Number(props.min || 0)) * 100}%, var(--secondary) ${(Number(value) - Number(props.min || 0)) / (Number(props.max || 100) - Number(props.min || 0)) * 100}%, var(--secondary) 100%)`
          }}
          {...props}
        />
      </div>
    </div>
  );
});
NativeSlider.displayName = "NativeSlider";

export { Slider }

import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '../utils';

const buttonVariants = cva(
  'flex flex-row items-center justify-between gap-3 font-bold font-inter rounded-xl transition duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-black text-white hover:bg-gray-900 disabled:bg-gray-300 px-12 py-3',
        link: 'underline text-gray-300 font-semibold hover:text-gray-500 px-12 py-3',
        round:
          'bg-black text-white hover:bg-gray-900 disabled:bg-gray-800 rounded-full p-8',
      },

      size: {
        xl: 'text-xl',
        lg: 'text-lg',
        md: 'text-md',
        sm: 'text-sm',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  }
);

interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'className'>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={cn(buttonVariants({ variant, size }))}
    />
  )
);

export type { ButtonProps };
export { Button, buttonVariants };

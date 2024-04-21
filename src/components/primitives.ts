import { tv } from 'tailwind-variants';

export const title = tv({
  base: 'tracking-tight inline font-semibold',
  variants: {
    color: {
      violet: 'from-[#FF1CF7] to-[#b249f8]',
      yellow: 'from-[#FF705B] to-[#FFB457]',
      blue: 'from-[#5EA2EF] to-[#0072F5]',
      cyan: 'from-[#00b7fa] to-[#01cfea]',
      green: 'from-[#6FEE8D] to-[#17c964]',
      pink: 'from-[#FF72E1] to-[#F54C7A]',
      foreground: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]'
    },
    size: {
      sm: 'text-3xl lg:text-4xl',
      md: 'text-[2.3rem] lg:text-5xl leading-9',
      lg: 'text-4xl lg:text-6xl'
    },
    fullWidth: {
      true: 'w-full block'
    }
  },
  defaultVariants: {
    size: 'md'
  },
  compoundVariants: [
    {
      color: ['violet', 'yellow', 'blue', 'cyan', 'green', 'pink', 'foreground'],
      class: 'bg-clip-text text-transparent bg-gradient-to-b'
    }
  ]
});

export const subtitle = tv({
  base: 'w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full',
  variants: {
    fullWidth: {
      true: '!w-full'
    }
  },
  defaultVariants: {
    fullWidth: true
  }
});

export const coloredButton = tv({
  base: 'font-semibold inline-flex items-center justify-center',
  variants: {
    variant: {
      violet: 'bg-gradient-to-r from-[#FF1CF7] to-[#b249f8]',
      yellow: 'bg-gradient-to-r from-[#FF705B] to-[#FFB457]',
      blue: 'bg-gradient-to-r from-[#5EA2EF] to-[#0072F5]',
      cyan: 'bg-gradient-to-r from-[#00b7fa] to-[#01cfea]',
      green: 'bg-gradient-to-r from-[#6FEE8D] to-[#17c964]',
      pink: 'bg-gradient-to-r from-[#FF72E1] to-[#F54C7A]',
      foreground: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]'
    },
    radius: {
      full: 'rounded-full',
      lg: 'rounded-lg',
      md: 'rounded-md',
      sm: 'rounded-sm'
    }
  },
  defaultVariants: {
    variant: 'violet',
    radius: 'md'
  }
});

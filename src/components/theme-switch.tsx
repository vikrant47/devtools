import { FC, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import { SunFilledIcon, MoonFilledIcon } from '@/components/icons';

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const { theme, setTheme } = useTheme();

  const onChange = (checked: boolean) => {
    checked ? setTheme('dark') : setTheme('light');
    setIsSelected(checked);
  };

  useEffect(() => {
    setIsMounted(true);
    setIsSelected(theme === 'light');
  }, [isMounted, theme]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={clsx(
          'w-10 h-5 bg-gray-200 dark:bg-gray-800 rounded-full p-0.5 transition-transform duration-300 ease-in-out',
          isSelected ? 'bg-green-500 transform translate-x-full' : '',
          className
        )}>
        <div
          className={clsx(
            'absolute top-0 left-0 w-5 h-5 bg-white dark:bg-gray-900 rounded-full shadow transition-transform duration-300 ease-in-out',
            isSelected ? 'translate-x-5' : ''
          )}>
          {isSelected ? (
            <MoonFilledIcon size={20} className="text-yellow-400 dark:text-gray-400 m-1" />
          ) : (
            <SunFilledIcon size={20} className="text-yellow-400 dark:text-gray-400 m-1" />
          )}
        </div>
      </div>
    </div>
  );
};

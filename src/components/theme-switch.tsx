import { FC, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import { SunFilledIcon, MoonFilledIcon } from '@/components/icons';
import { Button } from 'antd';
import { ThemeEventBus, Themes, ThemeService } from '@/services/system/ui/theme.service';

export interface ThemeSwitchProps {
  className?: string;
}
const themeService = ThemeService.instance();
export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);

  const [themeName, setThemeName] = useState<Themes>(Themes.DEFAULT);

  useEffect(() => {
    setIsMounted(true);
    ThemeEventBus.on('switch.theme', (event, { oldTheme, newTheme }) => {
      setThemeName(newTheme);
    });
  }, [isMounted]);

  // Prevent Hydration Mismatch
  if (!isMounted) return <div className="w-6 h-6" />;
  return themeName === 'light' ? (
    <Button
      type="link"
      className="p-0 border-0 bg-transparent"
      shape="circle"
      icon={<MoonFilledIcon size={20} className="text-yellow-400 dark:text-gray-400 m-1" />}
      onClick={() => {
        themeService.switchTheme(themeService.getDefaultThemeName('dark'));
      }}></Button>
  ) : (
    <Button
      type="link"
      className="p-0 border-0 bg-transparent"
      shape="circle"
      icon={<SunFilledIcon size={20} className="text-yellow-400 dark:text-gray-400 m-1" />}
      onClick={() => {
        themeService.switchTheme(Themes.LIGHT);
      }}></Button>
  );
};

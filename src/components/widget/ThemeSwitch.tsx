import { Button, Switch, SwitchProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NETWORK_THEME, SKIN_THEME, THEME } from '../../config';
import { Network } from '../../model';
import { readStorage, updateStorage } from '../../utils/helper/storage';
import { MoonIcon, SunIcon } from '../icons';

export const toggleTheme = (theme: THEME, network: Network = 'pangolin') => {
  const networkTheme = NETWORK_THEME[theme ?? THEME.DARK];

  window.less
    .modifyVars({
      ...SKIN_THEME[theme],
      ...SKIN_THEME.vars,
      ...networkTheme[network],
    })
    .then(() => {
      updateStorage({ theme });
      // Do not read theme from localStorage other than this file. Use readStorage instead.
      localStorage.setItem('theme', theme);
    })
    .catch((error: unknown) => {
      console.log('%c [ error ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', error);
    });
};

interface ThemeSwitchProps extends SwitchProps {
  network?: Network;
  defaultTheme?: THEME;
  onThemeChange?: (theme: THEME) => void;
  mode?: 'switcher' | 'btn';
}

export function ThemeSwitch({
  network,
  mode = 'switcher',
  onThemeChange,
  defaultTheme = THEME.LIGHT,
  className,
  ...others
}: ThemeSwitchProps) {
  const [theme, setTheme] = useState<THEME>(readStorage()?.theme || defaultTheme);
  const toggle = useCallback(() => {
    const current = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

    setTheme(current);

    if (onThemeChange) {
      onThemeChange(current);
    }
  }, [onThemeChange, theme]);
  const Icon = useMemo(() => (theme === THEME.DARK ? MoonIcon : SunIcon), [theme]);

  useEffect(() => {
    toggleTheme(theme, network);

    if (theme === THEME.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [network, theme]);

  return mode === 'switcher' ? (
    <Switch
      checkedChildren="🌜"
      unCheckedChildren="️🌞"
      {...others}
      checked={theme === THEME.DARK}
      onChange={toggle}
      className={className + ' flex items-center'}
    />
  ) : (
    <Button type="link" icon={<Icon />} className={className + ' flex items-center'} onClick={toggle}></Button>
  );
}

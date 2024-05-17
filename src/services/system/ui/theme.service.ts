import { theme } from 'antd';
import { BeanManager } from '../system/bean.manager';
import { EventBus } from '../event/event.bus';
import { dracula, a11yLight } from 'react-code-blocks';
import TextArea from 'antd/es/input/TextArea';
export const defaultDarkTheme = {
  monacoTheme: 'vs-dark',
  codeBlocTheme: dracula,
  algorithm: [theme.darkAlgorithm],
  components: {
    Button: {
      borderRadius: 4,
      algorithm: true,
      fontWeight: 500
    },
    TextArea: {
      backgroundColor: '#000000'
    }
  }
};
export const darkTheme = {
  monacoTheme: 'vs-dark',
  codeBlocTheme: dracula,
  algorithm: [theme.darkAlgorithm],
  components: {
    Button: {
      borderRadius: 4,
      algorithm: true,
      colorLinkActive: '#00854d',
      colorLinkHover: '#025231',
      colorLink: '#00854d',
      fontWeight: 500,
      colorPrimaryBg: '#00854d'
    },
    Mondal: {
      colorBgContainer: '#181b34',
      colorBgElevated: '#181b34'
    },
    Drawer: {
      colorBgElevated: '#181b34',
      className: 'drawer-dark-theme'
    }
  },
  token: {
    wireframe: true,
    borderRadius: 3,
    backgroundColor: '#181b34',
    colorBgContainer: '#181b34',
    colorPrimary: '#00854d',
    color: '#fff'
  }
};
export const hackerTheme = {
  ...defaultDarkTheme,
  components: {
    Button: {
      borderRadius: 4,
      colorLinkActive: '#ff1cf7',
      colorLinkHover: '#ff1cf7',
      colorLink: '#ff1cf7'
    },
    Drawer: {
      colorBgElevated: '#181b34',
      className: 'drawer-hacker-theme'
    }
  },
  token: {
    ...darkTheme.token,
    colorPrimary: '#ff1cf7',
    backgroundColor: '#000000',
    color: '#d5d8df',
    colorBgContainer: '#000000'
  }
};
export const blackTheme = {
  ...darkTheme,
  components: {
    ...darkTheme.components,
    Drawer: {
      colorBgElevated: '#181b34',
      className: 'drawer-black-theme'
    }
  },
  token: {
    ...darkTheme.token,
    colorPrimary: '#00854d',
    backgroundColor: '#111111',
    colorBgContainer: '#111111',
    color: '#d5d8df'
  }
};
export const defaultTheme = {
  monacoTheme: 'vs',
  codeBlocTheme: a11yLight,
  algorithm: [theme.defaultAlgorithm],
  components: {
    Drawer: {
      className: 'drawer-default-theme'
    }
  },
  token: {
    wireframe: true,
    colorPrimary: '#00854d',
    colorLink: 'rgb(0, 82, 204)',
    borderRadius: 3
  }
};
export enum Themes {
  DEFAULT = 'default',
  DEFAULT_DARK = 'default-dark',
  DARK = 'dark',
  LIGHT = 'light',
  HACKER = 'hacker-theme',
  BLACK = 'black'
}
export const ThemeMapping: any = {
  [Themes.DEFAULT]: defaultDarkTheme,
  [Themes.DEFAULT_DARK]: defaultDarkTheme,
  [Themes.DARK]: darkTheme,
  [Themes.LIGHT]: defaultTheme,
  [Themes.HACKER]: hackerTheme,
  [Themes.BLACK]: blackTheme
};
export const IGNORE_MONACO_THEMES = ['logview', 'vs-dark', 'light', 'vs'];
export const ThemeEventBus = new EventBus('theme.service');
const DEFINED_MONACO_THEMES: any[] = [];
export const ThemeService = BeanManager.register(
  class ThemeService {
    constructor() {}
    async defineMonacoThemes(editor: any) {
      // const darkTheme = await this.loadMonacoTheme('GitHub Dark');
      Object.keys(ThemeMapping).forEach((themeName) => {
        if (DEFINED_MONACO_THEMES.includes(themeName)) {
          return;
        }
        const theme: any = {
          base: ThemeMapping[themeName].monacoTheme,
          inherit: true,
          rules: [],
          colors: {}
        };
        if (ThemeMapping[themeName].token.backgroundColor) {
          theme.colors['editor.background'] = ThemeMapping[themeName].token.backgroundColor;
        }
        editor.defineTheme(themeName, theme);
      });
    }
    protected themeName: Themes = Themes.DEFAULT;
    getDefaultThemeName(mode: 'dark' | 'light'): Themes {
      return mode === 'dark' ? Themes.HACKER : Themes.DEFAULT;
    }
    getThemeName(): string {
      return this.themeName;
    }
    getTheme(): any {
      return ThemeMapping[this.themeName] || ThemeMapping[Themes.DEFAULT];
    }
    sanitizeThemeName(themeName: string): Themes {
      return themeName.replace(/_/g, '-') as Themes;
    }
    switchTheme(themeName: Themes) {
      const oldTheme = this.themeName;
      if (oldTheme === themeName) {
        return this.getTheme();
      }
      // console.log('switching theme', themeName);
      this.themeName = this.sanitizeThemeName(themeName);
      ThemeEventBus.emit('switch.theme', { oldTheme, newTheme: themeName });
      return this.getTheme();
    }
    getCodeBlockTheme() {
      return this.getTheme().codeBlocTheme;
    }
    getMonacoTheme() {
      return this.getTheme().monacoTheme;
    }
  }
);

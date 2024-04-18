import { theme } from 'antd';
import { BeanManager } from '../system/bean.manager';
import { EventBus } from '../event/event.bus';
import { editor } from 'monaco-editor';
export const darkTheme = {
  monacoTheme: 'vs-dark',
  algorithm: [theme.darkAlgorithm],
  components: {
    Button: {
      borderRadius: 4,
      algorithm: true,
      colorLinkActive: '#00854d',
      colorLinkHover: '#025231',
      colorLink: '#00854d',
      fontWeight: 500
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
  ...darkTheme,
  components: {
    Button: {
      borderRadius: 4,
      colorLinkActive: '#fe78c6',
      colorLinkHover: '#fe78c6',
      colorLink: '#fe78c6'
    },
    Drawer: {
      colorBgElevated: '#181b34',
      className: 'drawer-hacker-theme'
    }
  },
  token: {
    ...darkTheme.token,
    colorPrimary: '#fe78c6',
    backgroundColor: '#303241',
    color: '#d5d8df',
    colorBgContainer: '#303241'
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
  DARK = 'dark',
  LIGHT = 'light',
  HACKER = 'hacker-theme',
  BLACK = 'black'
}
export const ThemeMapping: any = {
  [Themes.DEFAULT]: defaultTheme,
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
      // console.log('switching theme', themeName);
      this.themeName = this.sanitizeThemeName(themeName);
      ThemeEventBus.emit('switch.theme', themeName);
      return this.getTheme();
    }
    getMonacoTheme() {
      return this.getTheme().monacoTheme;
    }
  }
);

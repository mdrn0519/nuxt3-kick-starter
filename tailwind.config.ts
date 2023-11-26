import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        dandelion: {
          '50': '#fffbeb',
          '100': '#fef3c7',
          '200': '#fee689',
          '300': '#fdd451',
          '400': '#fcbf23',
          '500': '#f69d0a',
          '600': '#da7605',
          '700': '#b55208',
          '800': '#933f0d',
          '900': '#79350e',
          '950': '#451a03',
        },
      },
    },
  },
};

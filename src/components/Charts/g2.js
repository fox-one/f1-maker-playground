// 全局 G2 设置
import { track, setTheme } from 'bizcharts';
import constants from '@/constants';

track(false);

const config = {
  defaultColor: constants.primaryColor,
  colors: [constants.primaryColor],
  shape: {
    interval: {
      fillOpacity: 1,
    },
  },
};

setTheme(config);

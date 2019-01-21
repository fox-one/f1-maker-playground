import React from 'react';
import { Chart, Tooltip, Geom } from 'bizcharts';
import autoHeight from '../autoHeight';
import styles from '../index.less';
import { formatPrice } from '@/utils/currency';
import constants from '@/constants';

@autoHeight()
class MiniBar extends React.Component {
  onTooltipChange = ev => {
    const { convertPrice } = this.props;
    if (convertPrice) {
      const { items } = ev;
      const origin = items[0];
      items.splice(0);
      items.push({
        name: origin.name,
        marker: origin.marker,
        title: origin.title,
        color: origin.color,
        value: formatPrice(origin.value),
      });
    }
  };

  render() {
    const { height, forceFit = true, color = constants.primaryColor, data = [], convertPrice } = this.props;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const padding = [36, 5, 30, 5];
    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    // for tooltip not to be hide
    const chartHeight = height + 54;

    return (
      <div className={styles.miniChart} style={{ height }}>
        <div className={styles.chartContent}>
          <Chart
            scale={scale}
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            padding={padding}
            onTooltipChange={this.onTooltipChange}>
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type='interval' position='x*y' color={color} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    );
  }
}
export default MiniBar;

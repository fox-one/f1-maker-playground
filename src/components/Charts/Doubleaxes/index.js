import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';
import autoHeight from '../autoHeight';
import constants from '@/constants';

@autoHeight()
class Doubleaxes extends React.Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    // window.addEventListener('resize', this.resize, { passive: true });
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.resize);
  }

  handleRoot = n => {
    this.root = n;
  };

  handleRef = n => {
    this.node = n;
  };

  onTooltipChange = ev => {
    const { leftName = '柱图', rightName = '线图' } = this.props;
    /* eslint-disable-next-line no-param-reassign */
    ev.items[0].name = leftName;
    /* eslint-disable-next-line no-param-reassign */
    ev.items[1].name = rightName;
  };

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }

  render() {
    const {
      height,
      title,
      forceFit = true,
      color = '#039be5',
      subColor = constants.primaryColor,
      padding,
      data,
      scale,
    } = this.props;
    const { autoHideXLabels } = this.state;

    return (
      <Chart
        scale={scale}
        height={title ? height - 41 : height}
        forceFit={forceFit}
        data={data}
        onTooltipChange={this.onTooltipChange}
        padding={padding || 'auto'}>
        <Axis name='x' title={false} label={autoHideXLabels ? false : {}} tickLine={autoHideXLabels ? false : {}} />
        <Axis
          name='left'
          grid={null}
          label={{
            textStyle: {
              fill: color,
            },
          }} />
        <Axis
          name='right'
          grid={null}
          label={{
            textStyle: {
              fill: subColor,
            },
          }} />
        <Tooltip />
        <Geom type='interval' position='x*left' color={color} />
        <Geom type='line' position='x*right' color={subColor} size={3} shape='smooth' />
        {/* <Geom
            type="point"
            position="x*right"
            color="#1A9EFF"
            size={3}
            shape="circle"
          /> */}
      </Chart>
    );
  }
}

export default Doubleaxes;

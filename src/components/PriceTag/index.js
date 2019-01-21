import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

class PriceTag extends PureComponent {
  static propTypes = {
    price: PropTypes.number,
    decimalLimit: PropTypes.number,
    showSymbol: PropTypes.bool,
  };

  static defaultProps = {
    price: 0,
    decimalLimit: 2,
    showSymbol: false,
  };

  render() {
    const { price, asset, decimalLimit, showSymbol } = this.props;
    const { baseCurrency: currency } = asset;
    let message = 0;

    if (asset.currency.currencies) {
      if (!currency || currency === 'CNY') {
        message = price;
      } else {
        message = price / parseFloat(asset.currency.currencies.usd);
      }
    }

    if (showSymbol) {
      return (
        <span>
          {message.toFixed(decimalLimit)} {currency}{' '}
        </span>
      );
    }

    return <span>{message.toFixed(decimalLimit)}</span>;
  }
}

export default connect(({ asset }) => ({
  asset,
}))(PriceTag);

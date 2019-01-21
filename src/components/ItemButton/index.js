import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class ItemButton extends Component {
  static propTypes = {
    item: PropTypes.object || PropTypes.array,
    onItemClick: PropTypes.func,
  };

  static defaultProps = {
    item: {},
    onItemClick: () => {},
  };

  privateOnClick = () => {
    const { item, onItemClick } = this.props;
    onItemClick(item);
  };

  render() {
    const { children } = this.props;
    return (
      <Button type='primary' onClick={this.privateOnClick}>
        {children}
      </Button>
    );
  }
}

export default ItemButton;

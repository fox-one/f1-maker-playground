import React, { PureComponent } from 'react';
import { Modal } from 'antd';

export default class TransactionModal extends PureComponent {
  constructor(props) {
    super(props);
    this.transaction = props.transaction;
  }

  render() {
    const { children, transaction } = this.props;
    return (
      <Modal {...this.props}>
        <div>{children}</div>
      </Modal>
    );
  }
}

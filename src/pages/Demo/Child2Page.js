import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card } from 'antd';
import { connect } from 'dva';

@connect(({ login, assets }) => ({
  assets,
  login,
}))
class Child2Page extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/getAccount',
    });
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card>这个页面仅供展示</Card>
      </PageHeaderWrapper>
    );
  }
}

export default Child2Page;

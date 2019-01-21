import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card } from 'antd';

class ChildPage extends PureComponent {
  constructor() {
    super()
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card>这个页面仅供展示</Card>
      </PageHeaderWrapper>
    );
  }
}

export default ChildPage;

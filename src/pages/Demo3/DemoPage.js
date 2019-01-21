import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card } from 'antd';

class DemoPage extends PureComponent {
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

export default DemoPage;

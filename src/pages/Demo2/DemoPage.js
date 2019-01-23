import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider } from 'antd';

class DemoPage extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card title='本页面为路由及i18N的介绍页面'>
          <div>
            FoxONE 的 Admin 采用了 <a href='https://pro.ant.design/index-cn'>Ant Design Pro</a>
            体系，路由和i18N国际化均通过 <a href='https://umijs.org/zh/guide/router.html'>Umi.js</a>{' '}
            来管理，遵照文档规范即可
          </div>
          <Divider />
          <p>这里列出几个细节点</p>
          <p>侧边栏路由通过在router中添加的页面，是否配置 name 字段决定是否加入菜单栏</p>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DemoPage;

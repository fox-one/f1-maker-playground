import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider } from 'antd';
import { connect } from 'dva';

@connect(({ login, assets, loading }) => ({
  assets,
  login,
  loading: loading.effects['login/getAccount'],
}))
class Child1Page extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/getAccount',
      payload: null,
    });
  }

  render() {
    const {
      loading,
      login: { user },
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card title='本页面为数据获取的介绍页面'>
          <p>
            FoxONE 的 Admin 采用了 <a href='https://pro.ant.design/index-cn'>Ant Design Pro</a>
            体系，前端数据获取通过内含的 <a href='https://dvajs.com/'>Dva.js</a> 协助管理，遵照文档规范，流程大致为
          </p>
          <ol>
            <li>
              <p>UI 组件交互操作；</p>
            </li>
            <li>
              <p>调用 model 的 effect；</p>
            </li>
            <li>
              <p>调用统一管理的 service 请求函数；</p>
            </li>
            <li>
              <p>使用封装的 request.js 发送请求；</p>
            </li>
            <li>
              <p>获取服务端返回；</p>
            </li>
            <li>
              <p>然后调用 reducer 改变 state；</p>
            </li>
            <li>
              <p>更新 model。</p>
            </li>
          </ol>
          <p>本页面的源文件位于 src/pages/Demo/Child1Page.js</p>
          <Divider />
          <p>本页面的数据加载流程如下:</p>
          <p>首先通过 @connect 注入 models文件夹下, login.js 文件提供的 namespace为 login 的 model</p>
          <p>在 componentDidMount 中，从 props 里取出 dispatch 方法，调用 login model 中的 getAccount 方法</p>
          <p>
            login model中的 *getAccount 方法会被触发，通过yield call( method , payload ) 调用 service 中的
            method，并且payload参数传给 method
          </p>
          <p>response 通过yield put 调用对应的 reducer 方法，然后在 reducer 方法中 改变 state</p>
          <p>当 state 发生改变，页面就会接收到新的 model.</p>
          <p>数据是否在加载中可以通过注入 loading 对象，使用 loading.effects[] 检测数据是否在加载中</p>
        </Card>
        <Card loading={loading} style={{ marginTop: 20 }}>
          <p>user.name: {user.name}</p>
          {user.email ? <p>user.email: {user.email}</p> : null}
          {user.phone_number ? (
            <p>
              user.mobile: {user.phone_code} {user.phone_number}
            </p>
          ) : null}
          <p>user.created_at: {new Date(user.created_at * 1000).toLocaleDateString()}</p>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Child1Page;

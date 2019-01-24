import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Login from '@/components/Login';
import Link from 'umi/link';
import styles from './Login.less';

const { Mobile, Password, Submit, Tab, Mail } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'mobile',
    };
  }

  componentWillMount() {
    this.onGetImageCaptcha();
  }

  onGetImageCaptcha = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/getImageCaptcha',
    });
  };

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };

  render() {
    const { submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={loginForm => {
            this.loginForm = loginForm;
          }}>
          <Tab key='mobile' tab={formatMessage({ id: 'app.login.message.mobile' })}>
            <Mobile name='mobile' placeholder={formatMessage({ id: 'app.login.message.mobile' })} />
            <Password
              name='password'
              placeholder={formatMessage({ id: 'app.login.message.password' })}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)} />
          </Tab>
          <Tab key='email' tab={formatMessage({ id: 'app.login.message.email' })}>
            <Mail name='email' placeholder={formatMessage({ id: 'app.login.message.email' })} />
            <Password
              name='password'
              placeholder={formatMessage({ id: 'app.login.message.password' })}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)} />
          </Tab>
          <Submit loading={submitting}>
            <FormattedMessage id='app.login.login' />
          </Submit>
          <div className={styles.other}>
            <Link className={styles.register} to='/admin/register'>
              <FormattedMessage id='app.login.signup' />
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;

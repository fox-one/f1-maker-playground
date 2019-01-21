import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Login from '@/components/Login';
import Link from 'umi/link';
import { Col, Row, Button } from 'antd';
import styles from './Login.less';

const { Tab, Mobile, Password, Submit, Captcha, ImageCaptcha } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demo: APP_TYPE === 'demo',
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
    const { login, submitting } = this.props;
    const { captchaUrl } = login;
    const { demo } = this.state;
    // if (demo) {
    //   return (
    //     <div className={styles.main}>
    //       <Login
    //         onTabChange={this.onTabChange}
    //         onSubmit={this.handleSubmit}
    //         ref={form => {
    //           this.loginForm = form;
    //         }}>
    //         <Mail
    //           name='email'
    //           defaultValue='tps+pay@fox.one'
    //           placeholder={formatMessage({ id: 'app.login.message.passport' })} />
    //         <Password
    //           name='password'
    //           defaultValue='foxonedemo'
    //           placeholder={formatMessage({ id: 'app.login.message.password' })}
    //           onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)} />
    //         <ImageCaptcha
    //           name='captcha'
    //           placeholder={formatMessage({ id: 'app.login.message.code' })}
    //           url={captchaUrl}
    //           onGetCaptcha={this.onGetImageCaptcha} />
    //         <Submit loading={submitting}>
    //           <FormattedMessage id='app.login.login' />
    //         </Submit>
    //       </Login>
    //     </div>
    //   );
    // }

    return (
      <div className={styles.main}>
        <Login
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={loginForm => {
            this.loginForm = loginForm;
          }}>
          <Mobile name='mobile' placeholder={formatMessage({ id: 'app.login.message.passport' })} />
          <Password
            name='password'
            placeholder={formatMessage({ id: 'app.login.message.password' })}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)} />

          <Submit loading={submitting}>
            <FormattedMessage id='app.login.login' />
          </Submit>
          <div className={styles.other}>
            <Link className={styles.captchaLogin} to='/admin/register'>
              验证码登录
            </Link>
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

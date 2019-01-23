import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Row, Col, Icon, Select, Tabs } from 'antd';
import styles from './Register.less';

const { TabPane } = Tabs;
const FormItem = Form.Item;

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/requestRegist'],
  getImageCaptcha: loading.effects['register/getImageCaptcha'],
}))
@Form.create()
class Register extends Component {
  state = {
    regionCode: '86',
    tab: 'mobile',
  };

  componentWillMount() {
    this.onGetImageCaptcha();
  }

  componentWillReceiveProps(props) {
    const {
      register: { token },
    } = props;
    if (token) {
      router.push({
        pathname: '/admin/registerconfirm',
      });
    }
  }

  onGetImageCaptcha = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/getImageCaptcha',
    });
  };

  changePrefix = value => {
    this.setState({
      regionCode: value,
    });
  };

  handleSubmit = e => {
    const { form, dispatch } = this.props;
    const { register } = this.props;
    const { tab, regionCode } = this.state;
    const { captchaId } = register;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const payload = {
          regionCode,
          captchaId,
        };
        if (tab === 'mobile') {
          payload.mobile = values.mobile;
          payload.regionCode = values.regionCode;
        } else {
          payload.email = values.email;
        }
        dispatch({
          type: 'register/requestRegist',
          payload,
        });
      }
    });
    e.preventDefault();
  };

  onTabChange = tab => {
    this.setState({
      tab,
    });
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { tab, regionCode } = this.state;

    const {
      register: { captchaUrl },
    } = this.props;

    let image = <Icon type='reload' />;
    if (captchaUrl) {
      image = <img className={styles.getImageCaptcha} src={captchaUrl} alt='Captcha' />;
    }
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs
            style={{
              textAlign: 'center',
            }}
            defaultActiveKey={tab}
            onChange={this.onTabChange}>
            <TabPane tab='手机号注册' key='mobile'>
              <FormItem>
                <Input.Group compact>
                  <Select size='large' value={regionCode} onChange={this.changePrefix} style={{ width: '25%' }}>
                    <Select.Option value='86'>+86</Select.Option>
                    <Select.Option value='1'>+1</Select.Option>
                  </Select>
                  {getFieldDecorator('mobile', {
                    rules: [
                      {
                        required: tab === 'mobile' && true,
                        message: formatMessage({ id: 'validation.phone-number.required' }),
                      },
                    ],
                  })(
                    <Input
                      size='large'
                      style={{ width: '75%' }}
                      placeholder={formatMessage({ id: 'form.phone-number.placeholder' })} />
                  )}
                </Input.Group>
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captchaCode', {
                      rules: [
                        {
                          required: tab === 'mobile' && true,
                          message: formatMessage({ id: 'validation.verification-code.required' }),
                        },
                      ],
                    })(
                      <Input size='large' placeholder={formatMessage({ id: 'form.verification-code.placeholder' })} />
                    )}
                  </Col>
                  <Col span={8}>
                    <Button size='large' className={styles.getImageCaptcha} onClick={this.onGetImageCaptcha}>
                      {image}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </TabPane>
            <TabPane tab='邮箱注册' key='email'>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: tab === 'email' && true,
                      message: formatMessage({ id: 'validation.email.required' }),
                    },
                  ],
                })(
                  <Input
                    size='large'
                    style={{ width: '100%' }}
                    placeholder={formatMessage({ id: 'form.email.placeholder' })} />
                )}
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem>
            <Button size='large' loading={submitting} className={styles.submit} type='primary' htmlType='submit'>
              <FormattedMessage id='app.register.register' />
            </Button>
            <Link className={styles.login} to='/admin/login'>
              <FormattedMessage id='app.register.sing-in' />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;

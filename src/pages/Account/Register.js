import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Row, Col, Progress, Icon, Select } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id='validation.password.strength.strong' />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id='validation.password.strength.medium' />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id='validation.password.strength.short' />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
  getImageCaptcha: loading.effects['register/getImageCaptcha'],
}))
@Form.create()
class Register extends Component {
  state = {
    confirmDirty: false,
    visible: false,
    help: '',
    regionCode: '86',
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

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/resetState',
    });
  }

  onGetImageCaptcha = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/getImageCaptcha',
    });
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  changePrefix = value => {
    this.setState({
      regionCode: value,
    });
  };

  handleSubmit = e => {
    const { form, dispatch } = this.props;
    const { register } = this.props;
    const { regionCode } = this.state;
    const { captchaId } = register;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'register/requestRegister',
          payload: {
            ...values,
            regionCode,
            captchaId,
          },
        });
      }
    });
    e.preventDefault();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false} />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible, regionCode } = this.state;

    const {
      register: { captchaUrl },
    } = this.props;

    let image = <Icon type='reload' />;
    if (captchaUrl) {
      image = <img className={styles.getImageCaptcha} src={captchaUrl} alt='Captcha' />;
    }

    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id='app.register.register' />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <Input.Group compact>
              <Select size='large' value={regionCode} onChange={this.changePrefix} style={{ width: '25%' }}>
                <Select.Option value='86'>+86</Select.Option>
                <Select.Option value='1'>+1</Select.Option>
              </Select>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
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
                      required: true,
                      message: formatMessage({ id: 'validation.verification-code.required' }),
                    },
                  ],
                })(<Input size='large' placeholder={formatMessage({ id: 'form.verification-code.placeholder' })} />)}
              </Col>
              <Col span={8}>
                <Button size='large' className={styles.getImageCaptcha} onClick={this.onGetImageCaptcha}>
                  {image}
                </Button>
              </Col>
            </Row>
          </FormItem>

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

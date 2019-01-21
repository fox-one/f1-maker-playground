import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Icon } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import ItemMap from './map';
import LoginContext from './loginContext';

const FormItem = Form.Item;

class WrapFormItem extends Component {
  static defaultProps = {
    buttonText: '获取验证码',
  };

  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    if (onGetCaptcha) {
      onGetCaptcha();
    }
  };

  getFormItemOptions = ({ onChange, defaultValue, customprops, rules }) => {
    const options = {
      rules: rules || customprops.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  render() {
    const {
      form: { getFieldDecorator },
      url,
    } = this.props;

    let image = <Icon type='reload' />;
    if (url) {
      image = <img className={styles.getImageCaptcha} src={url} alt='Captcha' />;
    }

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
    const {
      onChange,
      customprops,
      defaultValue,
      rules,
      name,
      buttonText,
      updateActive,
      type,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const otherProps = restProps || {};
    if (type === 'ImageCaptcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha']);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>{getFieldDecorator(name, options)(<Input {...customprops} {...inputProps} />)}</Col>
            <Col span={8}>
              <Button size='large' className={styles.getImageCaptchaButton} onClick={this.onGetCaptcha}>
                {image}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }
    return <FormItem>{getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}</FormItem>;
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form} />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem;

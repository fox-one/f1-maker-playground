import React from 'react';
import { Icon } from 'antd';
import { formatMessage } from 'umi/locale';
import styles from './index.less';

export default {
  Mail: {
    props: {
      size: 'large',
      prefix: <Icon type='mail' className={styles.prefixIcon} />,
      type: 'email',
      placeholder: 'mail',
    },
    rules: [
      {
        required: true,
        message: formatMessage({ id: 'validation.email.required' }),
      },
      {
        type: 'email',
        message: formatMessage({ id: 'validation.email.wrong-format' }),
      },
    ],
  },
  UserName: {
    props: {
      size: 'large',
      prefix: <Icon type='user' className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: 'Please enter username!',
      },
    ],
  },
  Passport: {
    props: {
      size: 'large',
      prefix: <Icon type='user' className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: 'Please enter username!',
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <Icon type='lock' className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '888888',
    },
    rules: [
      {
        required: true,
        message: 'Please enter password!',
      },
    ],
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <Icon type='mobile' className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: 'Please enter mobile number!',
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!',
      },
    ],
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <Icon type='mail' className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!',
      },
    ],
  },
  ImageCaptcha: {
    props: {
      size: 'large',
      prefix: <Icon type='code' className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!',
      },
    ],
  },
};

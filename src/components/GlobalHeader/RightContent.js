import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Spin, Menu, Icon, Dropdown } from 'antd';
import SelectLang from '../SelectLang';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  render() {
    const { currentUser, onMenuClick, theme } = this.props;
    let displayName = '';
    if (currentUser) {
      const { name, email } = currentUser;
      if (name) {
        displayName = name;
      } else {
        displayName = email;
      }
    }

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key='logout'>
          <Icon type='logout' />
          <FormattedMessage id='menu.account.logout' defaultMessage='logout' />
        </Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Icon type='user' className={styles.name} />
          </span>
        </Dropdown>
        <SelectLang className={styles.action} />
      </div>
    );
  }
}

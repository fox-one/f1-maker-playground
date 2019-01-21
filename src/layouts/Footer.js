import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import constants from '@/constants';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: `About ${constants.shortName}`,
          title: `About ${constants.shortName}`,
          href: 'https://f1ex.io',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type='github' />,
          href: 'https://github.com/fox-one',
          blankTarget: true,
        },
        {
          key: `${constants.shortName} Docs`,
          title: `${constants.shortName} Docs`,
          // href: 'https://foxone-pay.docs.stoplight.io/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type='copyright' /> 2018~2019 {constants.shortName}
        </Fragment>
      } />
  </Footer>
);
export default FooterView;

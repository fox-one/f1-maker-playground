import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { List, Card } from 'antd';

const data = [
  {
    title: 'JS SDK',
    url: 'https://github.com/fox-one/foxone-pay-js-sdk',
    desc: formatMessage({ id: 'app.developer.js' }),
  },
  {
    title: 'Android SDK',
    url: 'https://github.com/fox-one/foxone-pay-js-sdk',
    desc: formatMessage({ id: 'app.developer.android' }),
  },
  {
    title: 'iOS SDK',
    url: 'https://github.com/fox-one/foxone-pay-ios-sdk',
    desc: formatMessage({ id: 'app.developer.ios' }),
  },
  {
    title: 'Server SDK (go)',
    url: 'https://github.com/fox-one/foxgo',
    desc: formatMessage({ id: 'app.developer.server' }),
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class Developer extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper title={<FormattedMessage id='menu.account.developer' defaultMessage='Developer Tools' />}>
        <GridContent>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 5 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card
                  title={item.title}
                  hoverable
                  bordered={false}
                  onClick={() => {
                    window.open(item.url);
                  }}>
                  {item.desc}
                </Card>
              </List.Item>
            )}
          />
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Developer;

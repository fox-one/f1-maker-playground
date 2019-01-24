# FoxONE Maker 模板工程

FoxONE Maker 模板工程是基于 [Ant Design Pro](https://pro.ant.design/docs/getting-started-cn) 的后台管理系统。

## 主要技术栈

- [yarn](https://yarnpkg.com/zh-Hans/)
- [react](https://reactjs.org/)
- [ant-design](https://ant.design/index-cn)
- [umi](https://umijs.org/zh/guide/)
- [dva](https://dvajs.com/)
- [bizcharts](https://bizcharts.net/index)
- [lodash](https://www.lodashjs.com/)

## 基础命令

启动调试server

```yarn start```

打包项目到dist

```yarn build```

其他命令可以参看[package.json](package.json)

## 新增页面流程

1. 在 services 中创建一个 service 管理网络请求
2. 在 src/pages 中创建一个对应的页面的文件夹及对应的Component页面
3. 在 config/router.config.js 中增加对应的路由

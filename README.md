# FoxONE Admin 模板工程
-------

FoxONE Admin 模板工程是基于 Ant Design Pro 的后台管理系统。


## 技术栈
```
yarn
reactjs
ant-design
umi
dva
bizchart
lodash
```

## Yarn命令

启动调试server

```yarn start```

打包项目到dist

```yarn build```

其他命令可以参看package.json

## 新增组件流程

1. 在 services 中创建一个 service 管理网络请求
2. 在 src/pages 中创建一个对应的页面的文件夹及Component

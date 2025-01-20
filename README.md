# busys

公交管理系统（bus system）。

## setup

运行环境

1. 安装 nvm。用于安装、切换、管理不同版本的node。（https://github.com/coreybutler/nvm-windows/releases）
2. 使用 nvm 安装 node 18 版本, `nvm install 18`。
3. 使用 淘宝 镜像源安装依赖，`npx nrm use taobao`。
4. pnpm install 安装依赖

参考：
- https://www.jianshu.com/p/13c0b3ca7c71

## 开发调试

pnpm dev:client 启动客户端
pnpm dev:server 启动服务器

## monorepo

本仓库采用pnpm+monorepo方式管理。

项目结构：

- apps: 可运行的服务
  - client：管理界面，基于reactjs。
  - server：服务端，基于nestjs。
  - doc：在线文档，基于docusaurus。
- packages： 可复用的代码
  - algorithm: 算法库

常用命令：
```
# 在根目录执行命令
pnpm <cmd>
# 执行子项目的命令
pnpm --filter <package-name> <cmd>

# 例如

# 添加依赖到所有项目，通常是 devDenpendice 公用基建。
pnpm add eslint -D
# 添加依赖到某个项目
pnpm -f client add lodash
pnpm -f @busys/algorithm add lodash
```


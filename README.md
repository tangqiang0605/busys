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

## 代码提交

git commit 需要符合规范 https://www.conventionalcommits.org/en/

分支采用多分支模型管理
1. 开发功能时从主分支切出新分支并开发。
2. 开发完成后提pr合入主分支。
3. 如果存在冲突：
```
# 当前为特性分支
git fetch origin main
git rebase -i origin/main

(处理冲突，完成rebase)

git push -f

(提交新的pr)
```


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
pnpm -w <cmd>
# 执行子项目的命令
pnpm --filter <package-name> <cmd>

# 例如

# 添加依赖到所有项目，通常是 devDenpendice 公用基建。
pnpm -w add husky -D
# 添加依赖到某个项目
pnpm -f client add lodash
pnpm -f @busys/algorithm add lodash
```

## 文档

周计划/日计划写在apps/doc/blog下，比如 apps\doc\blog\0210周计划.md
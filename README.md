### 初始化React项目

#### 1、路由配置

> 约定：组件统一放在 `components`，页面放在 `pages`文件夹下

> 通过 `createLoadableComp` 函数传入组件路径，路径以 `components` 或者 `pages` 开头，如：

```js
import createLoadableComp from '@/components/loadableComp';

const routes = [
  {
    path: '/',
    exact: true,
    component(props) {
      return createLoadableComp('components/dialog');
    },
  },
  {
    path: '/Articles',
    component(props) {
      return createLoadableComp('pages/articles');
    },
  },
];
```

#### 2、路由跳转

两种方式：

a. 引入 `lib` 下 `history` 文件

```js
import history from '@/lib/history';

history.push('/');

history.replace('/');
```

b. 组件内部的 `props` 包含 `history` 对象。

```js
const { history } = this.props;

history.push('/');
```

### 初始化React项目

#### 1、路由配置

约定组件统一放在 `components`，页面放在 `pages`文件夹下， 通过 `createLoadableComp` 函数传入组件路径，路径以 `components` 或者 `pages` 开头，如下例所示：

```js
import createLoadableComp from '../components/loadableComp';

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

以下两种方式均可：

a. 直接引入 `lib` 下 `history` 文件, `history` 包含的 `API` 查阅 [npm history 库]。(https://www.npmjs.com/package/history)

```js
import history from '../lib/history';

history.push('/');

history.replace('/');
```

b. 组件内部的 `props` 包含 `history` 对象，使用方法同上。

```js
const { history } = this.props;

history.push('/');
```

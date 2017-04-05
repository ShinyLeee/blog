---
title: "[译]介绍React Loadable"
date: "2017-03-18T06:39:25.028Z"
layout: post
path: "/articles/2017-03-18/"
category: "前端"
description: "以组件为中心的Code Splitting及在React中进行动态加载"
---

## 前言

当你拥有一个大型Web应用时，将所有的代码压缩成单个bundle文件的做法会影响该应用的首次加载时间。因此你可能需要将你的应用拆分成多个bundle文件，再对它们进行按需加载。

---

<figure>
	<img src="./singleVSmultiple.png" alt="singleVSmultiple">
	<figcaption>单个大文件 vs 拆分后的多个小文件</figcaption>
</figure>

有关如何拆分单个bundle文件，我们已经有了如Browserify及Webpack两个成熟的解决方案。

但我们首先需要做的是在要拆分应用中找到一个分离点，将分离点中依赖的模块打包到一起，当需要时对其进行异步加载，但同时你也需要让你的应用知道什么时候加载完成了。

### 基于路由的分离 vs 基于组件的分离

常见的建议是将你的应用拆分成多个独立的路由文件，并分别对其进行异步加载。这似乎能与大部分应用配合得不错，点击一个链接后加载一个新的页面并不会造成糟糕的用户体验。

但我们可以比这做的更好。

在使用过大量面向React的路由工具后我们可以发现，路由也仅仅只是一个组件，它们并没有什么特殊的地方。因此如果我们针对组件进行优化分离而不是仅仅赋予这个职责给路由组件呢？这会给我们带来什么？

<figure>
	<img src="./routeVScomponent.png" alt="routeVScomponent">
	<figcaption>基于路由的分离 vs 基于组件的分离</figcaption>
</figure>

可以发现这能给我们带来很多好处。除了基于路由分离的方式，我们还有很多其他的方式来拆分应用代码，比如Modals，Tabs以及许多其他用户操作过才显示的UI组件。

更不用说那些你可以推迟加载直到高优先度内容加载完毕后。那些在你的页面中处于非常底层的加载了大量库的组件：我们为什么要让它们跟高优先度的内容同时加载呢？

你仍然可以简单地基于路由来分离代码因为它们也仅仅只是一些组件，只管选择你认为最适合你的应用的方式即可。

但我们要做的是让组件级别的分离跟路由级别的分离一样简单。拆分代码到新的地方去应当跟改几行应用代码一样简单而其余的一切都是自动化的。

---

## 介绍React Loadable
React Loadable是一个轻量级的库，在作者James Kyle<a href="https://twitter.com/thejameskyle/status/839916840973299713" target="_blank">受够了别人说以上这些很难做到</a>的时候写的。。。

`Loadable`是一个简单化组件级别分离的高阶函数。

让我们想象一下有两个组件，其中一个组件引入并渲染另一个组件。

```
import AnotherComponent from './another-component';

class MyComponent extends React.Component {
  render() {
    return <AnotherComponent/>;
  }
}
```

此刻我们依赖的`AnotherComponent`通过`import`被同步加载，我们需要找到一个方式对其进行异步加载。

通过使用**dynamic import**（[目前处于阶段3的tc39提案](https://github.com/tc39/proposal-dynamic-import))我们可以修改我们的组件来异步加载`AnotherComponent`。

```jsx
class MyComponent extends React.Component {
  state = {
    AnotherComponent: null
  };

  componentWillMount() {
    import('./another-component').then(AnotherComponent => {
      this.setState({ AnotherComponent });
    });
  }
  
  render() {
    let {AnotherComponent} = this.state;
    if (!AnotherComponent) {
      return <div>Loading...</div>;
    } else {
      return <AnotherComponent/>;
    };
  }
}
```

然而，这仍有大量的重复性工作，另外并不能应对大量不同的场景，比如该如何处理当`import()`失败时？还有如何处理服务端渲染？

相反的是，你可以通过使用`Loadable`抽离这些困难，使用`Loadable`很简单，你所要做的仅仅是传递一个能加载组件并在加载时显示“Loading”组件的函数。

```jsx
import Loadable from 'react-loadable';

function MyLoadingComponent() {
  return <div>Loading...</div>;
}

const LoadableAnotherComponent = Loadable({
  loader: () => import('./another-component'),
  LoadingComponent: MyLoadingComponent
});

class MyComponent extends React.Component {
  render() {
    return <LoadableAnotherComponent/>;
  }
}
```

但如果组件加载失败呢？因此我们需要存有一个保存error状态的state。

为了能帮助你更好地控制显示的是什么，`error`将会简单地通过prop传递给`LoadingComponent`。

### import()自动code-splitting

关于import()最棒的事就是当你添加了新的一个模块时Webpack 2可以自动为你拆分代码时而你不用做任何额外的工作。

这意味着你可以只需要使用`React Loadable`并转换到`import()`就可以方便地实验不同的分离点，借此来找出哪种情形能最大幅度地挺升应用等表现。

### 避免Loading组件闪烁

有时候组件加载会相当快(<200毫秒)，所以加载界面会在屏幕中一闪而过。

而大量的用户研究已经证实，这会导致用户感知到的时间会比真正拥有的更长。而如果你什么都不显示的话，用户可能还认为它更快。

所以loading组件将会拥有一个`pastDelay`属性，一旦组件加载的时间比预先设定的`delay`时间长时就会被设定为`true`。

```javascript
export default function MyLoadingComponent({ error, pastDelay }) {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}
```

`delay`默认为200毫秒但是你可以通过`Loadable`函数的第三个参数自定义。

```javascript
Loadable({
  loader: () => import('./another-component'),
  LoadingComponent: MyLoadingComponent,
  delay: 300
});
```

### 预加载

作为一个优化手段，你可以自行决定是否在其渲染之前预加载一个组件。

举一个例子，如果你想要在点击一个按钮时加载一个新的组件，你就可以在用户把鼠标悬停在这个按钮的时候就预加载这个组件。

下面这个组件通过`Loadable`创建并暴露出了一个`preload`静态方法。

```jsx
let LoadableMyComponent = Loadable({
  loader: () => import('./another-component'),
  LoadingComponent: MyLoadingComponent,
});

class MyComponent extends React.Component {
  state = { showComponent: false };

  onClick = () => {
    this.setState({ showComponent: true });
  };

  onMouseOver = () => {
    LoadableMyComponent.preload();
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick} onMouseOver={this.onMouseOver}>
          Show loadable component
        </button>
        {this.state.showComponent && <LoadableMyComponent/>}
      </div>
    )
  }
}
```

### 服务端渲染

尚未了解React服务端渲染，避免不准确待后续翻译。

### 原文地址

[Introducing React Loadable - James Kyle](https://medium.com/@thejameskyle/react-loadable-2674c59de178#.3l9ymwo07)

---
title: "Gatsby的简单使用"
date: "2016-03-01T22:12:03.284Z"
layout: post
path: "/articles/2017-03-01/"
category: "前端"
description: "使用Gatsby构建静态页面博客并部署到Github Pages"
---

*一年前的这个时候，为了练练手搞了一个[博客项目](https://github.com/ShinyLeee/shinyBlog)，不过一直以来都没有用过，因为动态的博客写起来并不是很方便，因此这几天又通过[Gatsby](https://github.com/gatsbyjs/gatsby)搭建了一个简单静态博客。*

---

1. **安装gatsby**

最近都使用yarn了，能节省不少空间，速度还很快。

`yarn global add gatsby`

2. **选择starter并创建项目**

为了快速搭建博客，我选择了[lumen脚手架](https://github.com/wpioneer/gatsby-starter-lumen)，通过gatsby cli的以下命令就可以创建一个全新的项目文件夹并把远程的starter拉进去了。

`gatsby new blog git@github.com:wpioneer/gatsby-starter-lumen.git`

3. **Lumen Starter总结**

拉下来以后我发现这个starter其实还存在不少问题：

- ~~prefixLink(非pages文件夹下静态文件路径)生产环境会出现路径错误。~~ [[Fixed by #34]](https://github.com/wpioneer/gatsby-starter-lumen/pull/34)

- ~~开发环境装了eslint-config-airbnb却没有使用，作为一个编码规范洁癖感觉很难受，直接在.eslintrc里加上了该配置。~~ [[Fixed by #33]](https://github.com/wpioneer/gatsby-starter-lumen/pull/33)

- 加上[airbnb编码规范](https://github.com/airbnb/javascript)后以及[import](https://github.com/benmosher/eslint-plugin-import)、[react](https://github.com/yannickcr/eslint-plugin-react)、[jsxa11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)插件的各种约束，很多文件都会提示警报，因为文件数量较少也就直接自己改了，不然似乎可以试试[prettier](https://github.com/prettier/prettier)。

4. **部署前准备**

- 更改config.toml中的所需要用到的配置项，此文件中设置的变量可以通过require或import config引入。

- 删除不必要的文件，如travis.yml以及/pages/articles/中的文章等。

- 在/components/自定义组件、在/pages/articles/中添加自己的文章、在/pages/pages/中添加需要增加的页面。

5. **部署至Github Page**

- 在config.toml中添加`linkPrefix="/your project name"`
这一段非常重要否则会导致生产环境下路径地址不正确。

- 运行`gatsby build --prefix-links && gh-pages -d public`或直接`yarn run deploy`。

- 然后打开yourUsername/github.io/yourProjectName/会发现部署完成。

- 当然也可以把开发版本push到该项目的另一个branch中去方便管理。


import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, InlineCode, Card, Button, Table } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/advance-deep-in-component')
@page()
class LearnAdvanceDeepInComponentPage {
  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>深入理解组件</Header1>
      <Card>本节需要理解装饰器的相关知识</Card>
      <Header2>什么是组件？</Header2>
      在前端领域，组件一般是指描述页面的包含状态、事件处理的可复用的逻辑单元，所以【组件】的全称是视图组件，表现形式是函数（Vue，React）或者类（React，Angular）。
      在coco-mvc中，组件不仅是视图组件，还包括其他层面的可复用的逻辑单元，例如：工具组件、接口组件，表现形式是类。
      所以在coco-mvc中，组件的概念更广，从视图、行为、数据获取、工具库等全部都是组件，全部使用组件有 2 个好处：
      1. 统一的代码风格
      2. 可以使用依赖注入
      下面列出了框架提供的装饰器：
      * @component
      * @view
      * @page
      * @layout
      * @flow
      * @globalData
      * @render
      * @api
      * @util
      * @localStorage
      * @sessionStorage
      * @cookie
      * @store
      * @router
      这些装饰器比较特殊，如果一个类添加上述装饰器，类就是框架约定的组件了。
      <Header2>框架提供的组件</Header2>
      * Router
      * Route
      * LocalStorage
      * SessionStorage
      * Cookie
    </ContentLayout>
  }
}

export default LearnAdvanceDeepInComponentPage;
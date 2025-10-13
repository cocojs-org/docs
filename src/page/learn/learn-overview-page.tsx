import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Table, Card } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";
import LoginEffect from "@/effect/login-effect";

@route('/learn/overview')
@page()
class LearnOverviewPage {
  @autowired()
  router: Router;

  clickDirectoryStructure = () => {
    this.router.navigateTo('/learn/directory-structure');
  }

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>总览</Header1>
      <Card>
        如果你还不了解 HTML CSS JavaScript（Class和Decorator） 和 JSX 知识，请先学习相关知识再回来。
      </Card>
      <Header2>什么是coco-mvc？</Header2>
      <div>coco-mvc（coco是coconut的缩写）是一个JavaScript框架，使用类和装饰器开发web应用。</div>
      <Header2>视图组件和视图装饰器</Header2>
      介绍jsx、@reactive、@view、@page、@layout、@memoized、@bind、@ref、@refs、@store、生命周期函数、调和算法。介绍约定的根目录。
      <Header2>副作用组件和副作用装饰器</Header2>
      介绍@effect。介绍约定的根目录。
      <Header2>工具类组件和工具装饰器</Header2>
      介绍@util、@api、@globalData、@localStorage、@sessionStorage、@cookie、LocalStorage组件、SessionStorage组件、Cookie组件。介绍约定的根目录。
      <Header2>依赖注入和目录结构</Header2>
      介绍使用依赖注入组装组件，介绍@autowired、@qualifier、@constructorParam，给出分层的好处
      <Header2>运行时配置和环境变量</Header2>
      介绍构建配置的作用、运行时配置的作用、如何使用使用环境变量指定对应的配置。介绍@webApplication、@configuration、@value。
      <Header2>路由组件和路由装饰器</Header2>
      介绍@router、@route、Router组件、Route组件
      <Header2>cli工具、构建配置</Header2>
      介绍创建应用命令、创建库命令、应用开发命令、应用打包命令、库开发命令、库打包命令。
      <Header2>自定义装饰器</Header2>
      介绍框架装饰器的内部原理，介绍元数据类，元数据类id，介绍装饰器参数赋值给元数据的逻辑，介绍createDecoratorExp\createPlaceholderDecoratorExp函数，介绍自定义装饰器。介绍@target，Metadata类
      <Header2>组件装饰器</Header2>
      介绍组件id @component @scope，如何注册第三方组件，介绍复合组件，复合3层的限制，介绍组件的init和start方法，介绍getComponent函数。
    </ContentLayout>
  }
}

export default LearnOverviewPage;
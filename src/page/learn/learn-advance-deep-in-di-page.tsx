import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/advance-deep-in-di')
@page()
class LearnAdvanceDeepInDIPage {

  code: string = `
import { autowired } from 'coco-mvc';

@api()
class UserApi {
  login() {
    return 'login';
  }
}

@view()
class UserService {
  @autowired()
  private userApi: UserApi;
}
  `;

  code1: string = `
import { constructorParam } from 'coco-mvc';

@component()
class Render {}

@constructorParam()
class Router {
  constructor(render: Render) {
    this.render = render;
  }
}
  `;

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>深入依赖注入</Header1>
      依赖注入（Dependency Injection，简称DI）是一种设计模式，常见于Angular、Spring等框架，coco-mvc框架也提供了相似的功能，用于实现松耦合，以便于开发测试。
      coco-mvc提供了2种形式的依赖注入：
      1. 使用autowired装饰器注入
      2. 使用constructorParam装饰器注入
      <Header2>使用autowired装饰器注入</Header2>
      <Code code={this.code} />
      首先确保被注入类已经声明为组件，然后在另外一个组件中添加一个field，并指定类型是被注入的类，最后在field上添加@autowired装饰器即可。
      框架在实例化UserService的时候，会自动注入UserApi实例，并赋值给userApi字段。

      <Header2>使用constructorParam装饰器注入</Header2>
      <Code code={this.code1} />
      同样确保被注入的类已经声明为组件，如上面的Render组件，然后另外一个类的构造函数中添加一个参数，并通过类型指定参数类型是被注入的类，最后在组件上添加@constructorParam装饰器即可。
      框架在实例化Router的时候，会自动注入Render实例，并赋值给render参数。

      那么2种注入方式有什么区别呢？
      1. 使用@autowired注入的方式，框架会处理循环依赖；而使用@constructorParam注入的方式，存在循环依赖会抛出异常。
      2. 使用@autowired注入的方式，不能设置到类的私有属性；而使用@constructorParam注入的方式，可以设置到类的私有属性。

      使用场景区别：
      1. 因为使用@autowired进行注入的方式更加灵活，适合在业务中使用；而使用@constructorParam进行注入的方式更加严格，适合在类库中使用。
    </ContentLayout>
  }
}

export default LearnAdvanceDeepInDIPage;
import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Table } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/advance-deep-in-component')
@page()
class LearnAdvanceDeepInComponentPage {
  code: string = `
import { Metadata } from 'coco-mvc';
import { createDecoratorExp } from 'coco-mvc';

@target([Target.Type.Class])
class Footer extends Metadata {}

const footer = createDecoratorExp(
  Footer
) as () => Decorator<ClassDecoratorContext>;
export { Footer, footer };
  `;

  code1: string = `
import { Metadata, view } from 'coco-mvc';
import { createDecoratorExp } from 'coco-mvc';

@view()
@target([Target.Type.Class])
class Footer extends Metadata {}

const footer = createDecoratorExp(
  Footer
) as () => Decorator<ClassDecoratorContext>;
export { Footer, footer };
  `;

  code2: string = `
@target([Target.Type.Class])
@component(Component.Scope.Prototype)
class View extends Metadata {} 
  `

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>深入组件</Header1>
      在总览一节中介绍通过添加不同的装饰器用于表示不同的组件：使用@view装饰器表示视图组件，使用@controller装饰器表示控制组件，使用@api装饰器表示接口组件，
      下面列出了框架提供的可以将类标记成组件的装饰器：
      * @component
      * @view
      * @page
      * @layout
      * @controller
      * @globalData
      * @render
      * @api
      * @util
      * @localStorage
      * @sessionStorage
      * @cookie
      * @store
      * @router
      不同的装饰器表示不同业务意义，具体可以见指引页面。
      <Header2>什么是组件？</Header2>
      上面提到了视图组件、控制组件、接口组件，这些组件与常见的前端框架中组件的概念是不一样的：
      * 常见前端框架中的组件一般是指多个浏览器标签组合起来的可复用的逻辑单元。
      * coco-mvc中，组件是指添加了例如@view等特定装饰器的类。
      <Header1>复合装饰器</Header1>
      和创建装饰器一节同样的做法，现在创建一个@footer装饰器，表示页脚组件：
      <Code code={this.code} />
      但是有一个问题：如何让框架知道添加了@footer装饰器的类就是组件呢？因为Footer本身也是类，那么给Footer加上@view装饰器就可以了：
      <Code code={this.code1} />
      通过为元数据类添加装饰器的方式，@footer装饰器复合了@view装饰器的功能。
      那么为什么框架为什么会认为@view装饰器的类就是组件呢，因为@view装饰器复合了@component装饰器：
      <Code code={this.code2} />
      其实coco-mvc找到有@component装饰器的类就是组件，但是@component的复合装饰器 和 @component的复合装饰器的复合装饰器 也是可以的。
      总结来说，一共有3层：
      1. 最底层：用于标记完全没有业务含义的组件，这层装饰器有 @component
      2. 第二层：用于标记主要业务类型的装饰器，有：@view @controller @util @globalData @render @store @router
      3. 第三层：用于主要业务类型的系分类型，有 @page @layout @api @localStorage @sessionStorage @cookie
    </ContentLayout>
  }
}

export default LearnAdvanceDeepInComponentPage;
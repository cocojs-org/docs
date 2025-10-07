import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import {Header1, Header2, Code, InlineCode, CodePanel, Button, Table, Card} from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/advance-create-decorator')
@page()
class LearnAdvanceCreateDecoratorPage {

  code: string = `
import { createDecoratorExp, Metadata } from 'coco-mvc'; 

// 1. 定义一个元数据类
class Debounced extends Metadata {} 

// 2. 调用工厂方法，返回一个装饰器表达式。
// 3. 通过类型给出装饰器表达式具详细类型，通过泛型确定是类装饰器、field装饰器或method装饰器
const debounced: () => Decorator<ClassMethodDecoratorContext> = createDecoratorExp(Debounced) 

export { Debounced, debounced };
  `

  code1: string = `
import { createDecoratorExp, Metadata } from 'coco-mvc'; 

@target([Type.Class])
class Debounced extends Metadata {} 

// 1. 定义后置处理函数postConstruct，函数会在组件实例化之后立刻执行，从而替换掉原本的函数
function postConstruct(
  metadata: Debounced,
  appCtx: ApplicationContext,
  name: string
) {
  const func = this[name];
  this[name] = function(...args) {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, 5000);
  };
}

const debounced: () => Decorator<ClassMethodDecoratorContext> = createDecoratorExp(Debounced, {postConstruct}) 

export { Debounced, debounced };  
  `

  code2: string = `
const target: (
  type: Type[],
  decoratorSelf?: true
) => Decorator<ClassDecoratorContext> = createDecoratorExpByName('target');

@target([Type.Class], true)
class Target extends Metadata {
  static Type = Type;

  value: Type[];
}

export default { target, Target };
  `

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>创建一个装饰器</Header1>
      <Card>
        注意，请先阅读深入装饰器一节，了解装饰器实现逻辑。
      </Card>
      随着业务的扩张框架暴露的装饰器不能满足某些功能，例如：为方法添加防抖功能，很容易想到在方法上添加一个装饰器@debounced来实现这个功能，
      框架提供了工厂函数创建装饰器，创建过程如下：
      第一步：定义元数据类和调用工厂方法生成装饰器表达式
      <Code code={this.code} />
      第二步：添加后置处理函数
      <Code code={this.code1} />
      <Header2>createDecoratorExpByName</Header2>
      在创建装饰器的时候，有时候会遇到装饰器需要装饰自身对应的元数据类的情况，这时候元数据类还没有定义，所以不能使用createDecoratorExp方法创建，
      框架还提供了createDecoratorExpByName方法，先生成装饰器表达式，再应用到元数据类上，例如，@target装饰器就是这种情况：
      <Code code={this.code2} />
      返回的装饰器表达式多第二个参数，用于装饰自己对应的元数据时设置成true，其他情况和createDecoratorExp使用方式是一致的。
    </ContentLayout>
  }
}

export default LearnAdvanceCreateDecoratorPage;
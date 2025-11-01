import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Table, Card } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';

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
  `;

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
  `;

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
  `;

    codeA: string = `
import { Metadata } from 'coco-mvc';
import { createDecoratorExp } from 'coco-mvc';

@target([Target.Type.Class])
class Footer extends Metadata {}

const footer = createDecoratorExp(
  Footer
) as () => Decorator<ClassDecoratorContext>;
export { Footer, footer };
  `;

    codeB: string = `
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

    viewCode: string = `
@target([Target.Type.Class])
@component(Component.Scope.Prototype)
class View extends Metadata {} 
  `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>创建一个装饰器</Header1>
                <Card>注意，请先阅读深入装饰器一节，了解装饰器实现逻辑。</Card>
                随着业务的扩张框架暴露的装饰器不能满足某些功能，例如：为方法添加防抖功能，很容易想到在方法上添加一个装饰器@debounced来实现这个功能，
                框架提供了工厂函数创建装饰器，创建过程如下： 第一步：定义元数据类和调用工厂方法生成装饰器表达式
                <Code code={this.code} />
                第二步：添加后置处理函数
                <Code code={this.code1} />
                <Header2>createDecoratorExpByName</Header2>
                在创建装饰器的时候，有时候会遇到装饰器需要装饰自身对应的元数据类的情况，这时候元数据类还没有定义，所以不能使用createDecoratorExp方法创建，
                框架还提供了createDecoratorExpByName方法，先生成装饰器表达式，再应用到元数据类上，例如，@target装饰器就是这种情况：
                <Code code={this.code2} />
                返回的装饰器表达式多第二个参数，用于装饰自己对应的元数据时设置成true，其他情况和createDecoratorExp使用方式是一致的。
                <Header1>自定义装饰器</Header1>
                假如现在有一个需求：整个项目的不同页面需要使用不同样式页脚，也就是需要封装多个页脚组件，但是框架没有提供页脚对应的装饰器（@view过于宽泛，@page
                @layout 更是不对）， 这时候我们需要自定义一个@footer装饰器，表示页脚组件：
                <Code code={this.codeA} />
                但是有一个问题：如何让框架知道@footer装饰器的类就是组件呢？一个简单的方法是给Footer加上@view装饰器：
                <Code code={this.codeB} />
                因为@view装饰器是组件，可以简单的理解为@view
                的组件功能传递到了@footer上。这同样也是@view装饰器比较特殊的原因，因为View上添加了@component装饰器：
                <Code code={this.viewCode} />
                下面给出组件装饰器的定义： 1. @component是组件装饰器 2.
                如果元数据类添加了@component装饰器，那么元数据类对应的装饰器也是组件装饰器 3.
                如果元数据类添加了任意一个组件装饰器，那么元数据类对应的装饰器就是组件装饰器（传递性） 4.
                元数据类的组件装饰器个数只能是一个 5.
                如果几个组件装饰器循环装饰了对应的元数据类，那么这些装饰器都不是组件装饰器
                <Card>虽然组件装饰器可以无限层级的传递，但通常建议 3 层、4 层传递是比较合适的。</Card>
            </ContentLayout>
        );
    }
}

export default LearnAdvanceCreateDecoratorPage;

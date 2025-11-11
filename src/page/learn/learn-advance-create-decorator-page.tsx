import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Table, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-create-decorator')
@page()
class LearnAdvanceCreateDecoratorPage {
    debouncedDecoratorCode: string = `
import { createDecoratorExp, Metadata } from 'coco-mvc'; 

// 1. 定义一个元数据类
class Debounced extends Metadata {} 

// 2. 调用工厂方法，返回一个装饰器表达式。
// 3. 通过类型给出装饰器表达式具详细类型，通过泛型确定是类装饰器、field装饰器或method装饰器
const debounced: () => Decorator<ClassMethodDecoratorContext> = createDecoratorExp(Debounced) 

export { Debounced, debounced };
    `;

    debouncedPostConstructCode: string = `
import { createDecoratorExp, Metadata } from 'coco-mvc'; 

@target([Type.Class])
class Debounced extends Metadata {} 

// 1. 定义后置处理函componentPostConstruct，函数会在组件实例化之后立刻执行，从而替换掉原本的函数
function componentPostConstruct(
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

const debounced: () => Decorator<ClassMethodDecoratorContext> = createDecoratorExp(Debounced, {componentPostConstruct}) 

export { Debounced, debounced };  
    `;

    footerCode2: string = `
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

    targetDecorator: string = `
import { Metadata } from 'coco-mvc';

// const target = createDecoratorExp(Target) 放在这里不行，Target还没定义

@target([Target.Type.Class])
class Target extends Metadata {}

// const target = createDecoratorExp(Target) 放在这里好像也不行，没办法添加@target装饰器
    `;

    targetDecorator1: string = `
import { Metadata } from 'coco-mvc';

const target: DecoratorExpWithDecoratorSelf<Type[]> = createPlaceholderDecoratorExp();

@target.decorateSelf([Type.Class])
class Target extends Metadata {
    static Type = Type;

    value: Type[];
}

export { Target, target };
    `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>创建一个装饰器</Header1>
                <Card>注意，请先阅读装饰器前面的章节后再来看本节内容。</Card>
                随着业务的扩张框架暴露的装饰器不能满足某些功能，例如：为方法添加防抖功能，很容易想到为方法添加@debounced装饰器实现这个功能，
                框架提供了工厂函数创建装饰器，创建过程如下： 第一步：定义元数据类和调用工厂方法生成装饰器表达式
                <Code code={this.debouncedDecoratorCode} />
                第二步：添加后置处理函数
                <Code code={this.debouncedPostConstructCode} />
                <Header2>createPlaceholderDecoratorExp</Header2>
                上面例子使用<InlineCode>createDecoratorExp</InlineCode>
                创建一个装饰器，这个方法适合先定义元数据类再生成对应的装饰器场景。
                但有些时候可能需要装饰器装饰自己元数据类的情况，例如<InlineCode>@target</InlineCode>
                装饰器，这个装饰器的作用是表明装饰器的装饰目标的，但Target本身也需要添加@target装饰器，表明
                <InlineCode>@target</InlineCode>装饰器只能装饰类。 这时候<InlineCode>createDecoratorExp</InlineCode>
                就不能满足要求了：
                <Code code={this.targetDecorator} />
                解决方法是先创建一个占位的装饰器表达式，然后关联自身对应的元数据类的时候使用特殊的装饰器，例如：
                <Code code={this.targetDecorator1} />
                <InlineCode>createPlaceholderDecoratorExp</InlineCode>的作用就是创建一个占位的装饰器表达式，同时使用
                <InlineCode>@decorateSelf</InlineCode>装饰器为自己添加装饰器的同时，告诉框架@target和Target 的关联关系，
                <InlineCode>@target.decorateSelf</InlineCode>和<InlineCode>@target</InlineCode>的参数类型是一样的。
                <Card>
                    元数据类也是类，也可以添加类装饰器，例如上面的View元数据类，有一个@target装饰器，用于表示@view装饰器只能作为类装饰器。
                    但元数据类暂时只支持类装饰器
                </Card>
                <Header2>创建组件装饰器</Header2>
                创建组件装饰器和创建普通的装饰器类似，需要在元数据类上添加组件装饰器和<InlineCode>@target</InlineCode>装饰器。
                更多需要注意的是应该添加哪个组件装饰器，我们给出一些建议：<span className={'text-primary'}>看要添加的装饰器的业务函数放在现有的组件装饰器树的哪个节点下面合适，那么就添加对应的装饰器</span>。
                假如现在有一个需求：整个项目的不同页面需要使用不同样式页脚，也就是需要封装多个页脚组件，但是框架没有提供页脚对应的装饰器（@view过于宽泛，@page
                @layout 更是不对），这时候我们需要自定义一个@footer装饰器，表示页脚组件：
                <Code code={this.footerCode2} />
                <Card>虽然组件装饰器可以无限层级的传递，但通常建议 3 层、4 层传递是比较合适的。</Card>
            </ContentLayout>
        );
    }
}

export default LearnAdvanceCreateDecoratorPage;

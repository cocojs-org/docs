import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/advance-deep-in-decorator')
@page()
class LearnAdvanceDeepInDecoratorPage {
  viewDecorator: string = `
import { Metadata } from 'coco-mvc';

@target([Target.Type.Class])
class View extends Metadata {}

const view = createDecoratorExp(
  View
) as () => Decorator<ClassDecoratorContext>;

export { View, view };
  `;

  buttonClass: string = `
import { view } from 'coco-mvc';

@view()
class Button {
  render() {
    return <button>click me</button>;
  }
}
export default View;
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
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>深入装饰器</Header1>
      装饰器是一种强大的编程特性，可以在不修改原有代码的情况下，给类及其成员添加额外的行为。ES 的装饰器提案处于stage3阶段，具体语法见https://github.com/tc39/proposal-decorators。
      虽然提案规定了装饰器语法，但没规定运行时如何读取和使用装饰器参数，这需要使用者自己解决。
      coco-mvc框架采用元数据和装饰器一一对应的方式。具体来说就是：在开发时，开发者根据不同的业务为类添加不同的装饰器，
      在运行时，框架会收集装饰器参数，校验去掉不合法的装饰器，每个装饰器就会以元数据的形式保存在内容中，装饰器和元数据实例一对一对应。
      比如@view装饰器和View元数据类：
      <Code code={this.viewDecorator} />
      他们通过createDecoratorExp绑定，假设一个名为Button的类使用了@view装饰器，那么运行时框架会为Button关联一个View实例，这样框架就知道 Button 是一个视图组件。
      <Code code={this.buttonClass} />
      <Card>
        一般来说，元数据类名和装饰器名字应该保持一致（除了首字母大小写不同）。例如<InlineCode>View</InlineCode>和<InlineCode>view</InlineCode>
      </Card>
      <Card>
        元数据类也是类，也可以添加类装饰器，例如上面的View元数据类，有一个@target装饰器，用于表示@view装饰器只能作为类装饰器。
        但元数据类暂时只支持类装饰器
      </Card>
      <Header2>createPlaceholderDecoratorExp</Header2>
      上面例子使用<InlineCode>createDecoratorExp</InlineCode>创建一个装饰器，这个方法适合先定义元数据类再生成对应的装饰器场景。
      但有些时候可能需要装饰器需要装饰自身的情况，例如<InlineCode>@target</InlineCode>装饰器，是用来表明装饰器的装饰目标类型的，但Target本身也需要添加@target装饰器，表明<InlineCode>@target</InlineCode>装饰器只能装饰类。
      这时候<InlineCode>createDecoratorExp</InlineCode>就不能满足要求了：
      <Code code={this.targetDecorator} />
      解决方法是先创建一个占位的装饰器表达式，然后关联自身对应的元数据类的时候使用特殊的装饰器，例如：
      <Code code={this.targetDecorator1} />
      <InlineCode>createPlaceholderDecoratorExp</InlineCode>的作用就是创建一个占位的装饰器表达式，同时使用<InlineCode>@decorateSelf</InlineCode>装饰器为自己添加装饰器的同时，告诉框架@target和Target
      的关联关系，<InlineCode>@target.decorateSelf</InlineCode>和<InlineCode>@target</InlineCode>的参数类型是一样的。
      <Header1>装饰器参数赋值给元数据field</Header1>
      上面说到，框架在运行时会实例化装饰器对应的元数据类，具体来说是根据装饰器表达式第一个参数的类型进行分情况讨论：
      1. 如果类型是纯对象（即<InlineCode>{}</InlineCode>），则找到该对象自身全部可枚举的field，浅赋值给元数据实例
      2. 其他类型：
       2.1 如果元数据类定义了field，那么会获取第一个field，进行赋值
       2.2 如果元数据类没有定义field，那么默认赋值给"value"这个field
      <Card>
        1. 只会使用装饰器表达式的第一个参数
        2. 如果希望接受多个装饰器参数，只能为元数据类定义多个field，同时装饰器参数只能使用纯对象
        3. 如果元数据类只有一个field，且不是赋值给默认值，那么需要给key添加默认值，哪怕是undefined
      </Card>
    </ContentLayout>
  }
}

export default LearnAdvanceDeepInDecoratorPage;
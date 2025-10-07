import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/advance-deep-in-decorator')
@page()
class LearnAdvanceDeepInDecoratorPage {
  code: string = `
import { Metadata } from 'coco-mvc';

@target([Target.Type.Class])
class View extends Metadata {}
export default View;
  `;

  code1: string = `
import { createDecoratorExp } from 'coco-mvc';
import View from '../metadata/view.ts';

export default createDecoratorExp(
  View
) as () => Decorator<ClassDecoratorContext>;
  `;

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>深入装饰器</Header1>
      开发者通过装饰器为类添加参数，然后在运行时使用这些参数，在JS的装饰器本质是一个函数（见https://github.com/tc39/proposal-decorators），
      规范规定了装饰器语法，但没规定如何保存使用装饰器参数，这使得在运行时获取装饰器参数是比较麻烦的。
      coco-mvc框架使用元数据保存装饰器参数，简单的说：每一个装饰器都对应一个元数据类，例如@view装饰器：
      <Code code={this.code} />
      然后使用createDecoratorExp生成Log对应的装饰器表达式：
      <Code code={this.code1} />
      <Card>
        一般来说，元数据类名和装饰器名字应该保持一致，除了首字母大小写不同。例如View和view
      </Card>
      假设一个名为Button的类使用了@view装饰器，那么在运行时，框架内部会将Button关联一个View实例，方便后续操作。
      <Card>
        元数据类也是类，也可以添加类装饰器，例如上面的View元数据类，有一个@target装饰器，用于表示@view装饰器只能作为类装饰器。
        元数据类暂时只支持类装饰器
      </Card>
      <Header1>元数据实例化赋值</Header1>
      上面说到，coco-mvc在运行时会使用装饰器参数对元数据进行实例化，默认只会使用装饰器的第一个参数去赋值，根据第一个参数的类型进行分情况讨论：
      1. 如果类型是纯对象（即{}），找到该对象自身的可枚举的key，使用浅赋值赋值给元数据实例
      2. 其他类型：
       2.1 如果元数据类定义了key，那么会获取第一个key，进行赋值
       2.2 如果元数据类没有定义key，那么默认赋值给value的key
      <Card>
        1. 如果元数据类有多个key，那么装饰器参数只能使用纯对象的方式
        2. 如果元数据类只有一个key，且不是赋值给默认值，那么需要给key添加默认值，哪怕是undefined
      </Card>
    </ContentLayout>
  }
}

export default LearnAdvanceDeepInDecoratorPage;
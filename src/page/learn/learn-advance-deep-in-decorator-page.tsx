import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';

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

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>深入装饰器</Header1>
                <div>
                    装饰器是一种强大的编程特性，可以在不修改原有代码的情况下，给类及其成员添加额外的行为。ES
                    的装饰器提案处于stage3阶段，具体语法见https://github.com/tc39/proposal-decorators。
                </div>
                <div>
                    虽然规范确定了装饰器语法，但没规定运行时如何读取和使用装饰器参数，这需要使用者自己解决。
                    coco-mvc框架采用元数据和装饰器一一对应的方式，具体来说就是：在开发时，开发者根据业务需要为类添加不同的装饰器，
                    在运行时，框架收集装饰器参数，校验删除非法的装饰器，剩下的装饰器就会以元数据的形式保存起来，装饰器和元数据实例一对一对应。
                    比如<InlineCode>@view</InlineCode>装饰器和<InlineCode>View</InlineCode>元数据类是这样定义的：
                </div>
                <Code code={this.viewDecorator} />
                装饰器和元数据类通过createDecoratorExp绑定，假设一个名为Button的类添加了@view装饰器，那么运行时Button会关联一个View实例，这样框架就知道
                Button 是一个视图组件。
                <Code code={this.buttonClass} />
                <Card>一般来说，元数据类名和装饰器名字应该保持一致（除了首字母大小写不同）。</Card>
                <Header2>装饰器参数赋值给元数据</Header2>
                上面说到，框架在运行时会实例化装饰器对应的元数据类，具体来说拿装饰器表达式第一个参数的类型进行分情况讨论：
                <ul>
                    {/* TODO:空对象还有报错：this.props.children.trim is not a function */}
                    <li>如果类型是纯对象（即<InlineCode>Record&lt;string, any&gt;</InlineCode>
                    ），则找到该对象自身全部可枚举的field，浅赋值给元数据实例</li>
                    <li>其他类型：
                        <ul>
                            <li>如果元数据类定义了field，那么会获取第一个field，进行赋值</li>
                            <li>如果元数据类没有定义field，那么默认赋值给"value"这个field</li>
                        </ul>
                    </li>
                </ul>
                
            </ContentLayout>
        );
    }
}

export default LearnAdvanceDeepInDecoratorPage;

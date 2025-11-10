import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-decorator-runtime')
@page()
class LearnAdvanceDecoratorRuntimePage {
    viewDecorator: string = `
import { Metadata, component } from 'coco-mvc';

@target([Target.Type.Class])
@component()
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

    decoratorTarget: string = `
@component() // 支持在类上添加装饰器
class Button {
    @show()   // 支持在字段上添加装饰器
    name: string;
    
    @bind()   // 支持在方法上添加装饰器
    getName() {}
    
    @computed()   // 不支持在 getter 上添加装饰器
    get _name() {}
    
    @bind()   // 不支持在 setter 上添加装饰器
    set _name() {}
}
`


    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>装饰器运行时</Header1>
                装饰器是一种强大的编程特性，在coco-mvc中，装饰器只能在<span className={'text-primary'}>类、类字段和类方法</span>上添加装饰器。
                <Code code={this.decoratorTarget} />
                虽然规范规定了装饰器语法，但框架需要自行解决运行时如何使用装饰器参数的问题，coco-mvc采用装饰器和元数据一一对应，运行时生成元数据实例的方式，
                例如<InlineCode>@view</InlineCode>装饰器对应<InlineCode>View</InlineCode>元数据类：
                <Code code={this.viewDecorator} />
                <InlineCode>createDecoratorExp</InlineCode>函数的作用就是关联装饰器和元数据类，
                假设在业务中<InlineCode>Button</InlineCode>添加了<InlineCode>@view</InlineCode>装饰器，运行时框架为<InlineCode>Button</InlineCode>会关联一个<InlineCode>View</InlineCode>实例，这样框架就知道
                <InlineCode>Button</InlineCode>是一个视图组件。
                <Code code={this.buttonClass} />
                <Card>
                    <ul>
                        <li>一般来说，元数据类名和装饰器名字是一致的（除了首字母大小写不同）</li>
                        <li>标准规范见：https://github.com/tc39/proposal-decoratorsES</li>
                    </ul>
                </Card>
                <Header2>保存装饰器表达式参数</Header2>
                上面说到，运行时框架会实例化装饰器对应的元数据类，如果装饰器表达式有参数，那么参数也需要在元数据中保存。
                具体来说拿装饰器表达式第一个参数进行分情况讨论：
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

export default LearnAdvanceDecoratorRuntimePage;

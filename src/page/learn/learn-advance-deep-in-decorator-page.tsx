import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-deep-in-decorator')
@page()
class LearnAdvanceDeepInDecoratorPage {
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

    pageDecorator: string = `
import { Metadata } from 'coco-ioc-container';
import view from '../view';

@view()
class Page extends Metadata {}

const page = createDecoratorExp(Page) as () => Decorator<ClassDecoratorContext>;

export { Page, page };
    `;

    componentTreeCode: string = `
component
    |
    +---view
    |    |
    |    +---page
    |    +---layout
    |
    +---util
    |    |
    |    +---api
    |    +---localStorage
    |    +---sessionStorage
    |    +---cookie
    |
    +---flow
    |
    +---store
    |
    +---globalData
`


    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>深入装饰器</Header1>
                <div>
                    装饰器是一种强大的编程特性，ES规范虽然规定了装饰器语法，但框架需要自行解决运行时如何使用装饰器参数的问题。
                    coco-mvc采用装饰器和元数据一一对应，运行时生成元数据实例的方式，
                    例如<InlineCode>@view</InlineCode>装饰器对应<InlineCode>View</InlineCode>元数据类：
                </div>
                <Code code={this.viewDecorator} />
                <InlineCode>createDecoratorExp</InlineCode>就是起到对应作用的函数，
                假设在业务中<InlineCode>Button</InlineCode>添加了<InlineCode>@view</InlineCode>装饰器，运行时框架为<InlineCode>Button</InlineCode>会关联一个<InlineCode>View</InlineCode>实例，这样框架就知道
                <InlineCode>Button</InlineCode>是一个视图组件。
                <Code code={this.buttonClass} />
                <Card>一般来说，元数据类名和装饰器名字是一致的（除了首字母大小写不同）。</Card>
                <Header2>组件装饰器</Header2>
                组件装饰器是指可以将<InlineCode>class</InlineCode>增强为组件的装饰器。<InlineCode>@view</InlineCode>就是组件装饰器，下面列举了框架提供的所有组件装饰器：
                <ul>
                    <li>@component</li>
                    <li>@view</li>
                    <li>@page</li>
                    <li>@layout</li>
                    <li>@flow</li>
                    <li>@globalData</li>
                    <li>@render</li>
                    <li>@api</li>
                    <li>@util</li>
                    <li>@localStorage</li>
                    <li>@sessionStorage</li>
                    <li>@cookie</li>
                    <li>@store</li>
                    <li>@router</li>
                </ul>
                <div>
                    那么有个问题：组件装饰器和其他装饰器（例如：<InlineCode>@bind</InlineCode>）有什么区别？
                    首先，<InlineCode>@component</InlineCode>是组件装饰器，然后如果一个装饰器对应的元数据类有<InlineCode>@component</InlineCode>装饰器，那么也是组件装饰器，例如<InlineCode>@view</InlineCode>。
                    然后如果一个装饰器对应的元数据类有<InlineCode>@view</InlineCode>装饰器，那么也是组件装饰器。例如<InlineCode>@page</InlineCode>。
                </div>
                <Code code={this.pageDecorator} />
                <div>
                    也就是说框架递归地找装饰器元数据类、元数据类的装饰器的元数据类是否包含<InlineCode>@component</InlineCode>装饰器，如果找到的话就是组件装饰器。
                    框架本身提供的装饰器关系如下（下一级装饰器的元数据类都有上一级的装饰器）：
                    <Code code={this.componentTreeCode}></Code>
                    也就是说框架<span className={'text-primary font-bold'}>根据不同业务场景、不同抽象程度提供不同的装饰器</span>：
                    <ul>
                        <li><InlineCode>@component</InlineCode>无任何业务含义的组件装饰器</li>
                        <li>
                            <ul>
                                <li>
                                    <InlineCode>@view</InlineCode>是通用的视图组件装饰器
                                </li>
                                <li>
                                    <InlineCode>@page</InlineCode>是页面组件装饰器
                                </li>
                                <li>
                                    <InlineCode>@layout</InlineCode>是布局组件装饰器
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <InlineCode>@util</InlineCode>是通用的工具组件装饰器
                                </li>
                                <li>
                                    <InlineCode>@api</InlineCode>都是工具层的组件装饰器
                                </li>
                                <li>
                                    <InlineCode>@localStorage</InlineCode>都是工具层的组件装饰器
                                </li>
                                <li>
                                    <InlineCode>@sessionStorage</InlineCode>都是工具层的组件装饰器
                                </li>
                            </ul>
                        </li>
                        <li><InlineCode>@flow</InlineCode>表示通用的流程组件装饰器</li>
                        <li><InlineCode>@store</InlineCode>表示通用的视图层状态组件装饰器</li>
                        <li><InlineCode>@globalData</InlineCode>表示通用的全局变量组件装饰器</li>
                    </ul>
                </div>
                <Card>
                    ES装饰器提案处于stage3阶段，语法见：https://github.com/tc39/proposal-decorators。
                </Card>
            </ContentLayout>
        );
    }
}

export default LearnAdvanceDeepInDecoratorPage;

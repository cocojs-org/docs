import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-component-decorator')
@page()
class LearnAdvanceComponentDecoratorPage {
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
                <Header1>组件装饰器</Header1>
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
                    那么框架判断一个装饰器是不是组件装饰器的逻辑如下：
                    <ul>
                        <li>首先<InlineCode>@component</InlineCode>是组件装饰器。</li>
                        <li>如果一个装饰器对应的元数据类有<InlineCode>@component</InlineCode>装饰器，那么这个装饰器也是组件装饰器，例如<InlineCode>@view</InlineCode>。</li>
                        <li>如果一个装饰器对应的元数据类有<InlineCode>@view</InlineCode>装饰器，那么也是组件装饰器。例如<InlineCode>@page</InlineCode>。</li>
                    </ul>
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
            </ContentLayout>
        );
    }
}

export default LearnAdvanceComponentDecoratorPage;

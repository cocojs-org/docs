import { route, page, reactive, bind, Router, autowired } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-component-decorator')
@page()
class LearnAdvanceComponentDecoratorPage {
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
                组件装饰器是一类特殊的装饰器，在类上添加组件装饰器后，框架就会把类标记成组件，方便统一管理。框架判断一个装饰器是组件装饰器的逻辑如下：
                <ul className={'list-decimal pl-5'}>
                    <li><InlineCode>@component</InlineCode>是组件装饰器。</li>
                    <li>如果一个装饰器对应的元数据类有<InlineCode>@component</InlineCode>装饰器，那么也是组件装饰器。</li>
                    <li>递归的找装饰器对应的元数据类的装饰器，只要最终能找到<InlineCode>@component</InlineCode>装饰器，那么就是组件装饰。</li>
                    <li>同一个元数据类上只能有一个组件装饰器。</li>
                </ul>
                下面是框架导出的组件装饰器：
                <ul className={'list-disc pl-5'}>
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
                再根据元数据类添加了哪个组件装饰器，可以得到树形图（下一级装饰器的元数据类都有上一级的装饰器）：
                <Code code={this.componentTreeCode}></Code>
                框架<span className={'text-primary font-bold'}>根据不同业务场景、不同抽象程度提供不同的装饰器</span>：
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>@component</InlineCode>无任何业务含义的组件装饰器</li>
                    <li>
                        <InlineCode>@view</InlineCode>是通用的视图组件装饰器
                        <ul className={'list-disc pl-5'}>
                            <li>
                                <InlineCode>@page</InlineCode>是页面组件装饰器
                            </li>
                            <li>
                                <InlineCode>@layout</InlineCode>是布局组件装饰器
                            </li>
                        </ul>
                    </li>
                    <li>
                        <InlineCode>@util</InlineCode>是通用的工具组件装饰器
                        <ul className={'list-disc pl-5'}>
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
                这样有 2 个好处：
                <ul className={'list-decimal px-5'}>
                    <li>根据不同的业务，使用不同的装饰器添加对应的组件</li>
                    <li>需要添加自定义装饰器，也可以很明确的知道放在哪个层级</li>
                </ul>
            </ContentLayout>
        );
    }
}

export default LearnAdvanceComponentDecoratorPage;

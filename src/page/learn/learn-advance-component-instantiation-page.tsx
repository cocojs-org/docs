import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, InlineCode, Card, Code, Table } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-component-instantiation')
@page()
class LearnAdvanceComponentInstantiationPage {
    propertiesCode: string = `
{
    "bootComponents": {
        "Router": {}
    }
}
`

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>组件实例化</Header1>
                <Header3>单个组件的实例化过程</Header3>
                <div>
                    假设实例化的组件叫组件A
                    <ul className={'list-decimal px-5'}>
                        <li>如果组件A 有<InlineCode>@constructorParam</InlineCode>装饰器，则每个依赖都执行单个组件的实例化过程，形成集合B</li>
                        <li>使用集合B作为构造函数参数，实例化组件A</li>
                        <li>如果组件A 存在<InlineCode>@autowired</InlineCode>字段，则每个依赖都执行单个组件的实例化过程，并赋值给字段</li>
                        <li>
                            因为可能有注入其他组件，所以最终可能会实例化多个组件，形成集合C
                            <ul className={'list-decimal px-5'}>
                                <li>遍历集合C 中所有组件，如果有<InlineCode>init</InlineCode>方法的，执行<InlineCode>init</InlineCode>方法</li>
                                <li>遍历集合C 中所有组件，如果有<InlineCode>start</InlineCode>方法的，执行<InlineCode>start</InlineCode>方法</li>
                            </ul>
                        </li>
                    </ul>
                    所有类型的组件实例化过程都是一样的，视图组件在调和过程中会单独执行其他的生命周期函数，具体见视图组件。
                </div>
                <div>
                    应用启动的时候，需要在动态配置中使用<InlineCode>bootComponents</InlineCode>指定应用启动时一起启动的组件，例如配置路由组件：
                    <Code code={this.propertiesCode} />
                    <InlineCode>bootComponents</InlineCode>对象的每个<InlineCode>key</InlineCode>都是组件id。
                    如果<InlineCode>bootComponents</InlineCode>配置多个<InlineCode>key</InlineCode>，那么按序执行单个组件的实例化过程。
                </div>
                <div>
                    所有需要实例化场景：
                    <ul className={'list-decimal px-5'}>
                        <li>（项目中或第三方）在JSX中的视图组件。</li>
                        <li>（项目中）被实例化的组件有<InlineCode>@autowired</InlineCode>装饰器的字段，实例化A的同时也要实例化组件B，且还要看组件B 是否包含<InlineCode>@autowired</InlineCode>字段</li>
                        <li>（框架内部或项目中）任何组件A有<InlineCode>@constructParam</InlineCode>装饰器且构造函数入参是组件B，那么实例化A的同时也要实例化组件B</li>
                        <li>（框架内部或项目中）调用<InlineCode>getComponent</InlineCode>接口，入参是想要被实例化的组件A</li>
                        <li>（项目中）动态配置中，通过<InlineCode>bootComponents</InlineCode>字段配置的启动组件</li>
                    </ul>
                    <div>
                        上面实例化场景中，如果要实例化的类没有子类，则可以直接实例化，如果有子类，则分情况讨论：
                        <ul className={'list-decimal px-5'}>
                            <li>视图组件不会实例化子组件</li>
                            <li>如果子组件只有一个，直接实例化子类</li>
                            <li>如果子组件存在多个，需要使用<InlineCode>@qualify</InlineCode>装饰器或动态配置中<InlineCode>qualify</InlineCode>指定具体的子类id</li>
                        </ul>
                    </div>
                </div>

            </ContentLayout>
        );
    }
}

export default LearnAdvanceComponentInstantiationPage;

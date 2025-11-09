import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, InlineCode, Card, Code, Table } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-deep-in-component')
@page()
class LearnAdvanceDeepInComponentPage {
    propertiesCode: string = `
{
    "bootComponents": {
        "Router": {}
    }
}
`
    lifeCycleCode: string = `
@api()
class LoginApi {
    init() {}
    start() {}
}
`

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>深入组件</Header1>
                <div>
                    <div>
                        在前端领域，组件一般是指视图组件，即封装界面、状态、事件处理的可复用的逻辑单元。
                        在coco-mvc中，组件不仅包含视图组件，还有流程组件、工具组件、路由组件等。
                    </div>
                    所有组件使用类表达组件有 2 个好处：
                    <ul>
                        <li>统一的代码风格</li>
                        <li>由框架统一实例化和依赖注入</li>
                    </ul>
                </div>
                <Header2>收集组件</Header2>
                根据组件源文件所在的位置，可以分为 3 种：
                <ul>
                    <li>框架内部组件</li>
                    <li>项目组件</li>
                    <li>第三方组件</li>
                </ul>
                <div>
                    框架内部组件是coco-mvc提供的常用的组件，包括：
                    <ul>
                        <li><InlineCode>Router</InlineCode>：用于页面跳转</li>
                        <li><InlineCode>Route</InlineCode>：获取当前路由参数</li>
                        <li><InlineCode>LocalStorage</InlineCode>：和浏览器的localStorage接口一样，为了统一使用</li>
                        <li><InlineCode>SessionStorage</InlineCode>：和浏览器的sessionStorage接口一样，为了统一使用</li>
                        <li><InlineCode>Cookie</InlineCode>：和浏览器的Cookie接口一样，为了统一使用</li>
                    </ul>
                </div>
                <div>
                    项目组件是指项目中添加了组件装饰器的类，这些组件都放在约定的文件夹中，框架在启动的时候自动收集。
                </div>
                <div>
                    第三方组件是指npm包中导出的组件，具体见库开发。
                </div>
                <Header2>组件id</Header2>
                组件id是组件的唯一标记，一般来说是类名，可通过<InlineCode>@id</InlineCode>装饰器进行指定。
                <span className={'text-primary'}>框架收集到的所有组件的id都是唯一的</span>，在配置启动组件时可能需要用到组件id。
                <Header2>实例化组件</Header2>
                <Header3>组件的声明周期</Header3>
                所有组件都有以下生命周期函数：
                <Code code={this.lifeCycleCode} />
                <Header3>单个组件的实例化过程</Header3>
                <div>
                    假设实例化的组件叫组件A
                    <ul>
                        <li>如果组件A 有<InlineCode>@constructorParam</InlineCode>装饰器，则每个依赖都执行单个组件的实例化过程，形成集合B</li>
                        <li>使用集合B作为构造函数参数，实例化组件A</li>
                        <li>如果组件A 存在<InlineCode>@autowired</InlineCode>字段，则每个依赖都执行单个组件的实例化过程，并赋值给字段</li>
                        <li>
                            因为可能有注入其他组件，所以最终可能会实例化多个组件，形成集合C
                            <ul>
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
                    <ul>
                        <li>（项目中或第三方）在JSX中的视图组件。</li>
                        <li>（项目中）被实例化的组件有<InlineCode>@autowired</InlineCode>装饰器的字段，实例化A的同时也要实例化组件B，且还要看组件B 是否包含<InlineCode>@autowired</InlineCode>字段</li>
                        <li>（框架内部或项目中）任何组件A有<InlineCode>@constructParam</InlineCode>装饰器且构造函数入参是组件B，那么实例化A的同时也要实例化组件B</li>
                        <li>（框架内部或项目中）调用<InlineCode>getComponent</InlineCode>接口，入参是想要被实例化的组件A</li>
                        <li>（项目中）动态配置中，通过<InlineCode>bootComponents</InlineCode>字段配置的启动组件</li>
                    </ul>
                    <div>
                        上面实例化场景中，如果要实例化的类没有子类，则可以直接实例化，如果有子类，则分情况讨论：
                        <ul>
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

export default LearnAdvanceDeepInComponentPage;

import { route, page, reactive, bind, Router, autowired } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Cd, Card, Code, Table } from 'coco-official-website-kit';
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
                <Header3>作用域</Header3>
                在应用开发中，一些组件是全局唯一的，例如store组件，一些组件每次都是创建新的实例，例如视图组件，作用域就是控制是否创建多实例的逻辑的。
                <ul>
                    <li>
                        <Cd>singleton</Cd>：单例模式，全局唯一实例，只有第一次调用
                        <Cd>getComponents</Cd>会创建实例外，后续调用都会返回缓存的实例。
                    </li>
                    <li>
                        <Cd>prototype</Cd>：原型模式，每次调用<Cd>getComponents</Cd>
                        都会创建新的实例。
                    </li>
                </ul>
                组件装饰器都有<Cd>@scope</Cd>装饰器确定被装饰器组件的作用域，被装饰器组件也可以使用<Cd>@scope</Cd>装饰器覆盖组件装饰器的设置。
                注意作用域仅影响多次调用执行<Cd>getComponents</Cd>时是否实例化组件，但是真正的实例化过程都是一致的。
                <Header3>单个组件的实例化过程</Header3>
                <div>
                    假设实例化的组件叫组件A
                    <ul className={'list-decimal px-5'}>
                        <li>
                            如果组件A 有<Cd>@constructorInject</Cd>
                            装饰器，则每个依赖都执行单个组件的实例化过程，形成集合B
                        </li>
                        <li>使用集合B作为构造函数参数，实例化组件A</li>
                        <li>
                            如果组件A 存在<Cd>@autowired</Cd>
                            字段，则每个依赖都执行单个组件的实例化过程，并赋值给字段
                        </li>
                        <li>
                            因为可能有注入其他组件，所以最终可能会实例化多个组件，形成集合C
                            <ul className={'list-decimal px-5'}>
                                <li>
                                    遍历集合C 中所有组件，如果有<Cd>init</Cd>方法的，执行
                                    <Cd>init</Cd>方法
                                </li>
                                <li>
                                    遍历集合C 中所有组件，如果有<Cd>start</Cd>方法的，执行
                                    <Cd>start</Cd>方法
                                </li>
                            </ul>
                        </li>
                    </ul>
                    所有类型的组件实例化过程都是一样的，视图组件在调和过程中会单独执行其他的生命周期函数，具体见视图组件。
                </div>
                <div>
                    所有需要实例化场景：
                    <ul className={'list-decimal px-5'}>
                        <li>（项目中或第三方）在JSX中的视图组件。</li>
                        <li>
                            （项目中）被实例化的组件有<Cd>@autowired</Cd>
                            装饰器的字段，实例化A的同时也要实例化组件B，且还要看组件B 是否包含
                            <Cd>@autowired</Cd>字段
                        </li>
                        <li>
                            （框架内部或项目中）任何组件A有<Cd>@constructParam</Cd>
                            装饰器且构造函数入参是组件B，那么实例化A的同时也要实例化组件B
                        </li>
                        <li>
                            （框架内部或项目中）调用<Cd>getComponent</Cd>接口，入参是想要被实例化的组件A
                        </li>
                        <li>
                            （项目中）动态配置中，通过<Cd>bootComponents</Cd>字段配置的启动组件
                        </li>
                    </ul>
                    <div>
                        上面实例化场景中，如果要实例化的类没有子类，则可以直接实例化，如果有子类，则分情况讨论：
                        <ul className={'list-decimal px-5'}>
                            <li>视图组件不会实例化子组件</li>
                            <li>如果子组件只有一个，直接实例化子类</li>
                            <li>
                                如果子组件存在多个，需要使用<Cd>@qualify</Cd>装饰器或动态配置中
                                <Cd>qualify</Cd>指定具体的子类id
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentLayout>
        );
    }
}

export default LearnAdvanceComponentInstantiationPage;

import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, Card, Button, Table } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-deep-in-component')
@page()
class LearnAdvanceDeepInComponentPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>深入组件</Header1>
                <Header2>什么是组件？</Header2>
                <div>
                    在前端领域，组件一般是指视图组件，即一套包含了界面、状态、事件处理的可复用的逻辑单元。
                    在coco-mvc中，组件的概念更广，上面介绍了视图组件、流程组件、工具组件、路由组件等等都是组件，不限于视图层。
                </div>
                <Card>
                    从视图、行为、数据获取、工具库全部使用类表达组件有 2 个好处：
                    <ul>
                        <li>统一的代码风格</li>
                        <li>由框架统一实例化和依赖注入</li>
                    </ul>
                </Card>
                <Header2>组件装饰器</Header2>
                组件装饰器是指添加了这些装饰器的类会被框架识别为组件的装饰器，下面列举了框架提供的组件装饰器：
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
                <Header2>框架提供的组件</Header2>
                下面列举了框架提供的组件：
                <ul>
                    <li>Router</li>
                    <li>Route</li>
                    <li>LocalStorage</li>
                    <li>SessionStorage</li>
                    <li>Cookie</li>
                </ul>
                <Header1>自定义组件装饰器</Header1>
                关于自定义组件装饰器，可以在创建装饰器一节中找到。
            </ContentLayout>
        );
    }
}

export default LearnAdvanceDeepInComponentPage;

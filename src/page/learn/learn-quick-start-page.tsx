import { route, page, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Card } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';

@route('/learn/quick-start')
@page()
class LearnQuickStartPage {
    @autowired()
    router: Router;

    clickDirectoryStructure = () => {
        this.router.navigateTo('/learn/directory-structure');
    };

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>快速入门</Header1>
                <Card>
                    如果你还不了解 HTML CSS JavaScript（Class和Decorator） 和 JSX 知识，请先学习相关知识再回来。
                </Card>
                <Header2>基础</Header2>
                <Header2>什么是coco-mvc？</Header2>
                <div>coco-mvc（coco是coconut的缩写）是一个JavaScript框架，使用类和装饰器开发可扩展的web应用。</div>
                <Header2>视图组件和视图装饰器</Header2>
                介绍如何构建视图组件，包括状态管理、事件处理、生命周期函数、调和算法等。
                包括jsx、@reactive、@view、@page、@layout、@memoized、@bind、@ref、@refs、@store。
                <Header2>工具类组件和工具装饰器</Header2>
                介绍什么是工具类组件，工具类组件的使用场景。
                包括：@util、@api、@globalData、@localStorage、@sessionStorage、@cookie、LocalStorage组件、SessionStorage组件、Cookie组件。
                <Header2>流程组件和流程装饰器</Header2>
                介绍什么是流程组件，流程的使用场景。 包括：@flow。
                <Header2>依赖注入和目录结构</Header2>
                介绍使用依赖注入组装组件，介绍@autowired、@qualifier、@constructorParam，介绍分层的好处
                <Header2>cli工具、构建配置</Header2>
                介绍创建应用命令、创建库命令、应用开发命令、应用打包命令、库开发命令、库打包命令、介绍构建配置、环境变量。
                <Header2>运行时配置和环境变量</Header2>
                介绍运行时配置的作用、顺带介绍也支持环境变量。介绍@webApplication、@configuration、@value、@qualifier、bootComponents。
                <Header2>路由组件和路由装饰器</Header2>
                介绍@router、@route、Router组件、Route组件
                <Header2>深入理解组件</Header2>
                介绍什么是组件，介绍框架提供的组件装饰器，介绍框架提供的组件。
                <Header2>深入装饰器</Header2>
                介绍框架如何使用装饰器，引出元数据概念，介绍实例化元数据时字段的赋值逻辑。
                <Header2>创建一个装饰器</Header2>
                介绍如何使用createDecoratorExp\createPlaceholderDecoratorExp函数创建一个装饰器。
                <Header2>组件装饰器</Header2>
                介绍组件id @component
                @scope，如何注册第三方组件，介绍复合组件，复合3层的限制，介绍组件的init和start方法，介绍getComponent函数。
            </ContentLayout>
        );
    }
}

export default LearnQuickStartPage;

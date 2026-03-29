import { route, page, Router, autowired } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Cd } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/introduction')
@page()
class LearnIntroductionPage {
    @autowired()
    router: Router;

    clickDirectoryStructure = () => {
        this.router.navigateTo('/learn/directory-structure');
    };

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>整体介绍</Header1>
                <Header2>什么是coco-mvc？</Header2>
                coco-mvc（coco是coconut的缩写）是一个现代化的 JavaScript 框架，框架以类和装饰器语法为核心，结合分层设计模式，
                让开发者专注于业务本身，从而构建更清晰、可维护更高的 Web 应用。
                <Header3>项目初衷</Header3>
                虽然 Next.js、Nuxt、Angular 等现代框架通过约束开发范式提升了效率，但 JavaScript 的高度灵活性仍导致同一功能实现方式千差万别。
                coco-mvc 就想尝试解决这个问题，框架在保留前端核心概念的基础上，融合后端的开发经验，为开发者提供更统一、更清爽的开发体验。
                <Header3>预备知识</Header3>
                <ul className={'list-disc pl-5'}>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>Decorators</li>
                    <li>TypeScript</li>
                </ul>
                <Header2>功能简介</Header2>
                coco-mvc 设想应用从上至下分为 UI 层、数据逻辑层、工具层，每一层均以类作为载体，层与层之间使用依赖注入关联，如下图所示。
                <img src={"/mvc.png"} width={'100%'} height={'auto'} className={'pl-10 pr-10'} />
                那么框架只需要提供一些装饰器，装饰器的作用就是标记类属于哪一层、实现依赖注入即可，同时框架也支持自定义符合自身业务的装饰器。
                <Header3>UI 层</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><Cd>@view</Cd>、<Cd>@page</Cd>、<Cd>@layout</Cd>：标记视图组件。</li>
                    <li><Cd>@reactive</Cd>、<Cd>@memoized</Cd>：标记响应式。</li>
                    <li><Cd>@bind</Cd>：组件方法绑定<Cd>this</Cd>。</li>
                    <li><Cd>@ref</Cd>、<Cd>@refs</Cd>：引用组件实例。</li>
                    <li><Cd>@store</Cd>：标记全局响应式。</li>
                    <li><Cd>@router</Cd>、<Cd>@route</Cd>：标记路由。</li>
                </ul>
                <Header3>数据逻辑层</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><Cd>@flow</Cd>：标记流程组件，流程是专门描述数据业务逻辑的地方。</li>
                </ul>
                <Header3>工具层</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><Cd>@util</Cd>、<Cd>@api</Cd>：标记一个工具组件。</li>
                    <li><Cd>@localStorage</Cd>、<Cd>@sessionStorage</Cd>、<Cd>@cookie</Cd>：标记特定功能的组件。</li>
                </ul>
                <Header3>依赖注入</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><Cd>@autowired</Cd>、<Cd>@constructorInject</Cd>：支持依赖注入。</li>
                </ul>
                <Header3>创建组件</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><Cd>@component</Cd>、<Cd>@scope</Cd>、<Cd>@id</Cd>：自定义组件。</li>
                </ul>
                <Header3>创建装饰器</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><Cd>createDecoratorExp</Cd>、<Cd>createPlaceholderDecoratorExp</Cd>：自定义装饰器。</li>
                </ul>
                <Header3>运行时配置</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><Cd>@webApplication</Cd>、<Cd>@configuration</Cd>、<Cd>@value</Cd>、<Cd>@qualifier</Cd>、<Cd>bootComponents</Cd>：运行时配置相关。</li>
                </ul>
                <Header2>命令行工具</Header2>
                框架提供 2 个命令行工具，分别用于创建和构建工作。
                <ul className={'list-disc pl-5'}>
                    <li><Cd>create-coco</Cd>，脚手架工具</li>
                    <li><Cd>@cocojs/cli</Cd>，开发、构建工具</li>
                </ul>
                <Header2>样式</Header2>
                框架本身不绑定任何样式库，但在使用脚手架新建项目时可以选择带 TailwindCss 的模板，因为在 jsx 中编写样式的特性使得单文件可以完整的描述一个组件。
                当然开发者可以使用脚手架生成无样式的项目然后自行添加熟悉的样式库。
            </ContentLayout>
        );
    }
}

export default LearnIntroductionPage;

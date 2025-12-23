import { route, page, Router, autowired } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, InlineCode } from 'coco-official-website-kit';
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
                <Header1>整体介绍</Header1>
                <Header2>什么是coco-mvc？</Header2>
                coco-mvc（coco是coconut的缩写）是一个现代化的 JavaScript 框架，框架以类和装饰器语法为核心，结合分层设计模式，
                让开发者专注于业务本身，从而构建更清晰、可维护更高的 Web 应用。
                <Header3>项目初衷</Header3>
                虽然 Next.js、Nuxt、Angular 等现代框架通过约束开发范式提升了效率，但 JavaScript 的高度灵活性仍导致同一功能实现方式千差万别。
                coco-mvc 就是为了解决这个问题而生，框架在保留前端核心概念的基础上，融合后端成熟的开发经验，为开发者提供更具秩序感、更清爽的开发体验。
                <Header2>预备知识</Header2>
                <ul className={'list-disc pl-5'}>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>Decorators</li>
                    <li>TypeScript</li>
                </ul>
                <Header2>装饰器简介</Header2>
                coco-mvc 设想应用从上至下分为 UI 层、数据逻辑层、工具层，每一层均以类作为载体，层与层之间使用依赖注入关联。
                那么框架只需要提供一些装饰器，这些装饰器的作用就是标记类属于哪一层、实现依赖注入即可。而且开发者还可以创建符合自身业务的装饰器。
                <Header3>UI 层</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>@view</InlineCode>、<InlineCode>@page</InlineCode>、<InlineCode>@layout</InlineCode>：标记视图组件。</li>
                    <li><InlineCode>@reactive</InlineCode>、<InlineCode>@memoized</InlineCode>：标记响应式。</li>
                    <li><InlineCode>@bind</InlineCode>：绑定<InlineCode>this</InlineCode>。</li>
                    <li><InlineCode>@ref</InlineCode>、<InlineCode>@refs</InlineCode>：引用组件。</li>
                    <li><InlineCode>@store</InlineCode>：标记全局响应式。</li>
                    <li><InlineCode>@router</InlineCode>、<InlineCode>@route</InlineCode>：标记路由。</li>
                </ul>
                <Header3>数据逻辑层</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>@flow</InlineCode>：标记流程组件，流程是专门描述数据业务逻辑的地方。</li>
                </ul>
                <Header3>工具层</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>@util</InlineCode>、<InlineCode>@api</InlineCode>：标记一个工具组件。</li>
                    <li><InlineCode>@localStorage</InlineCode>、<InlineCode>@sessionStorage</InlineCode>、<InlineCode>@cookie</InlineCode>：标记特定的功能组件。</li>
                </ul>
                <Header3>依赖注入</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>@autowired</InlineCode>、<InlineCode>@constructorParam</InlineCode>：支持依赖注入。</li>
                </ul>
                <Header3>创建组件</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>@component</InlineCode>、<InlineCode>@scope</InlineCode>、<InlineCode>@id</InlineCode>：自定义组件。</li>
                </ul>
                <Header3>创建装饰器</Header3>
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>createDecoratorExp</InlineCode>、<InlineCode>createPlaceholderDecoratorExp</InlineCode>：自定义装饰器。</li>
                </ul>
                <Header2>配置与环境变量</Header2>
                介绍运行时配置的作用、顺带介绍也支持环境变量。介绍<InlineCode>@webApplication</InlineCode>、<InlineCode>@configuration</InlineCode>、<InlineCode>@value</InlineCode>、<InlineCode>@qualifier</InlineCode>、<InlineCode>bootComponents</InlineCode>。
                <Header2>命令行工具</Header2>
                框架提供 2 个命令行工具，分别用于创建和构建工作。
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>create-coco</InlineCode>，脚手架工具</li>
                    <li><InlineCode>@cocojs/cli</InlineCode>，开发、构建工具</li>
                </ul>
            </ContentLayout>
        );
    }
}

export default LearnQuickStartPage;

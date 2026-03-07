import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Code, Cd, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/dev-dependency')
@page()
class LearnDevDependencyPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>开发依赖库</Header1>
                <Header3>@cocojs/mvc</Header3>
                <Cd>@cocojs/mvc</Cd>是coco-mvc框架的运行时库，暴露运行时需要的所有装饰器、组件、工具函数等。
                <Header3>@cocojs/cli</Header3>
                <Cd>@cocojs/cli</Cd>为项目开发和打包功能提供命令行入口，内部集成<Cd>@cocojs/bundle-rollup</Cd>和<Cd>@cocojs/bundle-webpack</Cd>，具体配置见配置页面。
                <ul className={'list-disc pl-5'}>
                    <li>
                        <Cd>coco app dev</Cd>: 本地开发应用项目。
                    </li>
                    <li>
                        <Cd>coco app build</Cd>: 打包应用项目。
                    </li>
                    <li>
                        <Cd>coco lib build</Cd>: 工具库打包。
                    </li>
                </ul>
                <Header3>@cocojs/bundle-rollup</Header3>
                <Cd>@cocojs/bundle-rollup</Cd>是集成<Cd>@cocojs/compiler</Cd>能力的rollup打包器，一般作为<Cd>@cocojs/cli</Cd>的依赖，不需要干预。
                <Header3>@cocojs/bundle-webpack</Header3>
                <Cd>@cocojs/bundle-webpack</Cd>是集成<Cd>@cocojs/compiler</Cd>能力的webpack打包器，一般作为<Cd>@cocojs/cli</Cd>的依赖，不需要干预。
                <Header3>@cocojs/compiler</Header3>
                <Cd>@cocojs/compiler</Cd>为cocojs组件提供支持，一般来说开发者不会直接使用。
            </ContentLayout>
        );
    }
}

export default LearnDevDependencyPage;

import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Code, InlineCode, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/dev-dependency')
@page()
class LearnDevDependencyPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>开发依赖库</Header1>
                <Header3>@cocojs/cli</Header3>
                <InlineCode>@cocojs/cli</InlineCode>包负责项目的开发和打包功能，内置<InlineCode>Rollup</InlineCode>
                <InlineCode>Webpack</InlineCode>的打包工具，分别处理应用项目和库项目的打包工作，具体配置见配置页面。
                <ul className={'list-disc pl-5'}>
                    <li>
                        <InlineCode>coco app dev</InlineCode>: 本地开发应用项目。
                    </li>
                    <li>
                        <InlineCode>coco app build</InlineCode>: 打包应用项目。
                    </li>
                    <li>
                        <InlineCode>coco lib build</InlineCode>: 工具库打包。
                    </li>
                </ul>
                <Header3>@cocojs/compiler</Header3>
                <InlineCode>@cocojs/compiler</InlineCode>为cocojs组件提供支持，一般来说开发者不会直接使用。
                <Header3>@cocojs/bundle-rollup</Header3>
                <InlineCode>@cocojs/bundle-rollup</InlineCode>是集成<InlineCode>@cocojs/compiler</InlineCode>能力的rollup打包器，一般作为<InlineCode>@cocojs/cli</InlineCode>的依赖，不需要干预。
                <Header3>@cocojs/bundle-webpack</Header3>
                <InlineCode>@cocojs/bundle-webpack</InlineCode>是集成<InlineCode>@cocojs/compiler</InlineCode>能力的webpack打包器，一般作为<InlineCode>@cocojs/cli</InlineCode>的依赖，不需要干预。
            </ContentLayout>
        );
    }
}

export default LearnDevDependencyPage;

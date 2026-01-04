import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Code, InlineCode, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/create-project')
@page()
class LearnCreateProjectPage {
    code = `
npm create coco@latest

> npx
> create-coco

✔ 项目类型 › 应用
✔ 项目名称（在当前目录下新建文件夹，且设置package.json的name） … app-demo
✔ 作者 … jcg
✔ 是否使用tailwindcss › 是
  `;

    structCode = `
projectRoot
    |---- config
    |---- properties
    |
    |---- src
    |      |
    |      |---- .coco
    |      |---- layout
    |      |---- page
    |      |---- view
    |      |---- flow
    |      |---- api
    |      |---- component
    |      |---- application.ts
    |
    |---- packages.json
    |---- tsconfig.json
    |---- tailwind.config.js
    |---- .gitignore
`;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>创建项目</Header1>
                <Header3>预备条件</Header3>
                <ul className={'list-disc pl-5'}>
                    <li>node：推荐node20及以上LTS版本。</li>
                    <li>包管理软件：node 会附带包管理工具<InlineCode>npm</InlineCode>，但更加推荐<InlineCode>pnpm</InlineCode>。</li>
                </ul>
                <Header2>创建项目</Header2>
                <InlineCode>create-coco</InlineCode>包提供脚手架的功能，可以快速创建应用项目或者工具库项目：
                <Code code={this.code} />
                <Header2>目录结构</Header2>
                <div>如果创建的是应用项目，则目录结构如下：</div>
                <Code code={this.structCode} />
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>/config</InlineCode>：构建配置根目录，详细说明见配置页面。</li>
                    <li><InlineCode>/properties</InlineCode>：运行配置根目录，详细说明见配置页面。</li>
                    <li><InlineCode>/src/.coco</InlineCode>：运行时文件夹（由框架生成，不用手动修改，也不要使用版本记录，已经在gitignore中忽略）。</li>
                    <li><InlineCode>/src/view</InlineCode>：通用视图组件根目录。</li>
                    <li><InlineCode>/src/page</InlineCode>：页面组件根目录。</li>
                    <li><InlineCode>/src/layout</InlineCode>：布局组件根目录。</li>
                    <li><InlineCode>/src/flow</InlineCode>：流程组件根目录。</li>
                    <li><InlineCode>/src/util</InlineCode>：工具组件根目录。</li>
                    <li><InlineCode>/src/api</InlineCode>：接口组件根目录。</li>
                    <li><InlineCode>/src/component</InlineCode>：通用组件根目录。</li>
                    <li><InlineCode>/src/application.ts</InlineCode>：入口文件。</li>
                    <li><InlineCode>/package.json</InlineCode>：包配置文件。</li>
                    <li><InlineCode>/tsconfig.json</InlineCode></li>
                </ul>
                {/*<Header2>开发项目</Header2>*/}
                {/*<InlineCode>@cocojs/cli</InlineCode>包负责项目的开发和打包功能，内置<InlineCode>Webpack</InlineCode><InlineCode>Rollup</InlineCode>包，*/}
                {/*分别处理应用项目和库项目的打包工作，具体配置见配置页面。*/}
                {/*<ul className={'list-disc pl-5'}>*/}
                {/*    <li><InlineCode>coco app dev</InlineCode>: 本地开发应用项目。</li>*/}
                {/*    <li><InlineCode>coco app build</InlineCode>: 打包应用项目。</li>*/}
                {/*    <li><InlineCode>coco lib build</InlineCode>: 工具库打包。</li>*/}
                {/*</ul>*/}
            </ContentLayout>
        );
    }
}

export default LearnCreateProjectPage;

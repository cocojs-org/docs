import { route, page } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, Card } from 'coco-official-website-kit';
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

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>创建项目</Header1>
                <Header2>环境准备</Header2>
                <div>首先本地需要node环境，推荐node20及以上LTS版本，官网：https://nodejs.org/zh-cn/download。</div>
                <Header2>create-coco命令</Header2>
                <Code code={this.code} />
                <Card>
                    项目类型可以选择单页面应用，也可以选择组件库项目。
                </Card>
                <div>输入要创建项目的名称，脚手架会在当前目录下创建项目目录。常用命令如下：</div>
                <ul>
                    <li><InlineCode>pnpm install</InlineCode>: 安装依赖</li>
                    <li><InlineCode>pnpm run app dev</InlineCode>: 本地开发，地址是http://localhost:9700</li>
                    <li><InlineCode>pnpm run app build</InlineCode>: 构建生产包</li>
                </ul>
            </ContentLayout>
        );
    }
}

export default LearnCreateProjectPage;

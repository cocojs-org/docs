import { route, page } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';

@route('/learn/create-project')
@page()
class LearnCreateProjectPage {
    code = `
npx @cocojs/cli create 
项目名称？...
  `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>创建项目</Header1>
                <Header2>环境准备</Header2>
                <div>首先本地需要node环境，推荐node18lts及以上，官网：https://nodejs.org/zh-cn/download。</div>
                <Header2>创建项目</Header2>
                使用脚手架的create命令快速创建一个项目
                <Code code={this.code} />
                <div>输入要创建项目的名称，脚手架会在当前目录下创建项目目录。常用命令如下：</div>
                <ul>
                    <li>npm install: 安装依赖</li>
                    <li>npm run dev: 本地开发，地址是http://localhost:9700</li>
                    <li>npm run build: 构建生产包</li>
                </ul>
            </ContentLayout>
        );
    }
}

export default LearnCreateProjectPage;

import { page, route } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/reference/command')
@page()
class ReferenceCommandPage {
    code = `
npx @cocojs/cli app create
`;
    code1 = `
coco app build
`;
    code2 = `
coco app dev  
`;
    code3 = `
npx @cocojs/cli lib create
`;
    code4 = `
coco lib build
`;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>命令行</Header1>
                <div>框架提供的cli工具，内置了一些命令，可用于项目创建、开发、和构建。</div>
                <Header2>create</Header2>
                在当前目录下创建一个Web应用
                <Code code={this.code} />
                <Header2>build</Header2>
                打包Web应用
                <Code code={this.code1} />
                <Card>默认额外加载prod配置文件</Card>
                <Header2>dev</Header2>
                本地开发
                <Code code={this.code2} />
                <Card>默认额外加载dev配置文件</Card>
                <Header2>create lib</Header2>
                在当前目录下创建一个组件库
                <Code code={this.code3} />
                <Header2>build lib</Header2>
                构建一个组件库
                <Code code={this.code4} />
            </ContentLayout>
        );
    }
}

export default ReferenceCommandPage;

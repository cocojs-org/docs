import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Code } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/directory-structure')
@page()
class LearnDirectoryStructurePage {
    code = `
root
 |-- config // 构建配置根目录
 |-- properties  // 运行时配置根目录
 |
 |-- src
 |   |
 |   |-- .coco // 运行时文件夹（由框架生成，不要手动修改）
 |   |
 |   |-- layout // 布局组件根目录
 |   |    |-- xxx.tsx
 |   |
 |   |-- page // 页面组件根目录
 |   |    |-- login-page.tsx
 |   |    
 |   |-- view  // 通用视图组件根目录
 |   |    |-- button.tsx
 |   |    
 |   |-- flow // 流程组件根目录
 |   |    |-- login-flow.ts
 |   |    
 |   |-- api // 接口组件根目录
 |   |    |-- user-api.ts
 |   |    
 |   |-- component // 通用组件根目录
 |   |    
 |   |-- application.ts // 启动入口文件
 |
 |-- packages.json
 |-- tsconfig.json
 |-- tailwind.config.js
 |-- .gitignore
`;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>目录结构</Header1>
                <div>@cocojs/mvc项目大部分的目录都是约定的，这有助于减少沟通成本，具体如下：</div>
                <Code code={this.code} />
            </ContentLayout>
        );
    }
}

export default LearnDirectoryStructurePage;

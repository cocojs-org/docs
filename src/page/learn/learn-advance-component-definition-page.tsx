import { route, page, reactive, bind, Router, autowired } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, InlineCode, Card, Code, Table } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-component-definition')
@page()
class LearnAdvanceComponentDefinitionPage {
    lifeCycleCode: string = `
@api()
class LoginApi {
    init() {}
    start() {}
}
`

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>组件定义</Header1>
                <div>
                    在前端领域，组件一般是指视图组件，即封装界面、状态、事件处理的可复用的逻辑单元。
                    在@cocojs/mvc中，组件不仅视图，包括流程、工具、路由等可复用的逻辑单元，只要使用类封装，再添加装饰器后，都是组件。
                    通过为类添加不同层级的组件装饰器，可以很方便的把组件划分出层级。
                </div>
                这样有 2 个好处：
                <ul className={'list-disc pl-5'}>
                    <li>统一的代码风格</li>
                    <li>由框架统一实例化和依赖注入</li>
                </ul>
                <Header2>组件来源</Header2>
                根据组件源文件所在的位置，可以分为 3 种：
                <ul className={'list-disc pl-5'}>
                    <li>框架内部组件</li>
                    <li>项目组件</li>
                    <li>第三方组件</li>
                </ul>
                <Header3>框架内部组件</Header3>
                框架内部组件是指框架内已注册并导出的组件：
                <ul className={'list-disc pl-5'}>
                    <li><InlineCode>Router</InlineCode>：用于页面跳转</li>
                    <li><InlineCode>Route</InlineCode>：获取当前路由参数</li>
                    <li><InlineCode>LocalStorage</InlineCode>：和浏览器的localStorage接口一样，为了统一使用</li>
                    <li><InlineCode>SessionStorage</InlineCode>：和浏览器的sessionStorage接口一样，为了统一使用</li>
                    <li><InlineCode>Cookie</InlineCode>：和浏览器的Cookie接口一样，为了统一使用</li>
                </ul>
                开发者根据不同的业务直接使用即可。
                <Header3>项目组件</Header3>
                项目组件是指项目代码仓库中的组件，开发者将业务需求封装成类，再添加组件装饰器使之成为组件，
                例如使用<InlineCode>@page</InlineCode>装饰器添加页面组件，<InlineCode>@api</InlineCode>装饰器添加接口组件等，不同类型的组件都有约定的文件夹，利于分层管理。
                <Header3>第三方组件</Header3>
                第三方组件是指npm包中导出的组件。类似<InlineCode>ahooks</InlineCode>或<InlineCode>VueUse</InlineCode>一样，通过 npm 包的形式导出可复用的组件。
                <Header2>组件id</Header2>
                <div>每个组件都有一个唯一id，编译时脚手架会为所有带装饰器的类添加<InlineCode>static $$id</InlineCode>表示组件id，值是类名（<InlineCode>class.name</InlineCode>）。</div>
                <div>在类库打包的时候，可以配置公共的 id 前缀，具体见构建配置。</div>
                <div>如果需要自定义，可以手动给类添加<InlineCode>static $$id</InlineCode>，值类型必须是一个字符串字面量。</div>
                <Card>
                    大多数情况下开发者用不到组件id，但有时候会涉及（例如修改运行时配置时），所以先知道有这个概念即可。
                </Card>
                <Header2>生命周期函数</Header2>
                所有组件都有以下生命周期函数：
                <Code code={this.lifeCycleCode} />
            </ContentLayout>
        );
    }
}

export default LearnAdvanceComponentDefinitionPage;

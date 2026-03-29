import { route, page, reactive, bind, Router, autowired } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Code, Cd, CodePanel, Button, Card, Table } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';
import LoginFlow from '@/flow/login-flow';

@route('/learn/di')
@page()
class LearnDIPage {
    diCode = `
import { view, autowired, Router } from '@cocojs/mvc';
import LoginApi from "@/api/login-api";

@view()
class Button () {
    @autowired()
    router: Router;
    
    @autowired()
    loginApi: LoginApi;
    
    @reactive()
    logging: boolean = false;

    clickLogin = async () => {
        this.logging = true;
        await this.loginApi.login('admin', '123456');
        this.router.navigateTo('/login-success')
        this.logging = false;
    }
  
    render() {
        return <Button 
          type={'primary'}
          onClick={this.clickLogin}
          loading={this.logging}
        >登录</Button>
    }
}
  `;

    code: string = `
import { autowired } from '@cocojs/mvc';

@api()
class UserApi {
    login() {
        return 'login';
    }
}

@view()
class UserService {
    @autowired()
    private userApi: UserApi;
}
  `;

    code1: string = `
@component()
class Render {}

@component()
class Router {
    constructor(render: Render) {
        this.render = render;
    }
}
    `;

    constructorInjectCode: string = `
import { constructorInject } from '@cocojs/mvc';

@component()
class Render {}

@component()
class Hello {}

@constructorInject([Hello])
class Router {
    constructor(render: Render) {
        this.render = render;
    }
}
    `;

    columns = [
        { title: '层级', dataIndex: 'level' },
        { title: '关注', dataIndex: 'care' },
        { title: '不关注', dataIndex: 'no-care' },
    ];

    dataSource = [
        { level: '视图层', care: '1.UI渲染和交互', 'no-care': '1.数据流程' },
        { level: '数据逻辑层', care: '1.为视图层提供接口；2.数据业务', 'no-care': '1.UI；2.工具实现' },
        { level: '工具层', care: '1.为视图层和流程层提供接口；2.标准实现（业务无关）', 'no-care': '1.UI；2.业务流程' },
    ];

    @autowired()
    router: Router;
    @autowired()
    loginFlow: LoginFlow;
    @reactive()
    loggingIn: boolean = false;

    clickLogin = async () => {
        this.loggingIn = true;
        await this.loginFlow.login();
        this.router.navigateTo('/login-success');
        this.loggingIn = false;
    };

    columns1 = [
        { title: '被注入组件层级', dataIndex: 'host' },
        { title: '可注入的组件层级', dataIndex: 'inject' },
    ];

    dataSource1 = [
        {
            host: <Cd>view</Cd>,
            inject: (
                <div>
                    <Cd>component</Cd>、<Cd>util</Cd>、<Cd>flow</Cd>、<Cd>globalData</Cd>、<Cd>router</Cd>、
                    <Cd>store</Cd>、<Cd>view</Cd>
                </div>
            ),
        },
        {
            host: <Cd>flow</Cd>,
            inject: (
                <div>
                    <Cd>flow</Cd>、<Cd>util</Cd>、<Cd>globalData</Cd>、<Cd>component</Cd>
                </div>
            ),
        },
        {
            host: <Cd>util</Cd>,
            inject: (
                <div>
                    <Cd>util</Cd>、<Cd>globalData</Cd>、<Cd>component</Cd>
                </div>
            ),
        },
        {
            host: <Cd>component</Cd>,
            inject: <Cd>component</Cd>,
        },
        {
            host: <Cd>router</Cd>,
            inject: (
                <div>
                    <Cd>render</Cd>、<Cd>component</Cd>
                </div>
            ),
        },
        {
            host: <Cd>render</Cd>,
            inject: '-',
        },
        {
            host: <Cd>globalData</Cd>,
            inject: '-',
        },
        {
            host: <Cd>store</Cd>,
            inject: '-',
        },
    ];

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>依赖注入</Header1>
                <div>
                    前面已经介绍了各种组件装饰器，使用装饰器可以定义不同层次的组件，现在使用依赖注入把这些组件组合起来完成一个完整的业务。
                    依赖注入（Dependency
                    Injection，简称DI）是一种设计模式，常见于Angular、Spring等框架，coco-mvc也提供了相似的功能，使用起来也十分简单：
                    coco-mvc提供了 2 种方式：
                </div>
                <ul className={'list-disc pl-5'}>
                    <li>
                        <Cd>@autowired</Cd>：通过字段注入。
                    </li>
                    <li>
                        <Cd>构造函数注入</Cd>：通过构造函数注入。
                    </li>
                </ul>
                <Header2>@autowired</Header2>
                <ul className={'list-disc px-5'}>
                    <li>
                        组件的字段上添加<Cd>@autowired</Cd>装饰器
                    </li>
                    <li>字段的类型就是组件</li>
                </ul>
                例如完成一个登录跳转的功能：
                <Code code={this.diCode} />
                <Button type={'primary'} onClick={this.clickLogin} loading={this.loggingIn}>
                    登录
                </Button>
                <div>
                    注意，一定要确保<Cd>@autowired</Cd>
                    装饰器的字段的类型是一个组件。coco-mvc在实例化组件Button时，发现 Router和LoginApi也需要实例化，
                    就会一起实例化。
                </div>
                <Header2>构造函数注入</Header2>
                <Code code={this.code1} />
                默认情况下，构造函数的入参如果也是组件，那么实例化的时候也会自动实例化并作为参数传入。例如框架在实例化Router的时候，会自动注入Render实例，并赋值给render参数。
                <Header3>constructorInject</Header3>
                也可以使用<Cd>@constructorInject</Cd>强制构造函数的注入的组件类型。例如：
                <Code code={this.constructorInjectCode} />
                那么2种注入方式有什么区别呢？
                <ul className={'list-decimal px-5'}>
                    <li>
                        使用@autowired注入的方式，框架会处理循环依赖；而使用构造函数注入的方式，存在循环依赖会抛出异常。
                    </li>
                    <li>
                        使用@autowired注入的方式，不能设置到类的私有属性；而使用构造函数注入的方式，可以设置到类的私有属性。
                    </li>
                    <li>
                        因为使用@autowired进行注入的方式更加灵活，适合在业务中使用；而使用构造函数注入的方式更加严格，适合在类库中使用。
                    </li>
                </ul>
                <Header2>限制</Header2>
                <div>
                    coco-mvc采用传统mvc类似的思路：把应用从上至下分为“视图-数据逻辑-工具”三层，每一层都有自己的职责范围和关注点：
                </div>
                <Table columns={this.columns} datasource={this.dataSource} />
                确定“视图-数据逻辑-工具”这样的分层思路后，依赖注入就不能随意填写了，例如不能在数据逻辑组件中注入视图组件，因为这样依赖关系是不对的，具体的限制逻辑如下：
                <Table columns={this.columns1} datasource={this.dataSource1} />
                <Card>限制相关功能暂未实现，在正式版中会加入。</Card>
            </ContentLayout>
        );
    }
}

export default LearnDIPage;

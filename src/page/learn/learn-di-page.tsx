import { route, page, reactive, bind, Router, autowired } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card, Table } from 'coco-official-website-kit';
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
import { constructorParam } from '@cocojs/mvc';

@component()
class Render {}

@constructorParam()
class Router {
    constructor(render: Render) {
        this.render = render;
    }
}
    `;

    mvcCodes = [
        {
            name: '视图层',
            code: `
import { view, autowired, Router } from '@cocojs/mvc';
import LoginFlow from "@/flow/login-flow";

@view()
class Button () {
    @autowired()
    router: Router;
  
    @autowired()
    loginFlow: LoginFlow;
    
    @reactive()
    loggingIn: boolean = false;

    clickLogin = async () => {
        this.loggingIn = true;
        await this.loginFlow.login();
        this.router.navigateTo('/login-success')
        this.loggingIn = false;
    }
  
    render() {
        return <Button 
          type={'primary'}
          onClick={this.clickLogin}
          loading={this.loggingIn}
        >登录</Button>
    }
}
    `,
        },
        {
            name: '数据逻辑层',
            code: `
import {flow, autowired} from "@cocojs/mvc";
import LoginApi from "@/api/login-api";
import LocalStorage from "@/component/local-storage";

@flow()
class LoginFlow {
    @autowired()
    loginApi: LoginApi;

    @autowired()
    localStorage: LocalStorage;

    // 账密登录
    async login(username: string, password: string) {
        try {
            // 处理多个服务层的逻辑
            const token = await this.loginApi.login(username, password);
            this.localStorage.set('token', token);
            return true;
        } catch (e) {
            return false
        }
    }

    // 单点登录
    async ssoLogin() {
        try {
            const token = await this.loginApi.ssoLogin();
            this.localStorage.set('token', token);
            return true;
        } catch (e) {
            return false
        }
    }
}

export default LoginFlow;
`,
        },
        {
            name: '接口层',
            code: `
import { api } from '@cocojs/mvc'

@api()
class LoginApi {
    async login(): Promise<string> {
        // mock http request
        return new Promise((resolve) => {
            const token = 'mock-token';
            setTimeout(() => {resolve(token)}, 1000)
        })
    }
}

export default LoginApi;
`,
        },
        {
            name: '工具层',
            code: `
import { component } from '@cocojs/mvc';

@component()
class LocalStorage {
    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }
}

export default LocalStorage;
    `,
        },
    ];

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
            host: <InlineCode>view</InlineCode>,
            inject: <div><InlineCode>component</InlineCode>、<InlineCode>util</InlineCode>、<InlineCode>flow</InlineCode>、<InlineCode>globalData</InlineCode>、<InlineCode>router</InlineCode>、<InlineCode>store</InlineCode>、<InlineCode>view</InlineCode></div>
        },
        {
            host: <InlineCode>flow</InlineCode>,
            inject: <div><InlineCode>flow</InlineCode>、<InlineCode>util</InlineCode>、<InlineCode>globalData</InlineCode>、<InlineCode>component</InlineCode></div>
        },
        {
            host: <InlineCode>util</InlineCode>,
            inject: <div><InlineCode>util</InlineCode>、<InlineCode>globalData</InlineCode>、<InlineCode>component</InlineCode></div>
        },
        {
            host: <InlineCode>component</InlineCode>,
            inject: <InlineCode>component</InlineCode>,
        },
        {
            host: <InlineCode>router</InlineCode>,
            inject: <div><InlineCode>render</InlineCode>、<InlineCode>component</InlineCode></div>,
        },
        {
            host: <InlineCode>render</InlineCode>,
            inject: '-',
        },
        {
            host: <InlineCode>globalData</InlineCode>,
            inject: '-',
        },
        {
            host: <InlineCode>store</InlineCode>,
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
                        <InlineCode>@autowired</InlineCode>：通过字段注入。
                    </li>
                    <li>
                        <InlineCode>@constructorParam</InlineCode>：通过构造函数注入。
                    </li>
                </ul>
                <Header2>@autowired</Header2>
                <ul className={'list-disc px-5'}>
                    <li>
                        组件的字段上添加<InlineCode>@autowired</InlineCode>装饰器
                    </li>
                    <li>字段的类型就是组件</li>
                </ul>
                例如完成一个登录跳转的功能：
                <Code code={this.diCode} />
                <Button type={'primary'} onClick={this.clickLogin} loading={this.loggingIn}>
                    登录
                </Button>
                <div>
                    注意，一定要确保<InlineCode>@autowired</InlineCode>
                    装饰器的字段的类型是一个组件。coco-mvc在实例化组件Button时，发现 Router和LoginApi也需要实例化，
                    就会一起实例化。
                </div>
                <Header2>@constructorParam</Header2>
                <Code code={this.code1} />
                同样确保被注入的类已经声明为组件，如上面的Render组件，然后另外一个类的构造函数中添加一个参数，并通过类型指定参数类型是被注入的类，最后在组件上添加@constructorParam装饰器即可。
                框架在实例化Router的时候，会自动注入Render实例，并赋值给render参数。 那么2种注入方式有什么区别呢？
                <ul className={'list-decimal px-5'}>
                    <li>
                        使用@autowired注入的方式，框架会处理循环依赖；而使用@constructorParam注入的方式，存在循环依赖会抛出异常。
                    </li>
                    <li>
                        使用@autowired注入的方式，不能设置到类的私有属性；而使用@constructorParam注入的方式，可以设置到类的私有属性。
                    </li>
                    <li>
                        因为使用@autowired进行注入的方式更加灵活，适合在业务中使用；而使用@constructorParam进行注入的方式更加严格，适合在类库中使用。
                    </li>
                </ul>
                <Header2>限制</Header2>
                <div>
                    coco-mvc采用传统mvc类似的思路：把应用从上至下分为“视图-数据逻辑-工具”三层，每一层都有自己的职责范围和关注点：
                </div>
                <Table columns={this.columns} datasource={this.dataSource} />
                确定“视图-数据逻辑-工具”这样的分层思路后，依赖注入就不能随意填写了，例如不能在数据逻辑组件中注入视图组件，因为这样依赖关系是不对的，具体的限制逻辑如下：
                <Table columns={this.columns1} datasource={this.dataSource1} />
                <Card>
                    限制相关功能暂未实现，在正式版中会加入。
                </Card>
            </ContentLayout>
        );
    }
}

export default LearnDIPage;

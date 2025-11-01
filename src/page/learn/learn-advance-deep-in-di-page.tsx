import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Card, Table } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';
import LoginEffect from '@/effect/login-effect';

@route('/learn/advance-deep-in-di')
@page()
class LearnAdvanceDeepInDIPage {
    diCode = `
import { view, autowired, Router } from 'coco-mvc';
import LoginEffect from "@/effect/login-effect";

@view()
class Button () {
  @autowired()
  router: Router;
  @autowired()
  loginEffect: LoginEffect;
  @reactive()
  logging: boolean = false;

  clickLogin = async () => {
    this.logging = true;
    await this.loginEffect.login('admin', '123456');
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
import { autowired } from 'coco-mvc';

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
import { constructorParam } from 'coco-mvc';

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
import { view, autowired, Router } from 'coco-mvc';
import LoginEffect from "@/effect/login-effect";

@view()
class Button () {
  
  @autowired()
  router: Router;
  @autowired()
  loginEffect: LoginEffect;
  @reactive()
  loggingIn: boolean = false;

  clickLogin = async () => {
    this.loggingIn = true;
    await this.loginEffect.login();
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
            name: '副作用层',
            code: `
import {effect, autowired} from "coco-mvc";
import LoginApi from "@/api/login-api";
import LocalStorage from "@/component/local-storage";

@effect()
class LoginEffect {
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

export default LoginEffect;
`,
        },
        {
            name: '接口层',
            code: `
import { api } from 'coco-mvc'

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
import { component } from 'coco-mvc';

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
        { level: '视图层', care: '1.UI渲染和交互', 'no-care': '1.业务实现' },
        { level: '副作用层', care: '1.为视图层提供接口；2.业务流转控制', 'no-care': '1.UI；2.业务具体实现' },
        { level: '工具层', care: '1.为副作用层提供接口；2.标准实现（业务无关）', 'no-care': '1.UI；2.业务流程' },
    ];

    @autowired()
    router: Router;
    @autowired()
    loginEffect: LoginEffect;
    @reactive()
    loggingIn: boolean = false;

    clickLogin = async () => {
        this.loggingIn = true;
        await this.loginEffect.login();
        this.router.navigateTo('/login-success');
        this.loggingIn = false;
    };

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>深入依赖注入</Header1>
                我们已经介绍了视图组件和副作用组件，现在使用依赖注入可以很方便的将它们组合起来：
                <Code code={this.diCode} />
                <Button type={'primary'} onClick={this.clickLogin} loading={this.loggingIn}>
                    登录
                </Button>
                <div>
                    在示例中，使用<InlineCode>@autowired</InlineCode>装饰器，框架会在实例化Button组件的时候实例化
                    <InlineCode>LoginEffect</InlineCode>并赋值给<InlineCode>loginEffect</InlineCode>
                    字段，这样Button组件就可以调用<InlineCode>LoginEffect</InlineCode>组件中的方法。
                </div>
                <div>
                    <InlineCode>LoginEffect</InlineCode>组件也是一样的，通过<InlineCode>@autowired</InlineCode>
                    装饰器注入<InlineCode>LocalStorage</InlineCode>实例和<InlineCode>LoginApi</InlineCode>实例。
                </div>
                <div>
                    总结一下，登录业务使用4个组件完成：<InlineCode>Button</InlineCode>、
                    <InlineCode>LoginEffect</InlineCode>、<InlineCode>LoginApi</InlineCode>、
                    <InlineCode>LocalStorage</InlineCode>， 如果类比MVC分层的概念：<InlineCode>Button</InlineCode>
                    属于视图层，<InlineCode>LoginEffect</InlineCode>
                    把所有的功能从上至下分为“视图-副作用-工具”三层，每一层都有自己的职责范围和关注点：
                </div>
                <Table columns={this.columns} datasource={this.dataSource} />
                <Card>
                    MVC（Model-View-Controller）是一种设计模式，它将应用程序分成视图层、控制层、模型层，每一层只专注自己的职责范围。
                </Card>
                依赖注入（Dependency
                Injection，简称DI）是一种设计模式，常见于Angular、Spring等框架，coco-mvc框架也提供了相似的功能，用于实现松耦合，以便于开发测试。
                coco-mvc提供了2种形式的依赖注入： 1. 使用autowired装饰器注入 2. 使用constructorParam装饰器注入
                <Header2>使用autowired装饰器注入</Header2>
                <Code code={this.code} />
                首先确保被注入类已经声明为组件，然后在另外一个组件中添加一个field，并指定类型是被注入的类，最后在field上添加@autowired装饰器即可。
                框架在实例化UserService的时候，会自动注入UserApi实例，并赋值给userApi字段。
                <Header2>使用constructorParam装饰器注入</Header2>
                <Code code={this.code1} />
                同样确保被注入的类已经声明为组件，如上面的Render组件，然后另外一个类的构造函数中添加一个参数，并通过类型指定参数类型是被注入的类，最后在组件上添加@constructorParam装饰器即可。
                框架在实例化Router的时候，会自动注入Render实例，并赋值给render参数。 那么2种注入方式有什么区别呢？ 1.
                使用@autowired注入的方式，框架会处理循环依赖；而使用@constructorParam注入的方式，存在循环依赖会抛出异常。
                2.
                使用@autowired注入的方式，不能设置到类的私有属性；而使用@constructorParam注入的方式，可以设置到类的私有属性。
                使用场景区别： 1.
                因为使用@autowired进行注入的方式更加灵活，适合在业务中使用；而使用@constructorParam进行注入的方式更加严格，适合在类库中使用。
            </ContentLayout>
        );
    }
}

export default LearnAdvanceDeepInDIPage;

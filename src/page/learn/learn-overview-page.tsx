import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Table, Card } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";
import LoginEffect from "@/effect/login-effect";

@route('/learn/overview')
@page()
class LearnOverviewPage {
  viewCode = `
import { view, reactive } from 'coco-mvc';

@view()
class Counter () {
  @reactive()
  count: number = 0;
  
  handleClick = () => {
    this.count = this.count + 1;
  }

  render() {
    return <div>
      <Button 
        onClick={this.handleClick}
        type={'primary'}
      >
        点我
      </Button>
      {this.count}
    </div>
  }
}
  `;

  effectCode = `
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
      const token = await this.loginApi.login(username, password);
      this.localStorage.set('token', token);
      return true;
    } catch (e) {
      return false
    }
  }

  // 单点登录
  async ssoLogin(ticket: string) {
    try {
      const token = await this.loginApi.ssoLogin(ticket);
      this.localStorage.set('token', token);
      return true;
    } catch (e) {
      return false
    }
  }
}

export default LoginEffect;
  `;

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
    `
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
`
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
`
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
  `
    }
  ]

  @reactive()
  count: number = 0;
  handleClick = () =>  {
    this.count++;
  }

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

  columns = [
    {title: '层级', dataIndex: 'level'},
    {title: '关注', dataIndex: 'care'},
    {title: '不关注', dataIndex: 'no-care'},
  ]
  dataSource = [
    {'level': '视图层', 'care': '1.UI渲染和交互', 'no-care': '1.业务实现'},
    {'level': '副作用层', 'care': '1.为视图层提供接口；2.业务流转控制', 'no-care': '1.UI；2.业务具体实现'},
    {'level': '工具层', 'care': '1.为副作用层提供接口；2.标准实现（业务无关）', 'no-care': '1.UI；2.业务流程'},
  ]

  clickDirectoryStructure = () => {
    this.router.navigateTo('/learn/directory-structure');
  }

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>总览</Header1>
      <Card>
        如果你还不了解 HTML CSS JavaScript（Class和Decorator） 和 JSX 知识，请先学习相关知识再回来。
      </Card>
      <Header2>什么是coco-mvc？</Header2>
      <div>coco-mvc（coco是coconut的缩写）是一个JavaScript框架，使用类和装饰器开发web应用。</div>
      <div>例如我们封装一个的计数器组件：</div>
      <div className={'flex flex-row'}>
        <div className={'w-2/3'}>
          <Code code={this.viewCode} />
        </div>
        <div className={'w-1/3 p-2 flex flex-col justify-center items-center'}>
          <div><Button type={'primary'} onClick={this.handleClick}>点我</Button>{this.count}</div>
        </div>
      </div>
      在示例中，展示了2个特性：
      <ul>
        <li><InlineCode>@view()</InlineCode>装饰器标记Counter类为<span className={'text-primary'}>视图组件</span></li>
        <li><InlineCode>@reactive()</InlineCode>装饰器为<InlineCode>this.count</InlineCode>字段添加响应式</li>
      </ul>
      <Header2>副作用</Header2>
      <div>
        在前端领域中，副作用一词指代渲染的过程中调用外部API的所有操作，
        为了更好的管理副作用，coco-mvc专门提供了<InlineCode>@effect</InlineCode>装饰器。
      </div>
      <Code code={this.effectCode} />
      在示例中，<InlineCode>LoginEffect</InlineCode>类被标记成一个副作用组件，同时包含了2个登录方法，很容易理解<InlineCode>LoginEffect</InlineCode>组件是承载登录相关业务的，
      将来如果新增扫码登录，很容易想到在<InlineCode>LoginEffect</InlineCode>类中新增一个方法即可。
      <Header2>依赖注入与mvc</Header2>
      我们已经介绍了视图组件和副作用组件，现在使用依赖注入可以很方便的将它们组合起来：
      <Code code={this.diCode} />
      <Button type={'primary'} onClick={this.clickLogin} loading={this.loggingIn}>登录</Button>
      <div>
        在示例中，使用<InlineCode>@autowired</InlineCode>装饰器，框架会在实例化Button组件的时候实例化<InlineCode>LoginEffect</InlineCode>并赋值给<InlineCode>loginEffect</InlineCode>字段，这样Button组件就可以调用<InlineCode>LoginEffect</InlineCode>组件中的方法。
      </div>
      <div>
        <InlineCode>LoginEffect</InlineCode>组件也是一样的，通过<InlineCode>@autowired</InlineCode>装饰器注入<InlineCode>LocalStorage</InlineCode>实例和<InlineCode>LoginApi</InlineCode>实例。
      </div>
      <div>
        总结一下，登录业务使用4个组件完成：<InlineCode>Button</InlineCode>、<InlineCode>LoginEffect</InlineCode>、<InlineCode>LoginApi</InlineCode>、<InlineCode>LocalStorage</InlineCode>，
        如果类比MVC分层的概念：<InlineCode>Button</InlineCode>属于视图层，<InlineCode>LoginEffect</InlineCode>把所有的功能从上至下分为“视图-副作用-工具”三层，每一层都有自己的职责范围和关注点：
      </div>
      <Table columns={this.columns} datasource={this.dataSource} />
      <Card>MVC（Model-View-Controller）是一种设计模式，它将应用程序分成视图层、控制层、模型层，每一层只专注自己的职责范围。</Card>
      <Header2>约定大于配置</Header2>
      <div>约定大于配置是一种软件设计范式，旨在减少开发人员要做的决定的次数，降低学习和沟通成本。</div>
      <div>coco-mvc约定了常见类的根目录，具体见<Button type={'primary-link'} onClick={this.clickDirectoryStructure}>目录结构页面</Button>。</div>
    </ContentLayout>
  }
}

export default LearnOverviewPage;
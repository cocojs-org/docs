import {route, page, reactive, bind, Router, autowired} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Table } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";
import LoginEffect from "@/effect/login-effect";

@route('/learn/overview')
@page()
class LearnOverviewPage {
  code = `
import { view, reactive } from 'coco-mvc';

@view()
class Button () {
  @reactive()
  num: number = 0;
  
  handleClick = () => {
    this.num = this.num + 1;
  }

  render() {
    return <div>
      <Button onClick={this.handleClick}>点我</Button>
      {this.num}
    </div>
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

  async login() {
    try {
      // 处理多个服务层的逻辑
      const token = await this.loginApi.login();
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
    {'level': '视图层', 'care': '1.UI渲染和交互', 'no-care': '1.业务具体实现'},
    {'level': '控制层', 'care': '1.为视图层提供接口；2.业务流转控制', 'no-care': '1.UI；2.业务具体实现'},
    {'level': '接口层', 'care': '1.为控制层提供接口；2.业务实现（例如调用后端接口）', 'no-care': '1.UI；2.业务流程'},
  ]

  clickDirectoryStructure = () => {
    this.router.navigateTo('/learn/directory-structure');
  }

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>总览</Header1>
      <Header2>什么是coco-mvc？</Header2>
      <div>coco-mvc（coco是coconut的缩写）是一个JavaScript框架，使用装饰器开发web应用。装饰器是一种设计模式，允许开发者在不改变代码结构的前提下扩展类的功能。</div>
      <div>例如我们想要开发一个计数器组件：</div>
      <div className={'flex flex-row'}>
        <Code code={this.code} />
        <div className={'m-2'}>
          <Button type={'primary'} onClick={this.handleClick}>点我</Button>{this.count}
        </div>
      </div>
      在示例中，<InlineCode>@view()</InlineCode>装饰器标记Button类成视图组件，<InlineCode>@reactive()</InlineCode>装饰器使得<InlineCode>this.num</InlineCode>具备响应式能力，我们完成了一个自定义组件。
      <Header2>MVC</Header2>
      <div>上面展示了如何绘制视图组件，但一个前端项目往往还还包含了路由、全局状态、业务、各类工具等等等等，这些模块共同配置才能完成一个项目。为此我们引入了MVC分层的概念：</div>
      <div>MVC（Model-View-Controller）是一种设计模式，它将应用程序分成不同的层，每一层负责不同的任务。</div>
      <div>一个例子：用户点击登录按钮&nbsp;-&gt;&nbsp;发送网络请求&nbsp;-&gt;&nbsp;页面跳转的例子，代码如下：</div>
      <div className={'flex flex-row'}>
        <CodePanel tabs={this.mvcCodes}></CodePanel>
        <Button type={'primary'} onClick={this.clickLogin} loading={this.loggingIn}>登录</Button>
      </div>
      <div>通过将一段业务划分为“视图-控制-服务”三层，每一层都专注自己的职责范围，有利于代码的模块化，提高可维护性。</div>
      <Table columns={this.columns} datasource={this.dataSource} />
      <Header2>约定大于配置</Header2>
      <div>约定大于配置是一种软件设计范式，旨在减少开发人员要做的决定的次数，降低学习和沟通成本。</div>
      <div>coco-mvc约定了常见类的根目录，具体见<Button type={'primary-link'} onClick={this.clickDirectoryStructure}>目录结构页面</Button>。</div>
    </ContentLayout>
  }
}

export default LearnOverviewPage;
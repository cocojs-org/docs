import {page, route, Router, autowired, bind} from 'coco-mvc';
import { Button, Code } from 'cocojs-component-demo'
import HeaderBar from "@/view/header-bar";

@route('/')
@page()
class IndexPage {

  @autowired()
  private router: Router;

  @bind()
  clickReference() {
    this.router.navigateTo('/reference/overview');
  }

  @bind()
  clickQuickStart() {
    this.router.navigateTo('/learn/overview');
  }

  uiCode = `
@view()
class Counter () {
  @reactive()
  count: number = 0;
    
  handleClick = () => {
    this.count += 1;
  }
  
  render() {
    return <div>
      <Button onClick={this.handleClick}>点我+1</Button>
      {this.count}
    </div>
  }
}
    `;

  effectCode = `
@effect()
class LoginEffect {
  @autowired()
  loginApi: LoginApi;

  @autowired()
  localStorage: LocalStorage;

  async login() {
    try {
      const token = await this.loginApi.login();
      this.localStorage.set('token', token);
      return true;
    } catch (e) {
      return false
    }
  }

  async logout() {
    try {
      await this.loginApi.logout();
      this.localStorage.remove('token');
      return true;
    } catch (e) {
      return false
    }
  }
}
  `;

  diCode = `
@view()
class Button () {
  @autowired()
  router: Router;

  @autowired()
  loginEffect: LoginEffect;

  @reactive()
  loading: boolean = false;

  clickLogin = async () => {
    this.loading = true;
    await this.loginEffect.login();
    this.router.navigateTo('/welcome')
    this.loading = false;
  }
  
  render() {
    return <Button type={'primary'} onClick={this.clickLogin} loading={this.loading}>登录</Button>
  }
}
  `

  render() {
    return <div className={'w-full pt-20'}>
      <HeaderBar />
      <div className={'flex flex-col items-center py-20'}>
        <div className={'text-7xl text-primary'}>
          coco-mvc
        </div>
        <div className={'text-3xl mt-4'}>
          使用<span className={'text-primary font-bold'}>@装饰器</span>构建可扩展的Web应用
        </div>
        <div className={'flex justify-center mt-20'}>
          <Button type={'primary'} onClick={this.clickQuickStart}>快速上手</Button>
          <div className={'mx-2'} />
          <Button onClick={this.clickReference}>参考文档</Button>
        </div>
      </div>
      <div className={'flex flex-col items-center p-20 bg-secondary'}>
        <div className={'text-xl text-center'}>使用类和装饰器描述用户界面</div>
        <div className={'text-4xl text-primary m-2'}>语义化</div>
        <div className={'text-4xl text-primary m-2'}>简洁</div>
        <Code code={this.uiCode} />
        <div>
          站在React的肩膀上，同样使用类描述组件，使用JSX方法绘制用户界面，但不需要将状态收敛到state中，
          通过<span className={'text-primary font-bold'}>@reactive()</span>装饰器给普通字段添加响应式能力，
          直接修改字段，页面就会重新渲染，即使第一次见，也可以轻松理解代码。
        </div>
      </div>
      <div className={'flex flex-col items-center p-20'}>
        <div className={'text-xl text-center'}>剥离副作用</div>
        <div className={'text-4xl text-primary m-2'}>专注业务</div>
        <div className={'text-4xl text-primary m-2'}>与ui分离</div>
        <Code code={this.effectCode} />
        <div>
          使用副作用描述业务，把相似业务的副作用放在一个类中，统一为用户界面提供接口。
          同时副作用不会掺杂用户界面的任何逻辑，且只为用户界面提供数据，所以不用担心修改副作用<span className={'text-primary font-bold'}>会影响用户界面</span>。
        </div>
      </div>
      <div className={'flex flex-col items-center p-20 bg-secondary'}>
        <div className={'text-xl text-center'}>依赖注入</div>
        <div className={'text-4xl text-primary m-2'}>高内聚</div>
        <div className={'text-4xl text-primary m-2'}>低耦合</div>
        <Code code={this.diCode} />
        <div>
          通过<span className={'text-primary font-bold'}>@autowired()</span>装饰器，
          用户界面可以方便的使用副作用的接口，不用关心如何实例化this.router和this.loginEffect，框架会为你准备好。
        </div>
      </div>
    </div>
  }
}

export default IndexPage;

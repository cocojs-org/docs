import { page, route, Router, autowired, bind } from 'coco-mvc';
import { Button, Code } from 'coco-official-website-kit';
import HeaderBar from '@/view/header-bar';

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
        this.router.navigateTo('/learn/quick-start');
    }

    @bind()
    clickMoreViewComponent() {
        this.router.navigateTo('/learn/view-component');
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

    flowCode = `
@flow()
class LoginFlow {
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
  loginFlow: LoginFlow;

  @reactive()
  loading: boolean = false;

  clickLogin = async () => {
    this.loading = true;
    const success = await this.loginFlow.login();
    if (success) {
      this.router.navigateTo('/welcome')
    }
    this.loading = false;
  }
  
  render() {
    return <Button 
      onClick={this.clickLogin}
      loading={this.loading}
    >登录</Button>
  }
}
  `;

    render() {
        return (
            <div className={'w-full pt-20'}>
                <HeaderBar />
                <div className={'flex flex-col items-center py-20 dark:bg-gray-800 dark:text-secondary'}>
                    <div className={'text-7xl text-primary'}>coco-mvc</div>
                    <div className={'text-3xl mt-4'}>
                        使用<span className={'text-primary font-bold'}>@装饰器</span>构建可扩展的Web应用
                    </div>
                    <div className={'flex justify-center mt-20'}>
                        <Button type={'primary'} onClick={this.clickQuickStart}>
                            快速上手
                        </Button>
                        <div className={'mx-2'} />
                        <Button onClick={this.clickReference}>参考文档</Button>
                    </div>
                </div>
                <div className={'flex flex-col items-center p-20 lg:px-0 xl:p-20 bg-secondary dark:bg-gray-600 dark:text-secondary'}>
                    <div className={'text-xl text-center'}>使用类和装饰器描述用户界面</div>
                    <div className={'text-4xl text-primary m-2'}>语义化</div>
                    <div className={'text-4xl text-primary m-2'}>简洁</div>
                    <div className={'lg:flex mt-10'}>
                        <div className={'lg:w-1/2'}>
                            <Code code={this.uiCode} />
                        </div>
                        <div
                            className={
                                'pt-10 lg:pt-0 lg:w-1/2 px-4 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                            }
                        >
                            <div>
                                基于 React 的<span className={'text-primary'}>类组件</span>和 JSX
                                语法，但无需将状态收敛到state中， 通过
                                <span className={'text-primary'}>@reactive()</span>装饰器让字段具备响应式能力，
                                直接赋值即可触发重新渲染，代码直观易懂。
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-end w-full pt-10'}>
                        <Button type={'link'} onClick={this.clickMoreViewComponent}>
                            了解更多
                        </Button>
                    </div>
                </div>
                <div className={'flex flex-col items-center p-20 lg:px-0 xl:p-20 dark:bg-gray-800 dark:text-secondary'}>
                    <div className={'text-xl text-center'}>剥离数据流程</div>
                    <div className={'text-4xl text-primary m-2'}>专注数据业务</div>
                    <div className={'text-4xl text-primary m-2'}>与视图解耦</div>
                    <div className={'lg:flex mt-10'}>
                        <div className={'lg:w-1/2'}>
                            <Code code={this.flowCode} />
                        </div>
                        <div
                            className={
                                'pt-10 lg:pt-0 lg:w-1/2 px-4 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                            }
                        >
                            <div>
                                在视图组件之外编写数据处理逻辑，相同业务的接口收敛在一个类中，统一供视图组件调用。
                                <span className={'text-primary'}>因为数据操作不能主动对视图组件赋值，所以不会引起 UI 重新渲染</span>
                                ，就像调用后端接口一样放心。
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col items-center p-20 lg:px-0 xl:p-20 bg-secondary dark:bg-gray-800 dark:text-secondary'}>
                    <div className={'text-xl text-center'}>依赖注入</div>
                    <div className={'text-4xl text-primary m-2'}>高内聚</div>
                    <div className={'text-4xl text-primary m-2'}>低耦合</div>
                    <div className={'lg:flex mt-10'}>
                        <div className={'lg:w-1/2'}>
                            <Code code={this.diCode} />
                        </div>
                        <div
                            className={
                                'pt-10 lg:pt-0 lg:w-1/2 px-4 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                            }
                        >
                            <div>
                                借助<span className={'text-primary'}>@autowired()</span>装饰器， UI
                                组件可以直接调用数据流程接口，无需操心其创建和初始化——
                                <span className={'text-primary'}>一切由框架自动注入</span>。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndexPage;

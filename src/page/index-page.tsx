import { page, route, Router, autowired, bind } from '@cocojs/mvc';
import { Button, Code, Carousel, Cd } from 'coco-official-website-kit';
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
        this.router.navigateTo('/learn/introduction');
    }

    @bind()
    clickMoreViewComponent() {
        this.router.navigateTo('/learn/view-component');
    }

    viewCode = `
@view()
class Counter () {
  @reactive()
  count: number = 0;
    
  handleClick = () => { this.count += 1; }
  
  render() {
    return <div>
      <Button onClick={this.handleClick}>点我+1</Button>
      {this.count}
    </div>
  }
}
    `;

    pageCode = `
@route('/counter')
@page()
class CounterPage () {
    
  render() {
    return <div>
      <p>counter1:</p>
      <Counter />

      <p>counter2:</p>
      <Counter />
    </div>
  }
}
    `;

    storeCode = `
@store()
class UserInfo () {
  @reactive()
  name: string;

  @reactive()
  gender: 'male' | 'female';

  @reactive()
  age: number;
    
  @reactive()
  idCard: string;
}
    `;

    apiCode = `
@api()
class UserApi () {
    create() { this.axios.post("/user/create") }

    delete() { this.axios.post("/user/delete") }

    update() { this.axios.post("/user/update") }

    detail() { this.axios.post("/user/detail") }

    login() { this.axios.post("/user/login") }

    logout() { this.axios.post("/user/logout") }
}
    `;

    utilCode = `
@util()
class Axios () {
    post(url, data) { axios.post(url, data) }

    get(url, param) { axios.get(url, param) }

    put(url, data) { axios.put(url, data) }

    delete(url) { axios.delete(url) }

    header(url) { axios.header(url) }
}
    `;

    flowCode = `
@flow()
class LoginFlow {
  @autowired()
  userApi: UserApi;

  @autowired()
  localStorage: LocalStorage;

  async login() {
    try {
      const token = await this.userApi.login();
      this.localStorage.set('token', token);
      return true;
    } catch (e) {
      return false
    }
  }

  async logout() {
    try {
      await this.userApi.logout();
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
                        <span className={'text-primary font-bold'}>统一、清爽</span>的前端框架
                    </div>
                    <div className={'flex justify-center mt-20'}>
                        <Button type={'primary'} onClick={this.clickQuickStart}>
                            快速上手
                        </Button>
                        <div className={'mx-2'} />
                        <Button onClick={this.clickReference}>参考文档</Button>
                    </div>
                </div>
                <div className={'flex flex-col items-center p-10 lg:px-0 bg-secondary dark:bg-gray-600 dark:text-secondary'}>
                    <div className={'text-xl text-center'}>一切都是组件</div>
                    <div className={'text-4xl text-primary m-2'}>一致性</div>
                    <div className={'text-4xl text-primary m-2'}>语义化</div>
                    <Carousel>
                        <div className={'lg:flex my-10 px-10'}>
                            <div className={'lg:w-1/2 px-0 md:px-20 lg:px-0'}>
                                <Code code={this.viewCode} />
                            </div>
                            <div
                                className={
                                    'pt-10 lg:pt-0 lg:w-1/2 md:px-20 pl-0 lg:pl-10 lg:pr-0 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                                }
                            >
                                <div>
                                    站在 React 类组件的肩膀上，使用<span className={'text-primary'}>@view</span>声明视图组件，使用<span className={'text-primary'}>@reactive</span>添加响应式，
                                    直接赋值即可触发重新渲染，这就是一个简单的组件。
                                </div>
                            </div>
                        </div>
                        <div className={'lg:flex my-10 px-10'}>
                            <div className={'lg:w-1/2 px-0 md:px-20 lg:px-0'}>
                                <Code code={this.pageCode} />
                            </div>
                            <div
                                className={
                                    'pt-10 lg:pt-0 lg:w-1/2 md:px-20 pl-0 lg:pl-10 lg:pr-0 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                                }
                            >
                                <div>
                                    使用<span className={'text-primary'}>@page</span>声明页面组件，同时使用<span className={'text-primary'}>@route</span>绑定路由，就是一个简单的页面。
                                </div>
                                <div>
                                    页面组件是一种视图组件，也可以使用<span className={'text-primary'}>@reactive</span>，更多视图组件装饰器：<span className={'text-primary'}>@layout</span>。
                                </div>
                            </div>
                        </div>
                        <div className={'lg:flex my-10 px-10'}>
                            <div className={'lg:w-1/2 px-0 md:px-20 lg:px-0'}><Code code={this.storeCode} /></div>
                            <div
                                className={
                                    'pt-10 lg:pt-0 lg:w-1/2 md:px-20 pl-0 lg:pl-10 lg:pr-0 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                                }
                            >
                                <div>
                                    使用<span className={'text-primary'}>@store</span>声明全局状态组件，使用<span className={'text-primary'}>@reactive</span>添加响应式，所有视图组件都可以注入使用，
                                    直接赋值（<Cd>this.userInfo.name = '张三'</Cd>）即可重新渲染所有页面。
                                </div>
                            </div>
                        </div>
                        <div className={'lg:flex my-10 px-10'}>
                            <div className={'lg:w-1/2 px-0 md:px-20 lg:px-0'}><Code code={this.utilCode} /></div>
                            <div
                                className={
                                    'pt-10 lg:pt-0 lg:w-1/2 md:px-20 pl-0 lg:pl-10 lg:pr-0 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                                }
                            >
                                <div>
                                    使用<span className={'text-primary'}>@util</span>声明工具组件，示例中声明了一个基于Axios的网络请求工具，统一解决网络请求相关的问题。
                                </div>
                            </div>
                        </div>
                        <div className={'lg:flex my-10 px-10'}>
                            <div className={'lg:w-1/2 px-0 md:px-20 lg:px-0'}><Code code={this.apiCode} /></div>
                            <div
                                className={
                                    'pt-10 lg:pt-0 lg:w-1/2 md:px-20 pl-0 lg:pl-10 lg:pr-0 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                                }
                            >
                                <div>
                                    <span className={'text-primary'}>@api</span>装饰器专门声明网络请求组件，每个模块的请求都封装在独立的组件中，互不影响。
                                </div>
                            </div>
                        </div>
                    </Carousel>
                    {/* <div className={'flex justify-end w-full pt-10'}>
                        <Button type={'link'} onClick={this.clickMoreViewComponent}>
                            了解更多
                        </Button>
                    </div> */}
                </div>
                <div className={'flex flex-col items-center p-10 lg:px-0 dark:bg-gray-800 dark:text-secondary'}>
                    <div className={'text-xl text-center'}>独立的业务逻辑封装</div>
                    <div className={'text-4xl text-primary m-2'}>专注业务</div>
                    <div className={'text-4xl text-primary m-2'}>与视图解耦</div>
                    <div className={'lg:flex my-10 px-10'}>
                        <div className={'lg:w-1/2 px-0 md:px-20 lg:px-0'}>
                            <Code code={this.flowCode} />
                        </div>
                        <div
                            className={
                                'pt-10 lg:pt-0 lg:w-1/2 md:px-20 pl-0 lg:pl-10 lg:pr-0 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                            }
                        >
                            <div>
                                使用<span className={'text-primary'}>@flow</span>声明一个流程组件，统一编写业务逻辑。这很重要，因为业务逻辑不应该放在视图组件中、函数中、全局状态中，复用也更加轻便。
                                <span className={'text-primary'}>也因为数据操作不能主动对视图组件赋值，所以不用担心触发重新渲染，</span>
                                就像调用后端接口一样放心。
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col items-center p-10 lg:px-0 bg-secondary dark:bg-gray-800 dark:text-secondary'}>
                    <div className={'text-xl text-center'}>依赖注入</div>
                    <div className={'text-4xl text-primary m-2'}>高内聚</div>
                    <div className={'text-4xl text-primary m-2'}>低耦合</div>
                    <div className={'lg:flex my-10 px-10'}>
                        <div className={'lg:w-1/2 px-0 md:px-20 lg:px-0'}>
                            <Code code={this.diCode} />
                        </div>
                        <div
                            className={
                                'pt-10 lg:pt-0 lg:w-1/2 md:px-20 pl-0 lg:pl-10 lg:pr-0 flex flex-col justify-center text-gray-500 text-2xl dark:text-secondary'
                            }
                        >
                            <div>
                                借助<span className={'text-primary'}>@autowired()</span>装饰器， 视图组件
                                可以方便的调用流程组件，流程组件可以方便的调用工具组件，无需操心其创建和初始化——
                                <span className={'text-primary'}>一切由框架自动实例化和注入</span>。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndexPage;

import { route, page, reactive } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Code, Card, InlineCode, Header2, Header3 } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/flow-component')
@page()
class LearnFlowComponentPage {
    code = `
import {flow, autowired} from "@cocojs/mvc";
import LoginApi from "@/api/login-api";
import LocalStorage from "@/component/local-storage";

@flow()
class LoginFlow {
  // 忽略LoginApi和LocalStorage的具体实现
  loginApi: LoginApi;
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

  // 登出
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

export default LoginFlow;
  `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>数据流组件</Header1>
                <Header2>副作用</Header2>
                <div>
                    在前端领域中，我们经常听到一个概念叫副作用，指的是渲染过程中调用外部API的操作，例如：调用
                    <InlineCode>localStorage</InlineCode>，<InlineCode>setTimeout</InlineCode>，
                    <InlineCode>addEventListener</InlineCode>，<InlineCode>fetch</InlineCode>等等。 我们可以简单的分为 2
                    类：UI副作用和数据副作用：
                    <div>1. UI副作用：是指包含和用户交互相关的副作用，例如</div>
                    <ul className={'list-disc pl-5'}>
                        <li>input.focus()</li>
                        <li>element.innerText = "hello"</li>
                        <li>element.style.color = "red"</li>
                        <li>window.addEventListener('resize', handler)</li>
                        <li>history.pushState()</li>
                        <li>window.location.href = '...'</li>
                        <li>window.open(...)</li>
                        <li>ctx.fillRect(0, 0, 100, 100)</li>
                        <li>audio.play()</li>
                    </ul>
                    <div>2. 数据副作用：是指和数据处理相关的副作用，例如：</div>
                    <ul className={'list-disc pl-5'}>
                        <li>fetch('/api/data')</li>
                        <li>axios.get('/api/data')</li>
                        <li>XMLHttpRequest</li>
                        <li>new WebSocket('wss://...')</li>
                        <li>new EventSource('/events')</li>
                        <li>localStorage.setItem('key', 'value')</li>
                        <li>sessionStorage.setItem('key', 'value')</li>
                        <li>cookie.setItem('key', 'value')</li>
                        <li>indexedDB.open('myDB')</li>
                        <li>caches.open('v1').then(...)</li>
                        <li>window.myGlobal = 42</li>
                    </ul>
                    还有一些副作用可能不能归类于上面 2 类，例如：
                    <ul className={'list-disc pl-5'}>
                        <li>setTimeout(function() {}, 1000)</li>
                        <li>setInterval(function() {}, 1000)</li>
                        <li>Promise.resolve().then(...)</li>
                    </ul>
                    举一个例子来说剥离数据副作用的用处：假设需要提供2种登录方式：账密登录和单点登录，那么大体的代码如下：
                    <Code code={this.code} />
                    这里使用一个类包含了所有登录流程，<InlineCode>LoginApi</InlineCode>和
                    <InlineCode>LocalStorage</InlineCode>
                    只提供基本实现，暂时忽略，重点是任意视图组件都可以复用这 2 个接口且不会导致页面重新渲染，
                    将来如果需要添加扫码登录，只需要添加一个扫码登录方法即可，非常清晰。
                    总结一下拆分出数据副作用的好处：
                    <ol className={'list-disc pl-5'}>
                        <li>数据流高内聚，易于扩展</li>
                        <li>数据流比复用视图组件复用维度更小、更精确</li>
                        <li>不用担心页面重新渲染</li>
                    </ol>
                    coco-mvc提供了<InlineCode>@flow</InlineCode>装饰器标记数据流组件，或者说封装数据的处理流程，这也是取名 flow
                    的原因。
                    <Card>
                        <div>
                            coco-mvc认为UI副作用和数据副作用的影响范围是不同的，使用场景也是不同的：UI
                            副作用适合封装视图层的业务逻辑，而数据副作用适合封装数据处理的流程。
                        </div>
                        <div>
                            在软件工程领域，我们希望UI和业务分离，并确保页面单向调用业务逻辑提供的接口，因为页面是变化无常的，而业务逻辑相对稳定，让不稳定的页面依赖稳定的业务逻辑，有助于提升代码的可维护性。
                        </div>
                    </Card>
                </div>
                <Header2>使用场景</Header2>
                很多情况下，后端接口返回的数据可以直接用来渲染页面，导致前端的逻辑封装单元是视图组件，但确实也存在一些复杂的场景，例如：
                <ul className={'list-disc pl-5'}>
                    <li>需要顺序或并发调用多个后端接口</li>
                    <li>
                        需要调用localStorage sessionStorage document setTimeout setInterval addEventListener等浏览器api
                    </li>
                    <li>需要处理复杂的业务逻辑或数据转换</li>
                </ul>
                <Card>
                    如果后端接口返回的数据可以直接使用，还需要封装一个副作用组件吗？
                    我们推荐是不需要，因为这样的封装是没有意义的，是为了封装而封装，视图组件同样可以直接调用后端接口组件，当业务变复杂，需要调用多个副作用了，那么再提取成
                    flow 组件也不迟。
                </Card>
            </ContentLayout>
        );
    }
}

export default LearnFlowComponentPage;

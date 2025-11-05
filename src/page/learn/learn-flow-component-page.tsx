import { route, page, reactive } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Code, Card, InlineCode, Header2 } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/flow-component')
@page()
class LearnFlowComponentPage {
    code = `
import {flow, autowired} from "coco-mvc";
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
                <Header1>流程组件</Header1>
                <Header2>前端副作用</Header2>
                <div>
                    在前端领域中，我们经常听到一个概念叫副作用，指的是渲染过程中调用外部API的操作，例如：调用localStorage，setTimeout，addEventListener，fetch等等。
                    我们可以将这些外部 API 简单的分为 2 类：UI副作用和数据副作用。 1.
                    UI副作用：是指包含和用户交互相关的副作用，例如
                    <ol>
                        <li>input.focus()</li>
                        <li>element.innerText = "hello"</li>
                        <li>element.style.color = "red"</li>
                        <li>window.addEventListener('resize', handler)</li>
                        <li>history.pushState()</li>
                        <li>window.location.href = '...'</li>
                        <li>window.open(...)</li>
                        <li>ctx.fillRect(0, 0, 100, 100)</li>
                        <li>audio.play()</li>
                    </ol>
                    2. 数据副作用：是指和数据处理相关的副作用，例如：
                    <ol>
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
                    </ol>
                    还有一些副作用可能不能归类于上面 2 类，例如：
                    <ol>
                        <li>setTimeout(function() {}, 1000)</li>
                        <li>setInterval(function() {}, 1000)</li>
                        <li>Promise.resolve().then(...)</li>
                    </ol>
                    为什么副作用分类很重要，我们举一个例子：假设需要实现一个业务，提供2种登录方式：账密登录和单点登录，那么大体的代码是这样的：
                    <Code code={this.code} />
                    先忽略LoginApi和LocalStorage的具体实现，关注重点是这个类描述了完整的登录业务流程，任意页面都可以调用这个类提供的接口且不会导致页面重新渲染，
                    将来如果需要添加扫码登录，只需要添加一个扫码登录方法即可，非常清晰。
                    总结一下拆分出数据副作用的好处： 1. 只关心业务的数据流转过程 2.
                    可以被任意页面调用，不用担心页面状态被修改 3. 业务逻辑高聚合 4. UI
                    副作用适合封装视图层的业务逻辑，而数据副作用适合封装数据处理的流程 所以框架提供了
                    <InlineCode>@flow</InlineCode>装饰器封装数据副作用，或者说封装数据的处理流程，这也是取名 flow
                    的原因。
                    <Card>
                        我们认为UI副作用和数据副作用的影响范围是不同的，使用场景也是不同的：UI
                        副作用适合封装视图层的业务逻辑，而数据副作用适合封装数据处理的流程。
                        在软件工程领域，我们希望UI和业务分离，并确保页面单向调用业务逻辑提供的接口，因为页面是变化无常的，而业务逻辑相对稳定，让不稳定的页面依赖稳定的业务逻辑，有助于提升代码的可维护性。
                    </Card>
                </div>
                <Header2>使用场景</Header2>
                很多情况下，后端接口返回的数据可以直接用来渲染页面，但确实也存在一些复杂的场景，例如：
                <ol>
                    <li>需要顺序或并发调用多个后端接口</li>
                    <li>
                        需要调用localStorage sessionStorage document setTimeoout setInterval addEventListener等浏览器api
                    </li>
                    <li>需要处理复杂的业务逻辑或数据转换</li>
                </ol>
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

import {route, page, reactive} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Code, Card, InlineCode, Header2 } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/effect-component')
@page()
class LearnEffectComponentPage {
  code = `
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

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>副作用组件</Header1>
      使用<InlineCode>@effect</InlineCode>装饰器都可以声明副作用组件。
      <Header2>为什么剥离副作用很重要？</Header2>
      <div>
        在软件工程中，我们希望UI和业务分离，并确保页面单向调用业务逻辑提供的接口，因为页面是变化无常的，而业务逻辑相对稳定，让不稳定的页面依赖稳定的业务逻辑，有助于提升代码的可维护性。
      </div>
      <Header2>使用场景</Header2>
      很多情况下，后端接口返回的数据可以直接用来渲染页面，但确实也存在一些复杂的场景，例如：
      <ol>
        <li>需要顺序或并发调用多个后端接口</li>
        <li>需要调用localStorage sessionStorage document setTimeoout setInterval addEventListener等浏览器api</li>
        <li>需要处理复杂的业务逻辑或数据转换</li>
      </ol>
      <div>
        这些场景下如果把副作用掺杂在ui中是不合适的，我们应该把他们剥离出来，单独维护它们，同时相似业务的副作用应该放在一个类中。
      </div>
      举一个例子，我们有2种登录方式：账密登录和单点登录，他们也不仅仅是调用后端接口，还需要设置LocalStorage，那么我们可以把他们提取到副作用组件中。
      <Code code={this.code} />
      <Card>
        如果后端接口返回的数据可以直接使用，还需要封装一个副作用组件吗？
        我们推荐是不需要，因为这样的封装是没有意义的，只是为了封装而封装，视图组件同样可以直接调用后端接口组件，当业务变复杂，情况变成了复杂场景，那么再提取成副作用组件也是可以的。
      </Card>
      <Header2>副作用</Header2>
      <div>
        在前端领域中，副作用一词指代渲染的过程中调用外部API的所有操作，
        为了更好的管理副作用，coco-mvc专门提供了<InlineCode>@effect</InlineCode>装饰器。
      </div>
      在示例中，<InlineCode>LoginEffect</InlineCode>类被标记成一个副作用组件，同时包含了2个登录方法，很容易理解<InlineCode>LoginEffect</InlineCode>组件是承载登录相关业务的，
      将来如果新增扫码登录，很容易想到在<InlineCode>LoginEffect</InlineCode>类中新增一个方法即可。
    </ContentLayout>
  }
}

export default LearnEffectComponentPage;
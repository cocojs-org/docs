import {route, page, reactive} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Code, Card } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/effect-component')
@page()
class LearnEffectComponentPage {
  code = `
@effect()  
class LoginEffect {
  @autowired()
  loginApi: LoginApi;

  @autowired()
  localStorage: LocalStorage;
  
  login() {
    try {
      // 处理多个服务层的逻辑，但不关心具体实现
      const { token } = this.loginApi.login();
      this.localStorage.set('token', token);
      return true;
    } catch (e) {
      return false
    }
  }
}
  `;

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>副作用组件</Header1>
      副作用组件是指副作用层的组件，主要用于组织工具层组件，控制业务流程，例如登录操作：
      <Code code={this.code} />
      <Card>
        因为工具层组件都是专注于自身模块的，所以模块之间的耦合通过副作用层来实现。将来业务流程有变动，也只需要修改副作用层组件即可。
      </Card>
      <Card>
        为什么单独处理副作用很重要？
        因为如果视图和副作用掺杂在一起，修改副作用可能会影响渲染逻辑，那么维护代码就会变得困难。
      </Card>
    </ContentLayout>
  }
}

export default LearnEffectComponentPage;
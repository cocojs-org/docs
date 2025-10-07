import { page, route } from 'coco-mvc';
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, Card } from "cocojs-component-demo";
import ContentLayout from "../../layout/content-layout";

@route('/reference/effect')
@page()
class ReferenceEffectPage {
  code = `
@effect()
class LoginEffect {

  @autowired()
  ls: LocalStorage;

  @autowired()
  userApi: UserApi;

  async login() {
    const { success, data: token } = await this.userApi.login();
    if (success) {
       this.ls.setItem("token", token);
    }
  }

  async logout() {
    const { success } = await this.userApi.logout();
    if (success) {
       this.ls.removeItem("token");
    }
  }
}
  `
  render() {
    return <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
      <Header1>@effect</Header1>
      @effect用于存放副作用（side effect），相似的副作用应该放在一个类中。
      在软件工程领域，我们一般希望ui和业务分离，这样ui和业务各自可以保持高内聚和低耦合。
      印象中业务逻辑都在后端，因为后端封装了复杂的业务逻辑，提供一个接口供前端调佣，这样看来前端好像没有业务。
      确实在很多场景下，前端只需要调用后端接口就可以完成业务处理。但确实也存在复杂一些的场景，例如：
      1. 需要顺序或并发调用多个接口
      2. 需要调用localStorage sessionStorage document setTimeoout setInterval addEventListener等浏览器api
      3. 需要处理复杂的业务逻辑或数据转换
      把这些副作用也掺杂在ui中是不合适的，我们应该把他们提取出来，单独维护他们。
      <Header2>装饰class</Header2>
      <Code code={this.code} />
      上面的代码简单展示了登录相关的副作用，这里只专注于登录和登出流程，而应该如何被ui调用，UserApi类如何实现login接口的，都可以忽略。
      <Card>
        <div>注意</div>
        <ul>
          <li>effect中不应该有ui相关的任何装饰器和逻辑</li>
          <li>effect不应该有内部状态，每次调用同一函数应该执行相同的流程</li>
          <li>effect一般来说仅控制流程，真正的实现交给工具层来做</li>
          <li>源文件只能放在src/effect文件夹下</li>
          <li>如果熟悉spring框架的话，可以理解effect和controller是对应的，只不过effect在前端领域更加熟悉和合适</li>
        </ul>
      </Card>
    </ContentLayout>
  }
}

export default ReferenceEffectPage;

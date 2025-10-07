import { page, route } from 'coco-mvc';
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, Card } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/reference/api')
@page()
class ReferenceApiPage {
  code = `
@api()
class UserApi {
  async login() {}
  
  async logout() {}
}
  `
  render() {
    return <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
      <Header1>@api</Header1>
      <div>api用于申明被装饰的类是接口类，接口类请求后端服务接口，为控制层提供服务。</div>
      <Header2>装饰class</Header2>
      <Code code={this.code} />
      <Card>
        <div>注意</div>
        <ul>
          <li>源文件放在src/api文件夹下</li>
        </ul>
      </Card>
    </ContentLayout>
  }
}

export default ReferenceApiPage;

import { route, page, reactive } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Code, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/util-component')
@page()
class LearnUtilComponentPage {
    code = `
@api()  
class UserApi () {
  login() { this.axios.post("/user/login") }
  create() { this.axios.post("/user/create") }
  detail() { this.axios.post("/user/detail") }
}
  `;

    code1 = `
@api()  
class UserApi () {
  login() { this.axios.post("/user/login") }
  create() { this.axios.post("/user/create") }
  detail() { this.axios.post("/user/detail") }
}

@api()  
class TodoApi () {
  list() { this.axios.post("/todo/list") }
  add() { this.axios.post("/todo/add") }
  complete() { this.axios.post("/todo/complete") }
}
`;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>工具组件</Header1>
                接口层是调用后端具体业务接口的封装。例如：用户登录，用户创建，用户信息获取。
                <Code code={this.code} />
                这里把用户相关的网络请求都封装在一个类中，作为一个服务。
                <div>现在我们还需要另外一个业务模块，例如：获取待办，新增待办，完成待办</div>
                <Code code={this.code1} />
                <Card>注意：接口应保持模块化，这里额外新增TodoApi类，而不是放在UserApi类中。</Card>
            </ContentLayout>
        );
    }
}

export default LearnUtilComponentPage;

import {route, page} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, Card, InlineCode } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/router')
@page()
class LearnRouterPage {
  routeCode = `
@route('/learn/router')
@page()
class LearnRouterPage {
}
`

  routerCode = `
import {autowired, bind, Router, page} from 'coco-mvc';

@page()
class LearnRouterPage {
  @autowired()
  private router: Router;
  
  @bind()
  clickBtn() {
    this.router.navigateTo("/")
  } 
  
  render() {
    return <button onClick={this.clickBtn}>跳转首页</button>
  }
}
`

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>路由</Header1>
      <Header2>页面绑定URL</Header2>
      <div>通过给页面组件（<InlineCode>page</InlineCode>）添加<InlineCode>@route</InlineCode>装饰器可为页面绑定url。</div>
      <div>例如本页面对应的组件对应的url是<InlineCode>/learn/router</InlineCode>：</div>
      <Card>
        不要给无业务含义的视图组件（<InlineCode>view</InlineCode>）和布局组件（<InlineCode>layout</InlineCode>）绑定url，不会生效。
      </Card>
      <Code code={this.routeCode} />
      <Header2>路由组件</Header2>
      <div>框架封装了路由组件<InlineCode>Router</InlineCode>，提供了<InlineCode>navigateTo</InlineCode>方法实现路由跳转，只需要注入到页面组件中即可，例如：</div>
      <Code code={this.routerCode} />
      <Card>
        目前框架仅支持History路由，正式版中会支持hash路由。
      </Card>
    </ContentLayout>
  }
}

export default LearnRouterPage;
import {route, page, reactive} from "coco-mvc";
import SideMenu from "@/view/side-menu";
import { Header1, Header2, Code, Card, InlineCode, Button } from "cocojs-component-demo";
import ContentLayout from "@/layout/content-layout";

@route('/learn/view-component')
@page()
class LearnViewComponentPage {
  code = `
@view()  
class Button () {
  render() {
    return <button>点赞</button>
  }
}
  `;
  viewCode = `
  import { view, reactive } from 'coco-mvc';
  
  @view()
  class Counter () {
    @reactive()
    count: number = 0;
    
    handleClick = () => {
      this.count = this.count + 1;
    }
  
    render() {
      return <div>
        <Button 
          onClick={this.handleClick}
          type={'primary'}
        >
          点我
        </Button>
        {this.count}
      </div>
    }
  }
    `;
    @reactive()
    count: number = 0;
    handleClick = () =>  {
      this.count++;
    }

  bindCode = `
@view()
class Button () {

  field: boolean = false;

  @bind()
  clickLike() {
    // this指向当前实例，而不是undefined
    console.log(this.field);
  } 
  
  render() {
    return <button onClick={this.clickLike}>点赞</button>
  }
}
`

  reactiveCode = `
@view()
class Button () {
  @reactive()
  liked: boolean = false;

  clickLike = () => {
    this.liked = !this.liked;
  } 
  
  render() {
    return <button onClick={this.clickLike}>{this.liked ? "已赞" : "点赞"}</button>
  }
}
`
  refCode = `
@view()  
class Button () {

  @ref()
  ref: { current: HtmlElement }

  render() {
    return <button ref={this.ref}>点赞</button>
  }
}
  `;

  memoizedCode = `
@view()
class Button () {
  
  @reactive()
  liked: boolean  = false;

  @bind()
  clickLike() {
    this.liked = !this.liked;
  } 
  
  @memoized()
  label() {
    return this.liked ? "已赞" : "点赞";
  }
  
  render() {
    return <button onClick={this.clickLike}>{this.label()}</button>
  }
}
`

  render() {
    return <ContentLayout sideMenu={<SideMenu />}>
      <Header1>视图组件</Header1>
      <Header2>声明视图组件</Header2>
      <div>我们可以使用视图组件描述用户界面，使用<InlineCode>@view</InlineCode>、<InlineCode>@page</InlineCode>或<InlineCode>@layout</InlineCode>装饰器都可以声明视图组件。</div>
      <div>视图组件必须有一个<InlineCode>render</InlineCode>方法，返回一个JSX对象，用于描述UI结构。</div>
      <div>例如我们封装一个的计数器组件：</div>
      <div className={'flex flex-row'}>
        <div className={'w-2/3'}>
          <Code code={this.viewCode} />
        </div>
        <div className={'w-1/3 p-2 flex flex-col justify-center items-center'}>
          <div><Button type={'primary'} onClick={this.handleClick}>点我</Button>{this.count}</div>
        </div>
      </div>
      在示例中，展示了2个特性：
      <ul>
        <li><InlineCode>@view()</InlineCode>装饰器标记Counter类为<span className={'text-primary'}>视图组件</span></li>
        <li><InlineCode>@reactive()</InlineCode>装饰器为<InlineCode>this.count</InlineCode>字段添加响应式</li>
      </ul>
      <div>下面使用<InlineCode>@view</InlineCode>装饰器描述一个计算器组件：</div>
      <Code code={this.code} />
      JSX的使用方式和React完全一致，熟悉React的开发者可以直接上手，底层也是通过<InlineCode>@babel/plugin-transform-react-jsx</InlineCode>插件转译成<InlineCode>createElement</InlineCode>函数调用。
      <Card>
        目前框架尚未支持 <InlineCode>Fragment</InlineCode>，后续版本加入。
      </Card>
      <Header2>响应式</Header2>
      下面我们使用<InlineCode>@reactive()</InlineCode>装饰器为视图组件添加一个响应式字段。
      <Code code={this.reactiveCode} />
      现在修改<InlineCode>liked</InlineCode>字段，框架会重新渲染视图组件，并更新UI。
      <Card>
        注意只有使用严格不等（<InlineCode>===</InlineCode>）的值进行赋值，才会触发重新渲染。
        也就是说当响应式字段的类型是对象时，需要使用一个新的对象赋值，而不是修改旧对象的属性。这点和React也是一致的。
      </Card>
      <Header2>方法绑定this</Header2>
        类的方法在运行时this指向undefined，一般解法是构造函数里面绑定<InlineCode>this</InlineCode>或者直接使用字段声明函数表达式。
        框架也提供了<InlineCode>@bind()</InlineCode>装饰器，可以在组件实例化的时候自动绑定<InlineCode>this</InlineCode>。
      <Code code={this.bindCode} />
      <Card>
        <InlineCode>render</InlineCode>函数不需要添加<InlineCode>@bind()</InlineCode>，框架会自动绑定实例。
      </Card>
      <Header2>引用dom元素或者子组件</Header2>
      当需要引用dom元素或者子组件，可以使用<InlineCode>@ref()</InlineCode>装饰器。
      <Code code={this.refCode} />
      通过<InlineCode>@ref()</InlineCode>装饰器会自动将<InlineCode>ref</InlineCode>初始化成一个有<InlineCode>current</InlineCode>属性的对象，
      并且页面挂载后自动为<InlineCode>current</InlineCode>属性赋值。
      <Card>
        <ul>
          <li>通过<InlineCode>@ref()</InlineCode>装饰器获取单个自定义组件也是可以，使用方法是完全一致的。</li>
          <li>
            如果需要访问多个dom元素或者子组件，那么请使用<InlineCode>@refs()</InlineCode>装饰器，
            <InlineCode>@refs()</InlineCode>装饰器会将被装饰字段初始化成空对象，在JSX中需要对<InlineCode>this.refs</InlineCode>进行属性赋值。</li>
        </ul>
      </Card>
      <Header2>缓存结果</Header2>
      当有一些复杂计算的渲染结果时，可以使用<InlineCode>@memoized()</InlineCode>装饰方法，这样只有方法使用到响应式属性修改时，方法才会重新执行。
      <Code code={this.memoizedCode} />
      <Card>
        <InlineCode>@memoized()</InlineCode>装饰的方法也会自动绑定<InlineCode>this</InlineCode>到当前实例，不需要添加<InlineCode>@bind()</InlineCode>。
      </Card>
      <Header2>生命周期函数</Header2>
      <ul>
        <li><InlineCode>viewDidMount()</InlineCode>组件首次挂载成功后触发。</li>
        <li><InlineCode>viewDidUpdate()</InlineCode>组件的props发生变化时触发。</li>
        <li><InlineCode>viewWillUnmount()</InlineCode>组件即将销毁前触发。</li>
      </ul>
      <Header2><InlineCode>@view</InlineCode> <InlineCode>@page</InlineCode> <InlineCode>@layout</InlineCode>的区别</Header2>
      <div>coco-mvc同时还提供了<InlineCode>@page()</InlineCode><InlineCode>@layout()</InlineCode>装饰器，也可以用于声明视图组件，且功能和<InlineCode>@view()</InlineCode>装饰器一致。</div>
      区别在他们具备不同的业务含义：
      <ul>
        <li>
          <InlineCode>@view()</InlineCode>用于声明一个无业务含义的视图组件。
        </li>
        <li>
          <InlineCode>@page()</InlineCode>用于声明一个页面：也就是说页面组件只能是根组件，不能被其他组件包裹，且同时有路由信息。
        </li>
        <li>
          <InlineCode>@layout()</InlineCode>用于声明一个布局：布局组件用于描述页面结构，一般有一个或多个<InlineCode>props</InlineCode>（例如：页头、页脚、菜单栏、内容）用于填充具体的内容。
        </li>
      </ul>
      <Card>
        熟悉React的开发者会发现：和类组件很相似？确实是的，甚至底层代码也是React的，因为装饰器是基于类的，尽量和React保持一致可以减少学习成本，同时文档中提及的JSX，state更新逻辑也可以在React文档中学习。
      </Card>
    </ContentLayout>
  }
}

export default LearnViewComponentPage;
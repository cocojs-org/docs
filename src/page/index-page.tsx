import {page, route, Router, autowired, bind} from 'coco-mvc';
import { Button, Code } from 'cocojs-component-demo'
import HeaderBar from "@/view/header-bar";

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
    this.router.navigateTo('/learn/overview');
  }

  code = `
@view()
class Counter () {
  @reactive()
  count: number = 0;
    
  handleClick = () => {
    this.count += 1;
  }
  
  render() {
    return <div>
      <Button onClick={this.handleClick}>点我+1</Button>
      {this.count}
    </div>
  }
}
    `;

  render() {
    return <div className={'w-full pt-14'}>
      <HeaderBar />
      <div className={'flex flex-col items-center py-20'}>
        <div className={'text-7xl text-primary'}>
          coco-mvc
        </div>
        <div className={'text-3xl mt-4'}>
          使用<span className={'text-primary'}>@装饰器</span>构建可扩展的Web应用
        </div>
        <div className={'flex justify-center mt-20'}>
          <Button type={'primary'} onClick={this.clickQuickStart}>快速上手</Button>
          <div className={'mx-2'} />
          <Button onClick={this.clickReference}>参考文档</Button>
        </div>
      </div>
      <div className={'flex flex-col items-center p-20 bg-secondary'}>
        <div className={'text-xl text-center'}>使用类和装饰器描述用户界面</div>
        <div className={'text-4xl text-primary m-2'}>语义化</div>
        <div className={'text-4xl text-primary m-2'}>简洁</div>
        <Code code={this.code} />
        <div>
          <span className={'text-primary'}>@view()</span>装饰器标记Button类是一个视图组件，<span className={'text-primary'}>@reactive()</span>为count字段添加响应式能力，
          即使是第一次看见，也可以轻松理解代码。
        </div>
      </div>
      <div className={'flex flex-col items-center p-20'}>
        <div className={'text-xl text-center'}>拆分副作用</div>
        <div className={'text-4xl text-primary m-2'}>专注业务</div>
        <div className={'text-4xl text-primary m-2'}>单向依赖</div>
        <Code code={this.code} />
        <div>
          <span className={'text-primary'}>@view()</span>装饰器标记Button类是一个视图组件，<span className={'text-primary'}>@reactive()</span>为count字段添加响应式能力，
          即使是第一次看见，也可以轻松理解代码。
        </div>
      </div>
      <div className={'flex flex-col items-center p-20 bg-secondary'}>
        <div className={'text-xl text-center'}>约定大于配置</div>
        <div className={'text-4xl text-primary m-2'}>统一性</div>
        <div className={'text-4xl text-primary m-2'}>沟通无压力</div>
        <Code code={this.code} />
        <div>
          <span className={'text-primary'}>@view()</span>装饰器标记Button类是一个视图组件，<span className={'text-primary'}>@reactive()</span>为count字段添加响应式能力，
          即使是第一次看见，也可以轻松理解代码。
        </div>
      </div>
    </div>
  }
}

export default IndexPage;

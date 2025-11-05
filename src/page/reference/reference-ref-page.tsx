import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/reference/ref')
@page()
class ReferenceRefPage {
    code = `
class A {
  @ref()
  input: { current: HtmlElement }
  
  render () {
    return <input ref={this.input} />
  }
}
  `;

    code1 = `
class B {
  @reactive()
  list = [1, 2]
  
  @refs()
  input: Record<number, HtmlElement>

  render () {
    return <div>
      {
        this.list.map((item, idx) => (
          <input ref={(elm) => this.input[idx] = elm} />
        ))
      }
    </div>
  }
}
  `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@ref</Header1>
                <Header2>装饰field</Header2>
                <div>使用@ref引用单个dom元素或者子组件</div>
                <Code code={this.code} />
                <div>使用@refs引用多个dom元素或者子组件</div>
                <Code code={this.code1} />
            </ContentLayout>
        );
    }
}

export default ReferenceRefPage;

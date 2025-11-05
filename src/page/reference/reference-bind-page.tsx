import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/reference/bind')
@page()
class ReferenceBindPage {
    code = `
@view()
class IndexPage {
  @bind()
  onClick() {}
}
  `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@bind</Header1>
                <div>bind是method装饰器，用于绑定被装饰方法的this到当前实例</div>
                <Code code={this.code} />
                <Header2>装饰method</Header2>
                <Card>
                    <div>注意</div>
                    <ul>
                        <li>渲染函数不需要手动@bind，框架内部会自动绑定视图类实例。</li>
                    </ul>
                </Card>
            </ContentLayout>
        );
    }
}

export default ReferenceBindPage;

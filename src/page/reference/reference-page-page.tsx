import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/reference/page')
@page()
class ReferencePagePage {
    code = `
@page()
class IndexPage {
  render() {
    return <div>hello world</div>
  }
}
  `;
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@page</Header1>
                <div>@page用于申明被装饰的类是页面类。</div>
                <Code code={this.code} />
                <Header2>装饰class</Header2>
                <Card>
                    <div>注意</div>
                    <ul>
                        <li>源文件放在src/page文件夹下</li>
                    </ul>
                </Card>
            </ContentLayout>
        );
    }
}

export default ReferencePagePage;

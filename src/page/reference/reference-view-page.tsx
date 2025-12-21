import { page, route } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/reference/view')
@page()
class ReferenceViewPage {
    code = `
@view()
class Button {
  render() {
    return <button>提交</button>
  }
}
  `;
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@view</Header1>
                <div>@view用于申明被装饰的类是视图类。</div>
                <Code code={this.code} />
                <Header2>装饰class</Header2>
                <div>表示将被装饰的类注册成视图组件</div>
                <Card>
                    <div>注意</div>
                    <ul>
                        <li>如果描述组件，源文件放在view文件夹下</li>
                    </ul>
                </Card>
            </ContentLayout>
        );
    }
}

export default ReferenceViewPage;

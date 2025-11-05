import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, Card } from 'coco-official-website-kit';
import ContentLayout from '../../layout/content-layout';

@route('/reference/reactive')
@page()
class ReferenceReactivePage {
    code = `
@view()
class IndexPage {
  @reactive()
  count: string;
}
  `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@reactive</Header1>
                <div>reactive是field装饰器，用于给组件添加一个响应式字段。</div>
                <Code code={this.code} />
                <Header2>装饰field</Header2>
                <Card>
                    <div>注意</div>
                    <ul>
                        <li>只在视图组件内部生效</li>
                        <li>字段会被改成getter/setter</li>
                    </ul>
                </Card>
            </ContentLayout>
        );
    }
}

export default ReferenceReactivePage;

import { page, route } from 'coco-mvc';
import SideMenu from '../../view/side-menu';
import { Header1, Header2 } from 'cocojs-component-demo';
import ContentLayout from '../../layout/content-layout';

@route('/reference/view-component')
@page()
class ReferenceViewComponentPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>视图组件</Header1>
                <div>视图组件就是所有具有view装饰器或者view复合装饰器的组件。</div>
                <Header2>children</Header2>
                <Header2>ref</Header2>
            </ContentLayout>
        );
    }
}

export default ReferenceViewComponentPage;

import { page, route } from 'coco-mvc';
import SideMenu from '../../view/side-menu';
import { Header1, Header2 } from 'cocojs-component-demo';
import ContentLayout from '../../layout/content-layout';

@route('/reference/web-component')
@page()
class ReferenceWebComponentPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>浏览器组件</Header1>
                <div>浏览器组件支持的属性和事件。</div>
                <Header2>children</Header2>
                <Header2>ref</Header2>
                <Header2>className</Header2>
                <Header2>style</Header2>
                <Header2>onClick</Header2>
            </ContentLayout>
        );
    }
}

export default ReferenceWebComponentPage;

import { page, route } from 'coco-mvc';
import SideMenu from '../../view/side-menu';
import { Header1 } from 'cocojs-component-demo';
import ContentLayout from '../../layout/content-layout';

@route('/reference/webApplication')
@page()
class ReferenceApplicationPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@webApplication</Header1>
                <div>webApplication装饰器只能装饰类，表明这个应用是一个coco-mvc应用</div>
                <div>@webApplication只能作用在src/application.ts中default export的类上</div>
                <div>被装饰的类同时也是配置类，第三方组件配置可以放在这里。</div>
            </ContentLayout>
        );
    }
}

export default ReferenceApplicationPage;

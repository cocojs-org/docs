import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2 } from 'coco-official-website-kit';
import ContentLayout from '../../layout/content-layout';

@route('/reference/component')
@page()
class ReferenceComponentPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@component</Header1>
                <Header2>装饰class</Header2>
                <div>使用component装饰的类会注册到ioc容器</div>
                <Header2>装饰method</Header2>
                <div>使用component装饰的方法的返回值也会注册到ioc容器，一般用于第三方组件的注册</div>
            </ContentLayout>
        );
    }
}

export default ReferenceComponentPage;

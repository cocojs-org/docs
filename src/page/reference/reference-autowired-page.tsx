import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import ContentLayout from '@/layout/content-layout';

@route('/reference/autowired')
@page()
class ReferenceAutowiredPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <h1>@autowired</h1>
                <div>autowired装饰器用于装饰字段，用于自动注入配置的组件</div>
            </ContentLayout>
        );
    }
}

export default ReferenceAutowiredPage;

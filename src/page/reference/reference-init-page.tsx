import { page, route } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import ContentLayout from '@/layout/content-layout';

@route('/reference/init')
@page()
class ReferenceInitPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <h1>@init</h1>
                <div>init装饰器装饰方法，用于标记ioc组件的初始化方法。</div>
            </ContentLayout>
        );
    }
}

export default ReferenceInitPage;

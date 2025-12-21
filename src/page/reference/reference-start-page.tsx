import { page, route } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import ContentLayout from '@/layout/content-layout';

@route('/reference/start')
@page()
class ReferenceStartPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <h1>@start</h1>
                <div>start装饰器装饰方法，用于标记ioc组件的启动方法。</div>
            </ContentLayout>
        );
    }
}

export default ReferenceStartPage;

import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import ContentLayout from '@/layout/content-layout';

@route('/reference/inject')
@page()
class ReferenceInjectPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <h1>@inject</h1>
                <div>
                    inject装饰器和autowired类似，也是自动注入组件实例，但inject会把参数传递给类的构造函数，一般用于应用启动时必须要初始化的装配工作。
                </div>
            </ContentLayout>
        );
    }
}

export default ReferenceInjectPage;

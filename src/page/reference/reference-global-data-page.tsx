import { page, route } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import ContentLayout from '../../layout/content-layout';

@route('/reference/global-data')
@page()
class ReferenceGlobalDataPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <h1>@globalData</h1>
                <div>
                    globalData装饰类用于将一个类定义成全局变量类，顾名思义就是全局类的实例只有一个，所有组件共享。
                </div>
            </ContentLayout>
        );
    }
}

export default ReferenceGlobalDataPage;

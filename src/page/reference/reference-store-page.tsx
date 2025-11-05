import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1 } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/reference/store')
@page()
class ReferenceStorePage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@store</Header1>
                <div>
                    store装饰类用于将一个类定义成全局状态，当修改全局状态是，所有引入此全局状态的view都会重新渲染。
                </div>
            </ContentLayout>
        );
    }
}

export default ReferenceStorePage;

import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1 } from 'coco-official-website-kit';
import ContentLayout from '../../layout/content-layout';

@route('/reference/target')
@page()
class ReferenceTargetPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@target</Header1>
                <div>target装饰器只用于装饰元数据类，用于标记元数据对应的装饰器的装饰目标。</div>
            </ContentLayout>
        );
    }
}

export default ReferenceTargetPage;

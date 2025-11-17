import { page, route } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1 } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/reference/route')
@page()
class ReferenceRoutePage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@route</Header1>
                <div>route装饰器定义一个url地址，关联某个页面和url。</div>
                <div>route只能在src/page文件夹使用，且对应的类同时有view装饰器</div>
            </ContentLayout>
        );
    }
}

export default ReferenceRoutePage;

import { page, route } from 'coco-mvc';
import SideMenu from '../../view/side-menu';
import ContentLayout from '../../layout/content-layout';

@route('/reference/configuration')
@page()
class ReferenceConfigurationPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <h1>@configuration</h1>
                <div>configuration装饰器用于装饰类，表明是一个配置类，配置类应该放在src/configuration目录下</div>
                <div>configuration和bean配合在一起才有用，用于配置第三方组件</div>
            </ContentLayout>
        );
    }
}

export default ReferenceConfigurationPage;

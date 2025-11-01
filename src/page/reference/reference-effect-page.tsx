import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Card } from 'cocojs-component-demo';
import ContentLayout from '../../layout/content-layout';

@route('/reference/effect')
@page()
class ReferenceEffectPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>@effect</Header1>
                <Header2>装饰class</Header2>
                <Card>
                    <div>注意</div>
                    <ul>
                        <li>effect中不应该有ui相关的任何装饰器和逻辑</li>
                        <li>effect不应该有内部状态，每次调用同一函数应该执行相同的流程</li>
                        <li>effect一般来说仅控制流程，真正的实现交给工具层来做</li>
                        <li>源文件只能放在src/effect文件夹下</li>
                        <li>
                            如果熟悉spring框架的话，可以理解effect和controller是对应的，只不过effect在前端领域更加熟悉和合适
                        </li>
                    </ul>
                </Card>
            </ContentLayout>
        );
    }
}

export default ReferenceEffectPage;

import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Table } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-composed-decorator')
@page()
class LearnAdvanceComposedDecoratorPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>复合装饰器</Header1>
                复合装饰器是指通过组合现有装饰器的方式创建一个新的装饰器，框架本身提供的@view、@page等都是复合装饰器，
                复合装饰器具体
                在总览一节中，使用@view装饰器表示视图组件，使用@controller装饰器表示控制层组件，使用@api装饰器表示接口组件，
                也就是说coco-mvc认为：被@view、@controller、@api装饰器装饰过的类都是组件，那么这与常见的前端框架中组件的概念是不一样的：
                * 常见前端框架中的组件是指多个浏览器标签组合起来的可复用的逻辑单元。 *
                coco-mvc中，组件是指添加了例如@view等特定装饰器的类，不同的装饰器表示不同业务意义。
                下面列出了框架提供的组件装饰器： * @component * @view * @page * @layout * @controller * @api *
                @globalData * @render * @store * @router
            </ContentLayout>
        );
    }
}

export default LearnAdvanceComposedDecoratorPage;

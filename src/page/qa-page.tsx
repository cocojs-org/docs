import { page, route } from '@cocojs/mvc';
import { Header1, Header2, Header3, Cd } from 'coco-official-website-kit';

@route('/qa')
@page()
class QAPage {
    render() {
        return (
            <div>
                <Header1>开发依赖库</Header1>
                <Header2>与其他库的对比</Header2>
                <Header3>与vue2的对比</Header3>
                <Cd>coco-mvc</Cd>和<Cd>vue2</Cd>的思想类似，都是通过对象来描述一个组件，主要区别是<Cd>vue2</Cd>通过<Cd>template</Cd>描述视图，<Cd>coco-mvc</Cd>通过jsx描述视图；
                <Cd>vue2</Cd>需要手动集成路由、状态管理等库，<Cd>coco-mvc</Cd>框架自带相应功能。
                <Header3>与react的对比</Header3>
                <Cd>coco-mvc</Cd>和<Cd>React</Cd>中的类组件是一样的，添加了对多个状态的支持，同时也原生支持路由和状态管理功能。
                <Header3>与Angular的对比</Header3>
                <Cd>coco-mvc</Cd>和<Cd>Angular</Cd>都是框架，且都是类加装饰器的写法，区别是<Cd>Angular</Cd>也使用模板描述视图，<Cd>coco-mvc</Cd>使用jsx描述视图；
                然后<Cd>coco-mvc</Cd>增加了更多字段级别的装饰器。
            </div>
        );
    }
}

export default QAPage;

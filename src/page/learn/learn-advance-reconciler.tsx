import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Code, Cd, CodePanel, Button, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-reconciler')
@page()
class LearnAdvanceReconcilerPage {
    reactCode = `
function Btn() {
    const [name, setName] = useState('jack');

    click = () => {
        setName('rose'); // 触发重新渲染
    }

    return <div onClick={click}>{name}</div>
}
    `;

    cocoMvcCode = `
@view()
class User {
    @reactive()
    name = 'jack';
    
    click() {
        this.name = 'rose'; // 触发重新渲染
    }
    
    render() {
        return <div onClick={this.click}>{this.name}</div>
    }
}
    `;

    storeCode = `
@store
class UserInfo {
    @reactive()
    name: string = '张三';
}

@view()
class Btn {
    @autowired()
    userInfo: UserInfo

    @bind()
    click() {
        this.userInfo.name = '李四';
    }

    render() {
        return <div onClick={this.click}>click me{this.userInfo.name}</div>
    }
}
    `;

    jsxCode = `
@store
class UserInfo {
    @reactive()
    name: string = '张三';
}

@view()
class Btn {
    @autowired()
    userInfo: UserInfo
    
    onClick = () => {
        const userInfo = this.userInfo; // 标记Btn组件触发了更新
        userInfo.name = '李四'; // 从标记知道Btn组件，然后通知重新渲染，并清空标记
        userInfo.name = '王五'; // 没有标记，不能通知重新渲染!!
    }

    render() {
        return <div onClick={}>click me{this.userInfo.name}</div>
    }
}
    `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>调度器</Header1>
                <Header2>视图组件触发重新渲染</Header2>
                视图组件的rerender机制沿用React的fiber调度算法，但注意一些细节：
                <ul className={'list-disc pl-5'}>
                    <li>
                        触发机制不一样：React使用<Cd>setState</Cd>函数触发；coco-mvc使用<Cd>defineProperty</Cd> +
                        赋值触发。
                    </li>
                    <li>必须使用新值：新的基础类型变量 或 引用类型变量是新的对象。</li>
                </ul>
                举例：
                <Header3>React</Header3>
                <Code code={this.reactCode} />
                <Header3>coco-mvc</Header3>
                <Code code={this.cocoMvcCode} />
                <Header2>store组件触发重新渲染</Header2>
                <Header3>执行更新流程</Header3>
                store组件也使用类似fiber更新的策略：
                <ul className={'list-disc pl-5'}>
                    <li>
                        每个store实例关联一个假的“fiber”对象，当store的field赋值时，store的<Cd>updateQueue</Cd>
                        中添加一个update对象，然后触发store实例关联的视图组件的更新流程。
                    </li>
                    <li>
                        在render阶段，运行类组件的更新之前，先处理掉引用的store的<Cd>updateQueue</Cd>
                        ，保证视图组件使用的store的值是最新的。
                    </li>
                </ul>
                <Code code={this.storeCode} />
                <Header3>触发更新流程</Header3>
                往store的<Cd>updateQueue</Cd>添加<Cd>update</Cd>
                对象之后，还需要通知调度器开启一次重新渲染工作，所以需要知道`userInfo`是哪个视图组件的，
                这里有一种简单的办法：把<Cd>userInfo</Cd>字段改造成<Cd>getter</Cd>函数，在<Cd>getter</Cd>
                函数中记录当前访问的视图组件，这样触发就知道触发store更新的是哪个视图组件了。
                <Header3>限制</Header3>
                注意以下方式都不能正常触发更新流程：
                <Code code={this.jsxCode} />
            </ContentLayout>
        );
    }
}

export default LearnAdvanceReconcilerPage;

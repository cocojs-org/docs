import {route, page, reactive, autowired} from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Code, Card, InlineCode, Button } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';
import User from "@/store/user";

@route('/learn/store-component')
@page()
class LearnStoreComponentPage {

    storeCode: string = `
@store()
class User {
    // 注意必须要赋值null
    name: string = null;
} 

export default User;
    `

    loginCode: string = `
import User from './user.ts' 

@view()
class HeaderBar {
    @autowired()
    user: User;
    
    handleClick() {
        this.user.name = this.user.name ? null :  '张三';
    }
    
    render() {
        return <div>
            <button onClick={this.handleClick}>{this.user.name ? '登出' : '登录'}</button>
        </div>
    }
} 
    
`

    headerBarCode: string = `
import User from './user.ts' 

@view()
class HeaderBar {
    @autowired()
    user: User;
    
    render() {
        return <div>
            <div>{this.user.name || '未登录'}</div>
        </div>
    }
} 
    `

    @autowired()
    user: User;

    clickBtn = () => {
        this.user.name = this.user.name ? null :  '张三';
    }

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>store组件</Header1>
                <div>
                    在开发业务的时候，可能需要保存一些全局的、响应式的状态，例如用户登录信息，全局主题，语言偏好等，
                    这些状态需要跨页面共享，但在多个地方维护相同的状态又非常麻烦，这时候就可以使用store组件。
                </div>
                <div>
                    我们使用<InlineCode>@store</InlineCode>装饰器可以声明一个用户信息组件：
                </div>
                <Code code={this.storeCode} />
                store组件中所有字段都是响应式的，不用显式添加<InlineCode>@reactive</InlineCode>装饰器，
                但需要注意：<span className={'text-primary'}>一定要给字段添加一个默认值</span>，因为如果只有类型标注，TS编辑后不会生成实际的代码，
                导致框架获取不到字段名，也不能进行响应式改造。
                <div>
                    现在有 2 个地方使用到这个全局的用户信息：
                    <ul className={'list-decimal px-5'}>
                        <li>顶部主题按钮旁边有登录状态的展示</li>
                        <li>下方有一个按钮模拟模拟登录登出的逻辑</li>
                    </ul>
                </div>
                <Code code={this.loginCode} />
                <Button onClick={this.clickBtn}>{ this.user.name ? '登出' : '登录' }</Button>
                <Code code={this.headerBarCode} />
                <Card>
                    <ul className={'list-decimal px-5'}>
                        <li>store组件是<span className={'text-primary'}>所有视图组件共享的</span>，并非所有组件共享。</li>
                        <li>不要把所有的状态都放在store组件里面，这不是一个好的实践，单个视图组件中的状态应该仍然放在组件中维护。</li>
                    </ul>
                </Card>
            </ContentLayout>
        );
    }
}

export default LearnStoreComponentPage;

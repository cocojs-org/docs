import { page, route } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2 } from 'cocojs-component-demo';
import ContentLayout from '../../layout/content-layout';

@route('/reference/overview')
@page()
class ReferenceOverviewPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu type={'reference'} />}>
                <Header1>总览</Header1>
                <Header2>装饰器</Header2>
                框架内置装饰器
                <ul>
                    <li>
                        <span className={'text-blue-600'}>view</span>视图
                    </li>
                    <li>
                        <span className={'text-blue-600'}>page</span>页面
                    </li>
                    <li>
                        <span className={'text-blue-600'}>controller</span>控制器
                    </li>
                    <li>
                        <span className={'text-blue-600'}>service</span>服务
                    </li>
                    <li>
                        <span className={'text-blue-600'}>component</span>通用组件
                    </li>
                </ul>
                <ul>
                    <li>
                        <span className={'text-blue-600'}>reactive</span>响应式
                    </li>
                    <li>
                        <span className={'text-blue-600'}>bind</span>this绑定
                    </li>
                    <li>
                        <span className={'text-blue-600'}>memoized</span>缓存
                    </li>
                    <li>
                        <span className={'text-blue-600'}>ref</span>直接引用组件
                    </li>
                </ul>
                <ul>
                    <li>
                        <span className={'text-blue-600'}>globalData</span>全局数据
                    </li>
                    <li>
                        <span className={'text-blue-600'}>autowired</span>自动注入
                    </li>
                    <li>
                        <span className={'text-blue-600'}>store</span>全局状态
                    </li>
                    <li>
                        <span className={'text-blue-600'}>reactiveAutowired</span>自动注入全局状态
                    </li>
                </ul>
                <ul>
                    <li>
                        <span className={'text-blue-600'}>webApplication</span>应用入口
                    </li>
                    <li>
                        <span className={'text-blue-600'}>target</span>控制装饰目标范围
                    </li>
                    <li>
                        <span className={'text-blue-600'}>route</span>路由
                    </li>
                    <li>
                        <span className={'text-blue-600'}>configuration</span>配置类
                    </li>
                    <li>
                        <span className={'text-blue-600'}>value</span>运行时配置取值
                    </li>
                </ul>
                <Header2>类</Header2>
                框架内置一些类，用于开发时自动注入
                <ul>
                    <li>
                        <span className={'text-blue-600'}>Router</span>路由类
                    </li>
                </ul>
                <Header2>视图组件</Header2>
                框架支持的视图组件说明
                <ul>
                    <li>
                        <span className={'text-blue-600'}>浏览器组件</span>
                    </li>
                    <li>
                        <span className={'text-blue-600'}>类组件</span>
                    </li>
                </ul>
                <Header2>CLI</Header2>
                <ul>
                    <li>
                        <span className={'text-blue-600'}>命令行</span>
                    </li>
                </ul>
            </ContentLayout>
        );
    }
}

export default ReferenceOverviewPage;

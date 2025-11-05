import { autowired, bind, Router, Route, view } from 'coco-mvc';
import SideMenuItem from './side-menu-item';

@view()
class SideMenu {
    props: {
        type: 'reference' | 'learn';
    } = { type: 'reference' };

    learnMenu = [
        {
            name: '快速上手',
            route: '/learn/quick-start',
        },
        {
            name: '创建项目',
            route: '/learn/create-project',
        },
        {
            name: '目录结构',
            route: '/learn/directory-structure',
        },
        {
            name: '视图组件',
            route: '/learn/view-component',
        },
        {
            name: '流程组件',
            route: '/learn/flow-component',
        },
        {
            name: '工具组件',
            route: '/learn/util-component',
        },
        {
            name: '路由',
            route: '/learn/router',
        },
        {
            name: '配置和环境变量',
            route: '/learn/config',
        },
        {
            name: '深入装饰器',
            route: '/learn/advance-deep-in-decorator',
        },
        {
            name: '深入组件',
            route: '/learn/advance-deep-in-component',
        },
        {
            name: '创建装饰器',
            route: '/learn/advance-create-decorator',
        },
    ];

    referenceMenu = [
        {
            name: '总览',
            route: '/reference/overview',
        },
        {
            name: 'view',
            route: '/reference/view',
        },
        {
            name: 'page',
            route: '/reference/page',
        },
        {
            name: 'layout',
            route: '/reference/layout',
        },
        {
            name: 'effect',
            route: '/reference/effect',
        },
        {
            name: 'api',
            route: '/reference/api',
        },
        {
            name: 'bind',
            route: '/reference/bind',
        },
        {
            name: 'reactive',
            route: '/reference/reactive',
        },
        {
            name: 'memoized',
            route: '/reference/memoized',
        },
        {
            name: 'ref',
            route: '/reference/ref',
        },
        {
            name: 'component',
            route: '/reference/component',
        },
        {
            name: 'route',
            route: '/reference/route',
        },
        {
            name: 'store',
            route: '/reference/store',
        },
        {
            name: 'reactiveAutowired',
            route: '/reference/reactive-autowired',
        },
        {
            name: 'target',
            route: '/reference/target',
        },
        {
            name: 'webApplication',
            route: '/reference/webApplication',
        },
        {
            name: '浏览器组件',
            route: '/reference/web-component',
        },
        {
            name: '视图组件',
            route: '/reference/view-component',
        },
        {
            name: '命令行',
            route: '/reference/command',
        },
    ];

    @autowired()
    private router: Router;

    @autowired()
    private route: Route;

    @bind()
    handleClick(route: string) {
        if (this.route.pathname !== route) {
            this.router.navigateTo(route);
        }
    }

    render() {
        return (
            <div className="w-full flex-none p-4">
                {(this.props.type === 'reference' ? this.referenceMenu : this.learnMenu).map((i) => {
                    return (
                        <SideMenuItem
                            active={this.route.pathname === i.route}
                            label={i.name}
                            onClick={() => {
                                this.handleClick(i.route);
                            }}
                        />
                    );
                })}
            </div>
        );
    }
}

export default SideMenu;

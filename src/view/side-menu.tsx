import {autowired, bind, Router, Route, view} from '@cocojs/mvc';
import SideMenuItem from './side-menu-item';
import SideMenuGroupName from "@/view/side-menu-group-name";

@view()
class SideMenu {
    props: {
        type: 'reference' | 'learn';
    } = {type: 'reference'};

    learnMenu = [
        {
            name: '整体',
            children: [
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
                    name: '配置和环境变量',
                    route: '/learn/config',
                },
            ]
        },
        {
            name: '基础',
            children: [
                {
                    name: '视图组件',
                    route: '/learn/view-component',
                },
                {
                    name: 'store组件',
                    route: '/learn/store-component',
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
            ]
        },
        {
            name: '装饰器高阶',
            children: [
                {
                    name: '装饰器运行时',
                    route: '/learn/advance-decorator-runtime',
                },
                {
                    name: '组件装饰器',
                    route: '/learn/advance-component-decorator',
                },
                {
                    name: '创建装饰器',
                    route: '/learn/advance-create-decorator',
                },
            ]
        },
        {
            name: '组件高阶',
            children: [
                {
                    name: '组件的定义',
                    route: '/learn/advance-component-definition',
                },
                {
                    name: '依赖注入',
                    route: '/learn/advance-deep-in-di',
                },
                {
                    name: '组件实例化',
                    route: '/learn/advance-component-instantiation',
                },
            ]
        }
    ];

    referenceMenu = [
        {
            name: '总览',
            children: [
                {
                    name: '总览',
                    route: '/reference/overview',
                }
            ],
        },
        {
            name: '装饰器',
            children: [
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
                    name: 'flow',
                    route: '/reference/flow',
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
                    name: 'target',
                    route: '/reference/target',
                },
                {
                    name: 'webApplication',
                    route: '/reference/webApplication',
                },
            ]
        },
        {
            name: '组件',
            children: [
                {
                    name: '浏览器组件',
                    route: '/reference/web-component',
                },
                {
                    name: '视图组件',
                    route: '/reference/view-component',
                },
            ]
        },
        {
            name: '命令行',
            children: [
                {
                    name: '命令行',
                    route: '/reference/command',
                },
            ]
        }
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
            <div className="w-full flex-none p-4 dark:bg-gray-800 dark:text-secondary">
                {(this.props.type === 'reference' ? this.referenceMenu : this.learnMenu).map((i) => {
                    const {name, children} = i;
                    return (
                        <div>
                            <SideMenuGroupName title={name}/>
                            <div>
                                {children.map(child => (
                                    <SideMenuItem
                                        active={this.route.pathname === child.route}
                                        label={child.name}
                                        onClick={() => {
                                            this.handleClick(child.route);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SideMenu;

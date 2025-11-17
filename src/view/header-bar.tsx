import {autowired, bind, reactive, Router, Route, view} from '@cocojs/mvc';
import User from "@/store/user";

@view()
class HeaderBar {
    @autowired()
    user: User;

    @autowired()
    private router: Router;

    @autowired()
    route: Route;

    @reactive()
    theme: 'light' | 'dark';

    clickTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            this.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            this.theme = 'dark';
        }
    }

    viewDidMount() {
        const isDark = localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
        document.documentElement.classList.toggle(
            "dark", isDark
        );
        this.theme = isDark ? "dark" : "light";
    }

    clickGithub() {
        window.open('https://github.com/cocojs-org/coconut-framework');
    }

    @bind()
    clickReference() {
        this.router.navigateTo('/reference/overview');
    }

    @bind()
    clickLearn() {
        this.router.navigateTo('/learn/quick-start');
    }

    @bind()
    clickVersion() {
        this.router.navigateTo('/');
    }

    render() {
        return (
            <div className={'fixed flex flex-col items-center top-0 left-0 w-full'}>
                <div className={' bg-primary text-white w-full text-center'}>
                    目前框架还是内部预览版，请不要用于生产环境！
                </div>
                <div
                    className={
                        'flex flex-row justify-between items-center w-full px-8 h-14 border-b bg-white border-gray-200 dark:bg-gray-800 dark:text-secondary'
                    }
                >
                    <div className={'cursor-pointer'} onClick={this.clickVersion}>
                        当前版本：
                        <span>v0.0.1-alpha202511172037</span>
                    </div>
                    <div className={'flex justify-center'}>
                        {
                            this.route.pathname === '/learn/store-component' && <div className={'mx-2 cursor-pointer animate-bounce'}>
                                {this.user.name ? this.user.name : '未登录'}
                            </div>
                        }
                        <div className={'mx-2 cursor-pointer'} onClick={this.clickTheme}>
                            {this.theme === 'light' ? 'dark' : 'light'}
                        </div>
                        <div className={'mx-2 cursor-pointer'} onClick={this.clickLearn}>
                            教程
                        </div>
                        <div className={'mx-2 cursor-pointer'} onClick={this.clickReference}>
                            参考
                        </div>
                        <div className={'mx-2 cursor-pointer'} onClick={this.clickGithub}>
                            github
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderBar;

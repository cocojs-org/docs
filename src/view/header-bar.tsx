import { autowired, bind, Router, view } from 'coco-mvc';

@view()
class HeaderBar {
    @autowired()
    private router: Router;

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
                        'flex flex-row justify-between items-center w-full px-8 h-14 border-b bg-white border-gray-200'
                    }
                >
                    <div className={'cursor-pointer'} onClick={this.clickVersion}>
                        当前版本：
                        <span>v0.0.1-alpha202510092123</span>
                    </div>
                    <div className={'flex justify-center'}>
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

import { layout } from 'coco-mvc';
import HeaderBar from '@/view/header-bar';

@layout()
class ContentLayout {
    props: {
        sideMenu: any;
        children: any;
    };

    render() {
        return (
            <div className={'w-full pt-20 dark:bg-gray-800 dark:text-secondary'}>
                <HeaderBar />
                <div>
                    <div className={'w-70 fixed left-0 top-20'}>{this.props.sideMenu}</div>
                    <div className={'pl-70 w-full'}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default ContentLayout;

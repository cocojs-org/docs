import { view } from 'coco-mvc';

@view()
class SideMenuGroupName {
    props: {
        title: string;
    };

    render() {
        return (
            <div
                className={`
        h-10
        leading-10
        text-gray-400
        text-sm
        `}
            >
                {this.props.title}
            </div>
        );
    }
}

export default SideMenuGroupName;

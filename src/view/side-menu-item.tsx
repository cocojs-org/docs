import { view } from 'coco-mvc';

@view()
class SideMenuItem {
    props: {
        label: string;
        active: boolean;
        onClick: () => void;
    };

    render() {
        return (
            <div
                className={`
        h-10
        leading-10
        px-4
        cursor-pointer
        hover:text-primary
        rounded-md
        ${this.props.active ? 'text-primary bg-secondary' : 'text-gray-500'}
        `}
                onClick={this.props.onClick}
            >
                {this.props.label}
            </div>
        );
    }
}

export default SideMenuItem;

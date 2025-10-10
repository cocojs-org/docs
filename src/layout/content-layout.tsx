import {layout} from "coco-mvc";
import HeaderBar from "@/view/header-bar";

@layout()
class ContentLayout {

  props: {
    sideMenu: any
    children: any
  }

  render() {
    return <div className={'w-full pt-20'}>
      <HeaderBar />
      <div className={'flex flex-row'}>
        {this.props.sideMenu}
        <div>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}

export default ContentLayout;
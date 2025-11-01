import { route, page } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Card, Code } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';

@route('/learn/node-env')
@page()
class LearnNodeEnvPage {
    code: string = `
{
  webpack: {
     output: {
      publicPath: '/',
      path: path.join(process.cwd(), "docs")
    }
  }
} 
  `;

    code1: string = `
{
  "webpack": {
    "mode": "development",
    "devServer": {
      static: {
        directory: path.join(process.cwd(), "docs")
      }
    }
  }
}
  `;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>NODE_ENV</Header1>
            </ContentLayout>
        );
    }
}

export default LearnNodeEnvPage;

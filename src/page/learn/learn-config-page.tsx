import { route, page } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Card, Code } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';

@route('/learn/config')
@page()
class LearnConfigPage {
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
                <Header1>构建配置</Header1>
                框架使用webpack作为开发构建工具，构建配置目前只用于修改webpack。 webpack的配置一共分为3处： 1.
                框架内建配置A：核心的配置，见：https://github.com/coco-core/coconut-framework/blob/main/packages/coco-cli/build-config/webpack.config.js#L21
                2. 项目公共配置B：项目的公共配置，位于/config/config.js中的webpack属性 3.
                项目环境配置C：项目的设置NODE_ENV时的差异配置，位于/config/config.[NODE_ENV].js中的webpack属性
                最终不同文件中的webpack配置使用webpack-merge进行合并（webpack-merge(A, B, C)）得到最终配置文件。
                <Header2>项目公共配置</Header2>
                例如上面的配置中，把构建目录改为docs：
                <Code code={this.code} />
                <Header2>项目环境配置</Header2>
                根据不同场景将配置拆分到独立的文件中，例如：将开发配置放在config.dev.js中：
                <Code code={this.code1} />
                然后通过在命令行中设置NODE_ENV来启用相应值的配置文件。
                <Card>
                    1. coco
                    dev默认启用config.dev.js，不需要通过NODE_ENV显式设置，当然也可以通过NODE_ENV去加载其他的配置文件 2.
                    coco
                    build默认启用config.prod.js，不需要通过NODE_ENV显式设置，当然也可以通过NODE_ENV去加载其他的配置文件
                </Card>
            </ContentLayout>
        );
    }
}

export default LearnConfigPage;

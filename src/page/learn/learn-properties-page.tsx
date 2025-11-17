import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, Card } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/properties')
@page()
class LearnPropertiesPage {
    code: string = `
{
  "bootComponents": {
    "Router": {}
  },
  "Render": {
    "qualifier": "WebRender"
  }
}`;

    code1: string = `
{
  "Axios": {
    "baseURL": "https://some-domain.com/api/"
  }
}`;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>运行时配置</Header1>
                运行时配置是指在应用程序运行时读取的设置，并根据配置创建和初始化组件。
                运行时配置统一放在/properties文件夹下，默认配置文件application.json：
                <Code code={this.code} />
                最外层的key表示组件的id，对应的value表示做的配置，这里做了2个事： 1.
                bootComponents：用于统一配置需要自启动的组件，值是一个对象，对象的key是组件的id，value是truthy的都会自启动
                2. id是Render的组件：如果有多个子组件，且没有明确实例化哪个子组件时，就实例化id是WebRender组件
                <Card>不明白具体意义可以先忽略。</Card>
                运行时配置的意义是让开发者在不修改代码的前提下，根据不同的环境或需求来改变应用程序的行为。
                一个简单的例子：假设网络请求工具Axios也是一个组件，那么在运行时配置中可以进行Axios的实例配置，例如配置一个baseUrl。
                <Code code={this.code1} />
                <Header1>支持NODE_ENV环境变量</Header1>
                如果在命令行中设置NODE_ENV来设置环境变量，运行时配置会额外读取application.[NODE_ENV].json，和基础的配置文件合并成一份文件，放在src/.coco/application.json文件。
                <Card>
                    1. coco
                    dev默认启用application.dev.json，不需要通过NODE_ENV显式设置，当然也可以通过NODE_ENV去加载其他的配置文件
                    2. coco
                    build默认启用application.prod.json，不需要通过NODE_ENV显式设置，当然也可以通过NODE_ENV去加载其他的配置文件
                </Card>
                <Header2>配置合并逻辑</Header2>
                json的值类型有：string number boolean null Object Array 我们假设执行coco
                build命令，也就是application.json和application.prod.json合并，
                application.json简称o1，application.prod.json简称o2，合并得到o3，合并逻辑如下： 1.
                遍历o2的所有key，比较o1[key]和o2[key]： 1.1. o1没有[key]，取o2的值，o3[key] = o2[key] 1.2. o1有[key]：
                1.2.1 o1[key] o2[key] 类型不一致，则取o2的值，o3[key] = o2[key] 1.2.2 o1[key] o2[key] 类型一致： 1.2.2.1
                如果类型是string number boolean null array，则取o2的值，o3[key] = o2[key] 1.2.2.2
                如果类型是Object，则走第1步 总结来说就是进行相同key的值都是对象时，才会key合并，否则都是替换。
            </ContentLayout>
        );
    }
}

export default LearnPropertiesPage;

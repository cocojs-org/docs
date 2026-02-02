import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Card, Code, Cd } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/learn/config')
@page()
class LearnConfigPage {
    buildInConfig: string = `
{
    mode: 'production',
    entry: path.join(process.cwd(), './src/.coco/index.tsx'),
    module: {
        rules: [
            {
                test: /\\.tsx?$/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                [require.resolve('@babel/plugin-proposal-decorators'), { version: '2023-11' }],
                                [
                                    require.resolve('@babel/plugin-transform-react-jsx'),
                                    {
                                        runtime: 'automatic',
                                        importSource: '@cocojs/mvc',
                                    },
                                ],
                            ],
                        },
                    },
                    {
                        loader: require.resolve('ts-loader'),
                        options: {
                            context: process.cwd(),
                            transpileOnly: false,
                        },
                    },
                    {
                        loader: require.resolve('@cocojs/webpack-loader-mvc'),
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules'],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@': path.resolve(process.cwd(), 'src/'),
        },
    },
    output: {
        publicPath: '/',
        filename: 'main.js',
        path: path.join(process.cwd(), 'dist'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(process.cwd(), 'dist'),
        },
        compress: true,
        historyApiFallback: true,
        port: 9700,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: \`
<!DOCTYPE html>
<html lang="en">
<body>
  <div id="root"></div>
</body>
</html>
  \`,
        }),
    ],
};
    `;

    buildConfig: string = `
{
    webpack: {
        output: {
            publicPath: '/',
            path: path.join(process.cwd(), "docs")
        }
    }
} 
    `;

    devBuildConfig: string = `
{
    webpack: {
        mode: "development",
        devServer: {
            static: {
                directory: path.join(process.cwd(), "docs")
            }
        }
    }
}
    `;

    rollupBuildInConfig = `
{
    input: path.join(process.cwd(), './src/index.ts'),
    plugins: [
        cocojs(config[ValidProp.cocojs]),
        typescript({
            compilerOptions: {
                target: 'ESNext',
                lib: ['dom', 'esnext'],
                declaration: true,
                declarationDir: './dist/types',
                jsx: 'preserve',
                resolveJsonModule: true,
                plugins: [
                    {
                        transform: '@cocojs/type-extractor',
                        transformProgram: true,
                    },
                ],
            },
        }),
        babel({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            plugins: [
                [require.resolve('@babel/plugin-proposal-decorators'), { version: '2023-11' }],
                [
                    require.resolve('@babel/plugin-transform-react-jsx', {
                        paths: [path.resolve(__dirname, '..', '../node_modules')],
                    }),
                    {
                        runtime: 'automatic',
                        importSource: '@cocojs/mvc',
                    },
                ],
            ],
        }),
    ],
} 
    `;

    cocojsConfig: string = `
    rollup: {
        cocojs: {
            idPrefix: 'Zen' 
        }
    }
    `;

    propertiesConfig: string = `
{
  "bootComponents": {
    "Router": {}
  },
  "Render": {
    "qualifier": "WebRender"
  }
}`;

    axiosConfig: string = `
{
  "Axios": {
    "baseURL": "https://some-domain.com/api/"
  }
}`;

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>配置</Header1>
                配置分为构建配置和运行时配置，构建配置用来修改开发构建的行为，运行时配置用来更改类运行时的行为。
                <Header2>构建配置</Header2>
                构建配置是指项目打包使用的配置，应用项目和库项目分别使用webpack和rollup打包，位于/config/config.js文件中。
                <Header3>应用构建配置</Header3>
                应用使用webpack作为开发构建工具，脚手架内置了核心配置如下：
                <Code code={this.buildInConfig} />
                自定义配置放在/config/config.js中，例如把构建目录改为docs：
                <Code code={this.buildConfig} />
                <div>
                    部分配置是因环境而异的，在命令行中设置NODE_ENV就可以在/config/config.[NODE_ENV].js中添加特定环境的配置信息。
                </div>
                <Code code={this.devBuildConfig} />
                也就是说 3 份配置合并得到真正执行的配置。
                <Card>
                    <ol>
                        <li>coco dev默认启用config.dev.js，也可以设置NODE_ENV去加载其他的配置文件。</li>
                        <li>coco build默认启用config.prod.js，也支持设置NODE_ENV去加载其他的配置文件。</li>
                    </ol>
                </Card>
                <Header3>库构建配置</Header3>
                库应用目前使用 rollup 打包，也由 3 份配置组成，脚手架内置配置如下：
                <Code code={this.rollupBuildInConfig} />
                <div>公共配置如下：</div>
                <Code code={this.cocojsConfig} />
                <div>
                    idPrefix配置所有组件（除了手动添加<Cd>$$id</Cd>的组件）的 id 的公共前缀。
                </div>
                <Header2>运行时配置</Header2>
                运行时配置是指在应用程序运行时读取的设置，并根据配置创建和初始化组件。 运行时配置统一放在
                <Cd>/properties</Cd>文件夹下，默认配置文件application.json：
                应用启动的时候，需要在动态配置中使用<Cd>bootComponents</Cd>
                指定应用启动时一起启动的组件，例如配置路由组件：
                <Code code={this.propertiesConfig} />
                配置是一个对象，对象的 key 就是要配置的组件 id，值就是配置项。
                <ul className={'list-disc pl-5'}>
                    <li>
                        <Cd>bootComponents</Cd>：<Cd>bootComponents</Cd>并不是一个组件
                        id，而是用于配置自启动组件的配置项，值是一个对象，对象的key是组件id，value是truthy的值。
                    </li>
                    <li>
                        <Cd>Render</Cd>：配置 Render
                        的组件，这是框架暴露的一个组件，当Render组件没有明确实例化哪个子组件时，就实例化id是WebRender组件。
                    </li>
                </ul>
                运行时配置的意义是让开发者在不修改代码的前提下，根据不同的环境或需求来改变应用程序的行为。
                一个简单的例子：假设网络请求工具Axios也是一个组件，那么在运行时配置中可以进行Axios的实例配置，例如配置一个baseUrl。
                <Code code={this.axiosConfig} />
                <Header2>环境变量</Header2>
                如果在命令行中设置NODE_ENV来设置环境变量，运行时配置会额外读取application.[NODE_ENV].json，和基础的配置文件合并成一份文件，放在src/.coco/application.json文件。
                <Card>
                    1. coco
                    dev默认启用application.dev.json，不需要通过NODE_ENV显式设置，当然也可以通过NODE_ENV去加载其他的配置文件
                    2. coco
                    build默认启用application.prod.json，不需要通过NODE_ENV显式设置，当然也可以通过NODE_ENV去加载其他的配置文件
                </Card>
                <Header3>配置合并逻辑</Header3>
                json的值类型有：<Cd>string</Cd> <Cd>number</Cd>{' '}
                <Cd>boolean</Cd> <Cd>null</Cd> <Cd>Object</Cd>{' '}
                <Cd>Array</Cd>， 我们假设执行
                <Cd>coco build</Cd>命令，也就是<Cd>application.json</Cd>和
                <Cd>application.prod.json</Cd>合并，
                <Cd>application.json</Cd>简称<Cd>o1</Cd>，
                <Cd>application.prod.json</Cd>简称<Cd>o2</Cd>，合并得到
                <Cd>o3</Cd>，合并逻辑如下：
                <ul className={'list-disc pl-5'}>
                    <li>
                        遍历<Cd>o2</Cd>的所有<Cd>key</Cd>，比较
                        <Cd>o1[key]</Cd>和<Cd>o2[key]</Cd>：
                        <ul className={'list-disc pl-5'}>
                            <li>
                                <Cd>o1</Cd>没有<Cd>[key]</Cd>，取
                                <Cd>o2</Cd>的值，<Cd>o3[key]</Cd> ={' '}
                                <Cd>o2[key]</Cd>
                            </li>
                            <li>
                                <Cd>o1</Cd>有<Cd>[key]</Cd>：
                                <ul className={'list-disc pl-5'}>
                                    <li>
                                        <Cd>o1[key]</Cd> <Cd>o2[key]</Cd>{' '}
                                        类型不一致，则取<Cd>o2</Cd>的值，
                                        <Cd>o3[key]</Cd> = <Cd>o2[key]</Cd>
                                    </li>
                                    <li>
                                        <Cd>o1[key]</Cd> <Cd>o2[key]</Cd> 类型一致：
                                        <ul className={'list-disc pl-5'}>
                                            <li>
                                                如果类型是<Cd>string</Cd>{' '}
                                                <Cd>number</Cd> <Cd>boolean</Cd>{' '}
                                                <Cd>null</Cd> <Cd>array</Cd>，则取
                                                <Cd>o2</Cd>的值，<Cd>o3[key]</Cd> =
                                                <Cd>o2[key]</Cd>
                                            </li>
                                            <li>
                                                如果类型是<Cd>Object</Cd>
                                                ，则继续使用最开始的对象比较法。
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                总结来说就是进行相同key的值都是对象时，才会key合并，否则都是替换。
            </ContentLayout>
        );
    }
}

export default LearnConfigPage;

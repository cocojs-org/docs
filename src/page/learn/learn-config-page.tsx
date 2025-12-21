import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Header3, Card, Code } from 'coco-official-website-kit';
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
    `

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

    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>构建配置</Header1>
                构建配置是指项目打包使用的配置，应用项目和库项目分别使用webpack和rollup打包，位于/config/config.js文件中。
                <Header2>应用构建配置</Header2>
                应用使用webpack作为开发构建工具，脚手架内置了核心配置如下：
                <Code code={this.buildInConfig} />
                自定义配置放在/config/config.js中，例如把构建目录改为docs：
                <Code code={this.code} />
                <div>部分配置是因环境而异的，在命令行中设置NODE_ENV就可以在/config/config.[NODE_ENV].js中添加特定环境的配置信息。</div>
                <Code code={this.code1} />
                也就是说 3 份配置合并得到真正执行的配置。
                <Card>
                    <ol>
                        <li>coco dev默认启用config.dev.js，也可以设置NODE_ENV去加载其他的配置文件。</li>
                        <li>coco build默认启用config.prod.js，也支持设置NODE_ENV去加载其他的配置文件。</li>
                    </ol>
                </Card>
                <Header2>库构建配置</Header2>
                库应用目前使用 rollup 打包，也由 3 份配置组成，脚手架内置配置如下：
                <Code code={this.rollupBuildInConfig} />
                <div>公共配置如下：</div>
                <Code code={this.cocojsConfig} />
                <div>idPrefix用于配置</div>
            </ContentLayout>
        );
    }
}

export default LearnConfigPage;

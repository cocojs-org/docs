import { route, page, reactive, bind, Router, autowired } from 'coco-mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Header2, Code, InlineCode, CodePanel, Button, Table } from 'cocojs-component-demo';
import ContentLayout from '@/layout/content-layout';

@route('/learn/advance-component')
@page()
class LearnAdvanceComponentPage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>自定义组件</Header1>
                通过给类添加@component、@view、@controller、@api、@page等装饰器，框架就知道被装饰的类是可以被实例化的，就会在被需要的时候实例化。
                那么有2个问题： 1. 如果一个类添加了其他装饰器（例如：@bind），那么框架会自己实例化吗？ 2.
                这几个装饰器之间有什么联系？
                第一个问题的答案是不会的，框架会判断被装饰的类有没有@component装饰器，只有标记了@component装饰器框架才会实例化被装饰的类。
                那么被@view装饰的类为什么也可以被实例化呢？这是因为@component也装饰了@view装饰器，所以框架会找类的装饰器时会判断是否被@component装饰，
                如果是的话，也会实例化被装饰的类。
                @controller、@api都是一样的原理，这样可以简单理解成“一层”装饰。而@page装饰器是被@view装饰了，所以@page相对于@component是“两层”装饰。
                首先这里组件并非前端领域中的视图组件，这里的组件是指添加了@component装饰器的类。组件更确切地说是ioc组件。
                那么要实现框架可以创建组件，需要3个步骤： 1. 什么是组件？ 2. 框架收集所有组件。 3.
                框架选择一个组件进行实例化。 # 什么是组件？
                上面提到添加了@component装饰器的类就是组件，这是比较笼统的说法，完整的说法是@component以及其下2代的装饰器都是有效的。
                目前框架内部暴露的装饰器包括： * @component * @view * @page * @layout * @controller * @api * @globalData
                * @render * @store * @router 一共三层，可以理解为:
                component用于添加一个无概念组件。第二层定义了具有通用概念的组件。第三层在通用概念的范围内的再划分的组件。
                @page @layout还有子装饰器，那么这些装饰器装饰的类都不会被框架扫描到，那框架也不会帮你组件化。 #
                框架收集所有组件 ## 来源 从来源上可分为3类： * 框架内部组件 * 项目组件 * 第三方组件 ### 框架内部组件
                框架内部组件（例如Router)是框架负责注册 ### 项目组件
                项目本身的组件（例如page、controller、service等目录下的组件），都是通过文件扫描后，由.coco/index.ts导出并注册
                ### 第三方组件 第三方组件还分为2中情况： 1. 已经是组件了(带有@component装饰器) 2.
                普通class（不带任何装饰器） # 框架实例化组件 ## 实例化场景 首先罗列所有需要实例化场景： 1.
                （项目中或第三方）在jsx中的自定义视图组件。 2.
                （项目中）任何视图组件A，内部有使用@autowired装饰器的字段，如果字段类型也是组件B，则在实例化A的时候也会自动实例化组件B
                3.
                （框架内部或项目中）任何组件A，构造函数有入参的，入参的类型是组件B，那么实例化A的同时也会被实例化组件B
                4. （框架内部或项目中）使用getComponent接口，入参是想要被实例化的组件A 5.
                （项目中）动态配置中，bootComponents字段指定的所有组件 ### 哪些需要支持子组件实例化： 1. 不需要 2.
                需要支持 3. 需要支持 4. 需要支持 5. 需要支持
                对于1和5，可以提供getComponent的另一个版本，不找子组件，直接实例化自身 ###
                总结来说只有3个场景需要特殊处理： 1. 项目中使用@autowired 2. 框架中使用getComponent 3.
                项目中使用getComponent ### 当被实例化的类存在子类时
                如果要实例化的类没有子类，则可以直接实例化，但是如果要实例化组件有子组件的话，那需要再讨论一下： 1.
                如果子组件只有一个，直接实例化子类 2. 如果子组件存在多个，需要明确实例化哪个 ### 3个场景需要特殊处理
                上面总结了3个场景需要特殊处理，我们再假设子组件有3个，分别是不同的来源，那么在几种实例化场景下如何处理：
                1.
                在对应的字段上再添加@qualify装饰器，参数是实例化的组件的id，然后在postConstruct中获取即可（@qualify一般用于配置类中，因为在业务中的话可能需要配置所有用到的地方，就比较麻烦了）
                2.
                2和3其实是一样的，通过配置当前组件的优先级最高的子组件id，getComponent在发现存在多个子组件的时候，从配置文件中确定优先级最高的子组件，然后进行实例化。
                ### 组件id id是字符串类型，一般来说是类名，第三方提供公共前缀的功能 1.
                提供接口返回所有子组件类型+运行时配置文件 2. 通过装饰器确定（在定义子组件的时候就确定了）
                通过配置文件中指定要子类id，那么应该放在运行时配置还是构建配置里面呢？
                常见场景如：注册一个父路由类，同时注册2个子路由类分别是history路由类和hash路由类，对于用于来说只需要导入父路由类就可以了。
                但是框架需要确定到底实例化哪一个子类。 ## 单例模式还是prototype模式 ### 组件实例化过程 1.
                列出所有bootComponents字段指定的要启动的组件集合A 2.
                遍历集合A，遍历找到所有@constructorParam装饰器的类和@autowired装饰器的类，形成集合B（全部应该初始化启动的类）
                3. 实例化所有没有@constructorParam装饰器的类 4. 所有有@constructorParam装饰器的类组成树，然后分别实例化
                5. 设置所有的@autowired字段 6. 集合B中的类，如果有initialize方法的，调用initialize方法 7.
                集合B中的类，如果有start方法的，调用start方法 // TODO:
                那么通过getComponent实例化的组件，需要考虑构造函数注入吗？需要调用initialize和start方法吗？
            </ContentLayout>
        );
    }
}

export default LearnAdvanceComponentPage;

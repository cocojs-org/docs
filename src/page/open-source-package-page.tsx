import { route, page } from '@cocojs/mvc';
import SideMenu from '@/view/side-menu';
import { Header1, Code } from 'coco-official-website-kit';
import ContentLayout from '@/layout/content-layout';

@route('/open-source-package')
@page()
class OpenSourcePackagePage {
    render() {
        return (
            <ContentLayout sideMenu={<SideMenu />}>
                <Header1>开源库</Header1>
                <div>coconut-framework使用如下开源库的代码：</div>
                <ul className={'list-disc pl-5'}>
                    <li>React</li>
                    <li>vue</li>
                </ul>
                <Code code={`
1. React Copyright (c) Facebook, Inc. and its affiliates. Permission is hereby granted, free of
charge, to any person obtaining a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Source: https://github.com/facebook/react Version: 18.2.0
`
                } />
                <Code code={`
2. Vue.js Copyright (c) 2013-present, Yuxi (Evan) You Permission is hereby granted, free of charge,
to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions: The above
copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. Source:
https://github.com/vuejs/vue Version: 2.7.16
                `} />
            </ContentLayout>
        );
    }
}

export default OpenSourcePackagePage;

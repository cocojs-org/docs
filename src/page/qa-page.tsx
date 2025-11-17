import { page, route } from '@cocojs/mvc';

@route('/qa')
@page()
class QAPage {
    render() {
        return <div>创建问题</div>;
    }
}

export default QAPage;

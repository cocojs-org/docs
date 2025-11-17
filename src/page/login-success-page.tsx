import { page, route } from '@cocojs/mvc';

@route('/login-success')
@page()
class LoginSuccessPage {
    render() {
        return <div>登录成功，欢迎您！</div>;
    }
}

export default LoginSuccessPage;

import {effect, autowired} from "coco-mvc";
import LoginApi from "@/api/login-api";
import LocalStorage from "@/component/local-storage";

@effect()
class LoginController {
  @autowired()
  loginApi: LoginApi;

  @autowired()
  localStorage: LocalStorage;

  async login() {
    try {
      // 处理多个服务层的逻辑
      const token = await this.loginApi.login();
      this.localStorage.set('token', token);
      return true;
    } catch (e) {
      return false
    }
  }
}

export default LoginController;
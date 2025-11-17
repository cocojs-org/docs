import {reactive, store} from '@cocojs/mvc'

@store()
class User {
    @reactive()
    name: string;
}

export default User
import { component } from 'coco-mvc';

@component()
class LocalStorage {
    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }
}

export default LocalStorage;

import Cookies from 'universal-cookie';

const cookie = new Cookies();

interface ICookiesService {
    setCookie(name: string, value: string, options: object): void;
    getCookie(name: string): string;
    removeCookie(name: string): void;
}

class CookiesService implements ICookiesService {
    setCookie(name: string, value: string, options: object) {
        cookie.set(name, value, options);
    }

    getCookie(name: string) {
        return cookie.get(name);
    }

    removeCookie(name: string) {
        cookie.remove(name);
    }
}

export default new CookiesService();
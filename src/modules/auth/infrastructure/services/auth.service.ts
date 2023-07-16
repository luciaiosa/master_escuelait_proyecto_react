import storageService from '@/shared/services/storage/storageService';
import users from './mockData/users.json';

export class AuthService {
    logIn(email: string, password: string): boolean{
        const user = users.find(user=> user.email === email && user.password === password);
        if (user){
            storageService.instance.saveSessionStorage("authUser",{id: user.id, email: user.email, favouriteSaveOnCloud: user.favouriteSaveOnCloud});
        }
        return user !== undefined;
    }

    logout(){
        storageService.instance.removeSessionStorage("authUser");
    }

    isLogged(){
        return sessionStorage.getItem("authUser") !== null;
    }

    userInfo() {
        const storageValue = sessionStorage.getItem("authUser");
        if(storageValue){
            return JSON.parse(storageValue);
        }
        return null;
    }

    userId() {
        const userInfo = this.userInfo();
        return userInfo ? userInfo.id : ''
    }
}

const instance = new AuthService();

export default { instance }
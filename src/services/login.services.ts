import http from "./http-common";
import IUserDataPost from "../@types/IUserDataPost.type";

class LoginDataService{

    getall(){
        return http.get<Array<IUserDataPost>>("/users")
    }

    create(data: IUserDataPost) {
        return http.post<IUserDataPost>("/users/create", data);
    }
}

export default new LoginDataService();
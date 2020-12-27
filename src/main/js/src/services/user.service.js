import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {

    getUserData() {
        return axios.get(API_URL + "profile", {headers: authHeader()})
    }

    updateUserData(username, email, password,name,surname,address,role) {
        return axios.put(API_URL + "profile/update", {
            username,
            email,
            password,
            name,
            surname,
            address,
            role
        });
    }

}

export default new UserService();
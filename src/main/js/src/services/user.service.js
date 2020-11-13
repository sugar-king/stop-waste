import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {

    getUserData() {
        return axios.get(API_URL + "profile", {headers: authHeader()})
    }

}

export default new UserService();
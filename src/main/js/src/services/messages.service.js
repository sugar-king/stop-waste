import axios from 'axios';
import authHeader from "./auth-header";
import AuthService from "./auth.service";



const API_URL = 'http://localhost:8080/api/messages/';

class MessagesService {

    getAllMessages() {
        return axios.get(API_URL + "all/" + AuthService.getCurrentUser().username, {headers: authHeader()})
    }


    /*
    newMessage(receiver, message) {
        return axios
            .post(API_URL +  "newMessage/" + AuthService.getCurrentUser().username, {
            receiver,
            message
        });
    }*/
}
export default new MessagesService();
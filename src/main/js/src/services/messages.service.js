import axios from 'axios';
import authHeader from "./auth-header";
import dateFormatter from "./date-formatter";


const API_URL = 'http://localhost:8080/api/messages/';

class MessagesService {

    getAllMessages() {
        return axios.get(API_URL + "all" , {headers: authHeader()});
    }

    getMessagesWithUser(user) {
        return axios.get(API_URL + user, {headers: authHeader()});
    }

    newMessage(receiver, message) {
        var inputDate = dateFormatter(new Date());
        return axios
            .post(API_URL + "newMessage", {
                    usernameReceiver: receiver.trim(),
                    text: message.trim(),
                    time: inputDate
                },
                {
                    headers: authHeader()
                }
            )
            ;
    }
}

export default new MessagesService();
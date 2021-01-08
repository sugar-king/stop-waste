import axios from 'axios';
import authHeader from "./auth-header";


const API_URL = 'http://localhost:8080/api/messages/';

class MessagesService {

    getAllMessages() {
        return axios.get(API_URL + "all" , {headers: authHeader()})
    }


    newMessage(receiver, message) {
        var dateVal = new Date();
        var day = dateVal.getDate().toString().padStart(2, "0");
        var month = (1 + dateVal.getMonth()).toString().padStart(2, "0");
        var hour = dateVal.getHours().toString().padStart(2, "0");
        var minute = dateVal.getMinutes().toString().padStart(2, "0");
        var inputDate = dateVal.getFullYear() + "-" + (month) + "-" + (day) + "T" + (hour) + ":" + (minute);
        return axios
            .post(API_URL + "newMessage", {
                    "usernameReceiver" : receiver,
                    "text": message,
                    "time": inputDate
                },
                {
                    headers: authHeader()
                }
            )
            ;
    }
}

export default new MessagesService();
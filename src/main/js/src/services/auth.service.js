import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username: username.trim(),
                password: password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    register(username, email, password, name, surname, address, role,categories) {


        var preferredCategories = [];
        for(var name of categories){
            preferredCategories.push({ categoryName: name});
        }
        console.log(preferredCategories);
        return axios.post(API_URL + "register", {
            username: username.trim(),
            email: email.trim(),
            password,
            name: name.trim(),
            surname: surname.trim(),
            address,
            role,
            preferredCategories
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    removeUser() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();
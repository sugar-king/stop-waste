import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }




  register(username, email, password,name,surname,address,role) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
      name,
      surname,
      address,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  removeUser() {
    console.log("Removing user...");
    localStorage.removeItem('user');
  }
}

export default new AuthService();
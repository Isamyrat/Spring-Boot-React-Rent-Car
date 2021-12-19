import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8081/rest/user";


class UserService{
    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId)
    }
    updateUser(user){
        return axios.put(USER_API_BASE_URL + '/updateUser', user);
    }
    getUserByRentalId(id){
        return axios.get(USER_API_BASE_URL + '/byRentalId/' + id)
    }
    getUserByRatingId(id){
        return axios.get(USER_API_BASE_URL + '/byRatingId/' + id)
    }
    sendEmail(name,email,message){
        return axios.post(USER_API_BASE_URL + '/addCar', name,email,message);
    }
   
}

export default new UserService()
import axios from "axios";

const USER_INFORMATION_API_BASE_URL = "http://localhost:8081/rest/user/information";

class UserInformationService{
    createUserInformation(userId,userInformation){
        return axios.post(USER_INFORMATION_API_BASE_URL + '/addUserInformation/' + userId, userInformation);
    }
    getUserInformationByUserId(userId){
        return axios.get(USER_INFORMATION_API_BASE_URL + '/' + userId)
    }
    getUserInformationByUserInformationId(id){
        return axios.get(USER_INFORMATION_API_BASE_URL + '/findUserInformation/' + id)
    }
    updateUserInformation(userInformation){
        return axios.put(USER_INFORMATION_API_BASE_URL + '/updateUserInformation', userInformation);
    }
}

export default new UserInformationService()
import axios from "axios";

const EMPLOYERS_API_BASE_URL = "http://localhost:8081/rest/user/employer";


class EmployeeService{
    createEmployee(employeeId,employee){
        return axios.post(EMPLOYERS_API_BASE_URL + '/addEmployee/' + employeeId, employee);
    }
    getEmployeeByUserId(employeeId){
        return axios.get(EMPLOYERS_API_BASE_URL + '/' + employeeId)
    }
    getEmployeeByEmployeeId(id){
        return axios.get(EMPLOYERS_API_BASE_URL + '/findEmployee/' + id)
    }
    updateEmployee(employee){
        return axios.put(EMPLOYERS_API_BASE_URL + '/updateEmployee', employee);
    }
}

export default new EmployeeService()
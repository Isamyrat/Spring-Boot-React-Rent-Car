import axios from "axios";

const CUSTOMERS_API_BASE_URL = "http://localhost:8081/rest/user/customer";

class CustomersService{
    createCustomers(customersId,customers){
        return axios.post(CUSTOMERS_API_BASE_URL + '/addCustomers/' + customersId, customers);
    }
    getCustomersByUserId(customersId){
        return axios.get(CUSTOMERS_API_BASE_URL + '/' + customersId)
    }
    getCustomersByCustomersId(id){
        return axios.get(CUSTOMERS_API_BASE_URL + '/findCustomers/' + id)
    }
    updateCustomers(customers){
        return axios.put(CUSTOMERS_API_BASE_URL + '/updateCustomers', customers);
    }
}

export default new CustomersService()
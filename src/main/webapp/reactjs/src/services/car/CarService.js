import axios from "axios";

const CAR_API_BASE_URL = "http://localhost:8081/rest/car";


class CarService{
    createCar(car){
        return axios.post(CAR_API_BASE_URL + '/addCar', car);
    }
    getCarById(carId){
        return axios.get(CAR_API_BASE_URL + '/' + carId)
    }
    updateCar(car){
        return axios.put(CAR_API_BASE_URL + '/updateCar', car);
    }
    getCarByRentalId(id){
        return axios.get(CAR_API_BASE_URL + '/byRentalId/' + id)
    }
    getCarByRatingId(id){
        return axios.get(CAR_API_BASE_URL + '/byRatingId/' + id)
    }
}

export default new CarService()
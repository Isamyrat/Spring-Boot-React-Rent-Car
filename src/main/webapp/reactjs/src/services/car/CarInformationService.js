import axios from "axios";

const CAR_INFORMATION_API_BASE_URL = "http://localhost:8081/rest/car/information";


class CarInformationService{
    createCarInformation(carId,carInformation){
        return axios.post(CAR_INFORMATION_API_BASE_URL + '/addCarInformation/' + carId, carInformation);
    }
    getCarInformationByCarId(carInformationId){
        return axios.get(CAR_INFORMATION_API_BASE_URL + '/' + carInformationId)
    }
    getCarInformationByCarInformationId(id){
        return axios.get(CAR_INFORMATION_API_BASE_URL + '/findCarInformation/' + id)
    }
    updateCarInformation(carInformation){
        return axios.put(CAR_INFORMATION_API_BASE_URL + '/updateCarInformation', carInformation);
    }
}

export default new CarInformationService()
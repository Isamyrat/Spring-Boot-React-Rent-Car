import axios from "axios";

const RENTAL_API_BASE_URL = "http://localhost:8081/rest/rental";

class RentalService{
    createRental(rental,idUser,carId){
        return axios.post(RENTAL_API_BASE_URL + '/addRental/' + idUser + '/' + carId, rental);
    }
    getRentalById(rentalId){
        return axios.get(RENTAL_API_BASE_URL + '/' + rentalId)
    }
    updateRentalStatus(rental){
        return axios.put(RENTAL_API_BASE_URL + '/updateRentalStatus', rental);
    }
    updateRentalFields(rental){
        return axios.put(RENTAL_API_BASE_URL + '/updateRentalFields', rental);
    }
    updateRentalCancellation(rentalId){
        return axios.put(RENTAL_API_BASE_URL + '/updateRentalStatusCancellation/' + rentalId);
    }
    updateRentalAccept(rentalId){
        return axios.put(RENTAL_API_BASE_URL + '/updateRentalStatusAccept/' + rentalId);
    }
    deleteRental(rentalId){
        return axios.delete(RENTAL_API_BASE_URL + '/deleteRental/' + rentalId);
    }
}
export default new RentalService()
import axios from 'axios';

const RATING_API_BASE_URL = 'http://localhost:8081/rest/ratings';

class RatingService {
    createRating(rating, idUser, carId) {
        return axios.post(
            RATING_API_BASE_URL + '/addRating/' + idUser + '/' + carId,
            rating
        );
    }
    getRatingById(ratingId) {
        return axios.get(RATING_API_BASE_URL + '/' + ratingId);
    }
    getRatingByUserAndCar(idUser, idCar) {
        return axios.get(
            RATING_API_BASE_URL +
                '/getRatingByCarAndByUser/' +
                idUser +
                '/' +
                idCar
        );
    }
    findAll(id) {
        return axios.get(RATING_API_BASE_URL + '/findAllRatingByUser/' + id);
    }
    updateRating(rating) {
        return axios.put(RATING_API_BASE_URL + '/updateRating', rating);
    }

    deleteRating(ratingId) {
        return axios.delete(RATING_API_BASE_URL + '/deleteRating/' + ratingId);
    }
}
export default new RatingService();

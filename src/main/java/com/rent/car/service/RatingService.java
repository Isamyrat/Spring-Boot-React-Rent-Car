package com.rent.car.service;

import com.rent.car.exception.ResourceNotFoundException;
import com.rent.car.model.Car;
import com.rent.car.model.Rating;
import com.rent.car.model.User;
import com.rent.car.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CarService carService;

    public Rating saveRating(Rating rating, Long idUser, Long idCar) {
        User user = userService.findByIdUsers(idUser);
        Car car = carService.findByCarId(idCar);
        Rating rating1 = ratingRepository.findByUserRatingAndCarRating(user,car);
        if(rating1 != null){
            return rating1;
        }
        rating.setUserRating(user);
        rating.setCarRating(car);

        return ratingRepository.save(rating);
    }
    public ResponseEntity<Rating> findRatingByUserAndByCar(Long idUser, Long idCar) {

        User user = userService.findByIdUsers(idUser);
        Car car = carService.findByCarId(idCar);
        Rating rating1 = ratingRepository.findByUserRatingAndCarRating(user,car);
        System.out.println(rating1.getId());
        return ResponseEntity.ok(rating1);
    }

    public Page<Rating> findAllByUserId(Long id, Pageable pageable) {
        User user = userService.findByIdUsers(id);
        return ratingRepository.findByUserRating(user, pageable);
    }
    public List<Rating> findAllByUserId(Long id) {
        User user = userService.findByIdUsers(id);
        System.out.println(ratingRepository.findByUserRating(user));
        return ratingRepository.findByUserRating(user);
    }
    public Page<Rating> findAllByCarId(Long id, Pageable pageable) {
        Car car = carService.findByCarId(id);
        return ratingRepository.findByCarRating(car, pageable);
    }
    public Page<Rating> findAll(Pageable pageable) {
        return ratingRepository.findAll( pageable);
    }

    public Rating findByIdRating(Long id) {
        return ratingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not exist with id:" + id));
    }

    public ResponseEntity<Rating> findById(Long id) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not exist with id:" + id));
        return ResponseEntity.ok(rating);
    }

    public Rating updateRating(Rating rating1) {
        Rating rating = findByIdRating(rating1.getId());
        rating1.setCarRating(rating.getCarRating());
        rating1.setUserRating(rating.getUserRating());

        return ratingRepository.save(rating1);
    }

    public ResponseEntity<Map<String, Boolean>> deleteRating(Long id) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not exist with id:" + id));

        ratingRepository.delete(rating);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

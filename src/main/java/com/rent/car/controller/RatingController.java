package com.rent.car.controller;

import com.rent.car.model.Rating;
import com.rent.car.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;


    @GetMapping("/getAllRatingByCar")
    public ResponseEntity<Page<Rating>> getAllRatingByCarId(Long id, int pageNumber, int pageSize) {
        return new ResponseEntity<>(ratingService.findAllByCarId(id,
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<Rating>> getAll( int pageNumber, int pageSize) {
        return new ResponseEntity<>(ratingService.findAll(
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }

    @GetMapping("/getAllRatingByUser")
    public ResponseEntity<Page<Rating>> getAllRatingByUserId(Long id, int pageNumber, int pageSize) {
        return new ResponseEntity<>(ratingService.findAllByUserId(id,
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }
    @GetMapping("/findAllRatingByUser/{id}")
    public ResponseEntity<List<Rating>> getAllRatingByUserId(@PathVariable Long id) {
        return new ResponseEntity<>(ratingService.findAllByUserId(id), HttpStatus.OK);
    }


    @PostMapping("/addRating/{idUser}/{carId}")
    public Rating createRating(@RequestBody Rating rating , @PathVariable Long idUser , @PathVariable Long carId) {

        return ratingService.saveRating(rating, idUser, carId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rating> getRatingById(@PathVariable Long id) {
        return ratingService.findById(id);
    }

    @PutMapping("/updateRating")
    public ResponseEntity<Rating> updateRentalStatus(@RequestBody Rating rating) {
        return ResponseEntity.ok(ratingService.updateRating(rating));
    }


    @GetMapping("/getRatingByCarAndByUser/{idUser}/{idCar}}")
    public ResponseEntity<Rating> getRatingByCarAndByUser(@PathVariable Long idUser,@PathVariable Long idCar) {
        System.out.println(idCar + ' ' + idUser);
        return ratingService.findRatingByUserAndByCar(idUser,idCar);
    }
    @DeleteMapping("/deleteRating/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCar(@PathVariable Long id) {
        return ratingService.deleteRating(id);
    }

}

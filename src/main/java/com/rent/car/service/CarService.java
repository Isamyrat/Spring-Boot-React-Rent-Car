package com.rent.car.service;

import com.rent.car.exception.ResourceNotFoundException;
import com.rent.car.model.Car;
import com.rent.car.model.Rating;
import com.rent.car.model.Rental;
import com.rent.car.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RentalService rentalService;

    @Autowired
    private RatingService ratingService;

    public Car findByCarId(Long id){

        return carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id:" + id));
    }

    public void saveCarImage(MultipartFile file, Long id) throws IOException {
        Car car = findByCarId(id);
        car.setImage(file.getBytes());
        carRepository.save(car);
    }

    public Car save(Car car) {
        return carRepository.save(car);
    }
    public ResponseEntity<Car> findById(Long id){
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id:" + id));
        return ResponseEntity.ok(car);
    }
    public Page<Car> findAll(Pageable pageable){
        return carRepository.findAll(pageable);
    }
    public Page<Car> findAll(Pageable pageable, String searchText) {
        return carRepository.findAllCar(pageable, searchText);
    }
    public Car updateCar(Car car){

        Car car1 = findByCarId(car.getId());
        car.setImage(car1.getImage());
        return carRepository.save(car);
    }
    public ResponseEntity<Car> findByRentalId(Long id){
        Rental rental = rentalService.findByIdRental(id);
        Car car = carRepository.findById(rental.getCarRental().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id:" + id));
        return ResponseEntity.ok(car);
    }
    public ResponseEntity<Car> findByRatingId(Long id){
        Rating rating = ratingService.findByIdRating(id);

        Car car = carRepository.findById(rating.getCarRating().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id:" + id));
        return ResponseEntity.ok(car);
    }
/*
    public ResponseEntity<Map<String, Boolean>> deleteCar(Long id){
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id:" + id));
        carInformationService.deleteCarInformation(car.getId());
        carRepository.delete(car);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }*/
}

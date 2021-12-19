package com.rent.car.controller;

import com.rent.car.model.Car;
import com.rent.car.model.utils.Type;
import com.rent.car.model.utils.Class;
import com.rent.car.service.CarService;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/car")
public class CarController {

    @Autowired
    private CarService carService;


    @PostMapping("/{id}/car/image")
    public void uploadCarImage(@NotNull @RequestParam("file") MultipartFile multipartFile, @PathVariable Long id) throws IOException {
        carService.saveCarImage(multipartFile, id);
    }

    @GetMapping("/type")
    public ResponseEntity<Set<String>> findAllTypeOfCar() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList(Type.SMALL.toString(), Type.MEDIUM.toString(),Type.LARGE.toString(),Type.PREMIUM.toString(), Type.SUVS.toString())), HttpStatus.OK);
    }
    @GetMapping("/class")
    public ResponseEntity<Set<String>> findAllClassOfCar() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList(Class.MINI.toString(), Class.COMPACT.toString(),Class.ECONOMY.toString(),Class.SUV.toString(),Class.STANDARD.toString(),Class.INTERMEDIATE.toString(),Class.PREMIUM.toString(),Class.SPECIAL.toString(),Class.LUXURY.toString())), HttpStatus.OK);
    }
    @GetMapping("/getAllCars")
    public ResponseEntity<Page<Car>> getAll(int pageNumber, int pageSize) {
        return new ResponseEntity<>(carService.findAll(
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }
    @GetMapping("/search/{searchText}")
    public ResponseEntity<Page<Car>> findAll(Pageable pageable, @PathVariable String searchText) {
        return new ResponseEntity<>(carService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @PostMapping("/addCar")
    public Car createCar(@RequestBody Car car) {
        return carService.save(car);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        return carService.findById(id);
    }
    @PutMapping("/updateCar")
    public ResponseEntity<Car> updateUser(@RequestBody Car car) {
        return ResponseEntity.ok(carService.updateCar(car));
    }
    @GetMapping("/byRentalId/{id}")
    public ResponseEntity<Car> getCarByRentalId(@PathVariable Long id) {
        return carService.findByRentalId(id);
    }
    @GetMapping("/byRatingId/{id}")
    public ResponseEntity<Car> getCarByRatingId(@PathVariable Long id) {
        return carService.findByRatingId(id);
    }


}

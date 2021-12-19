package com.rent.car.controller;


import com.rent.car.model.CarInformation;
import com.rent.car.model.utils.Color;
import com.rent.car.service.CarInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/car/information")
public class CarInformationController {

    @Autowired
    private CarInformationService carInformationService;

    @GetMapping("/{id}")
    public ResponseEntity<CarInformation> getCarInformationByCarId(@PathVariable Long id) {
        return carInformationService.findCarInformationByCarId(id);
    }
    @PostMapping("/addCarInformation/{id}")
    public CarInformation createCarInformation(@RequestBody CarInformation carInformation, @PathVariable Long id){
        System.out.println(id);
        return carInformationService.saveCarInformation(carInformation,id);
    }
    @PutMapping("/updateCarInformation")
    public ResponseEntity<CarInformation> updateCarInformation(@RequestBody CarInformation carInformation) {
        return ResponseEntity.ok(carInformationService.updateCarInformation(carInformation));
    }
    @GetMapping("/findCarInformation/{id}")
    public ResponseEntity<CarInformation> getCarInformationById(@PathVariable Long id) {
        return carInformationService.findCarInformationByCarInformationId(id);
    }

    @GetMapping("/colors")
    public ResponseEntity<Set<String>> findAllColorsCar() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList(Color.BLUE.toString(), Color.RED.toString(),Color.PURPLE.toString(),Color.YELLOW.toString(),Color.PINK.toString(),Color.GREEN.toString(),Color.GRAY.toString(),Color.WHITE.toString(),Color.BLACK.toString(),Color.BROWN.toString(),Color.OLIVE.toString(),Color.MAROON.toString(),Color.ORANGE.toString())), HttpStatus.OK);
    }
}

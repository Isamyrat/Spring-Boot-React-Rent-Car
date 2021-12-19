package com.rent.car.service;

import com.rent.car.exception.ResourceNotFoundException;
import com.rent.car.model.Car;
import com.rent.car.model.CarInformation;
import com.rent.car.repository.CarInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CarInformationService {

    @Autowired
    private CarInformationRepository carInformationRepository;

    @Autowired
    private CarService carService;

    public CarInformation getCarInformationByCarId(Long id){

        return carInformationRepository.findByCarId(carService.findByCarId(id));
    }
    public CarInformation saveCarInformation(CarInformation carInformation, Long id) {
        Car car = carService.findByCarId(id);
        if(getCarInformationByCarId(car.getId()) != null){
            return carInformation;
        }
        carInformation.setCarId(car);
        return carInformationRepository.save(carInformation);
    }
    public ResponseEntity<CarInformation> findCarInformationByCarId(Long id){
        CarInformation carInformation = carInformationRepository.findByCarId(carService.findByCarId(id));
        return ResponseEntity.ok(carInformation);
    }
    public ResponseEntity<CarInformation> findCarInformationByCarInformationId(Long id){
        CarInformation carInformation = carInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CarInformation not exist with id:" + id));
        return ResponseEntity.ok(carInformation);
    }
    public CarInformation findByIdCarInformation(Long id){
        return carInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CarInformation not exist with id:" + id));
    }
    public CarInformation updateCarInformation(CarInformation carInformation){
        CarInformation carInformation1 = findByIdCarInformation(carInformation.getId());
        carInformation.setCarId(carInformation1.getCarId());
        return carInformationRepository.save(carInformation);
    }
    public void deleteCarInformation(Long id){
        CarInformation carInformation = carInformationRepository.findByCarId(carService.findByCarId(id));

        if(carInformation == null){
            return;
        }

        carInformationRepository.delete(carInformation);
    }

}

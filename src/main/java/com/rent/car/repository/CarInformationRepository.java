package com.rent.car.repository;

import com.rent.car.model.Car;
import com.rent.car.model.CarInformation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarInformationRepository extends CrudRepository<CarInformation, Long> {
    CarInformation findByCarId(Car car);
}

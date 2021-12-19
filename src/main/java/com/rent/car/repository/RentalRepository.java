package com.rent.car.repository;

import com.rent.car.model.Car;
import com.rent.car.model.Rental;
import com.rent.car.model.User;
import com.rent.car.model.utils.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends CrudRepository<Rental, Long> {

    Page<Rental> findByCarRental(Car car, Pageable pageable);

    Page<Rental> findByUserRental(User user, Pageable pageable);

    Page<Rental> findByUserRentalAndCarRental(User user, Car car, Pageable pageable);

    Page<Rental> findAll(Pageable pageable);

    Page<Rental> findAllByStatus(Status status, Pageable pageable);

    List<Rental> findByUserRental(User user);
}

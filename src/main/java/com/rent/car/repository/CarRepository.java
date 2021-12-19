package com.rent.car.repository;

import com.rent.car.model.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends CrudRepository<Car, Long> {

    Page<Car> findAll(Pageable pageable);

    @Query("FROM Car c WHERE c.brand LIKE %:searchText% OR c.model LIKE %:searchText%")
    Page<Car> findAllCar(Pageable pageable, @Param("searchText") String searchText);
}

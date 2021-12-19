package com.rent.car.repository;

import com.rent.car.model.Car;
import com.rent.car.model.Rating;
import com.rent.car.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends CrudRepository<Rating, Long> {

    Page<Rating> findByCarRating(Car car, Pageable pageable);

    Page<Rating> findByUserRating(User user, Pageable pageable);

    Page<Rating> findAll( Pageable pageable);

    Rating findByUserRatingAndCarRating(User user, Car car);

    List<Rating> findByUserRating(User user);

}

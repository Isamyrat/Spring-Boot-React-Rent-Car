package com.rent.car.repository;

import com.rent.car.model.User;
import com.rent.car.model.UserInformation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInformationRepository extends CrudRepository<UserInformation, Long> {
    UserInformation findByUserId(User userId);
}

package com.rent.car.repository;

import com.rent.car.model.Customers;
import com.rent.car.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomersRepository extends CrudRepository<Customers, Long> {

    Customers findByUserCustomers(User user);
}

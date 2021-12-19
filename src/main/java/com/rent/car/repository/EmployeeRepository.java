package com.rent.car.repository;

import com.rent.car.model.Employee;
import com.rent.car.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    Employee findByUserEmployee(User user);
}

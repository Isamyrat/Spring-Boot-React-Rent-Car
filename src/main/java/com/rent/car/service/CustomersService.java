package com.rent.car.service;

import com.rent.car.exception.ResourceNotFoundException;
import com.rent.car.model.Customers;
import com.rent.car.model.User;
import com.rent.car.repository.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class CustomersService {
    @Autowired
    private CustomersRepository customersRepository;

    @Autowired
    private UserServiceImpl userService;

    public Customers findByCustomersId(Long id){

        return customersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customers not exist with id:" + id));
    }

    public void saveDriverLicenseImage(MultipartFile file, Long id) throws IOException {
        Customers customers = findByCustomersId(id);
        customers.setDriverLicenseImage(file.getBytes());
        customersRepository.save(customers);
    }
    public Customers saveCustomers(Customers customers, Long id) {
        User user = userService.findByIdUsers(id);
        if(findByIdCustomers(user.getId()) != null){
            return customers;
        }
        customers.setUserCustomers(user);
        return customersRepository.save(customers);
    }

    public ResponseEntity<Customers> findCustomersByUserId(Long id){
        Customers customers = customersRepository.findByUserCustomers(userService.findByIdUsers(id));
        return ResponseEntity.ok(customers);
    }
    public ResponseEntity<Customers> findCustomersByCustomersId(Long id){
        Customers customers = customersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customers not exist with id:" + id));
        return ResponseEntity.ok(customers);
    }
    public Customers updateCustomers(Customers customers){
        Customers customers1 = findByCustomersId(customers.getId());
        customers.setDriverLicenseImage(customers1.getDriverLicenseImage());

        customers.setUserCustomers(customers1.getUserCustomers());
        return customersRepository.save(customers);
    }
    public void deleteCustomers(Long id){
        Customers customers = customersRepository.findByUserCustomers(userService.findByIdUsers(id));

        if(customers == null){
            return;
        }

        customersRepository.delete(customers);
    }
    public Customers findByIdCustomers(Long id){
        return customersRepository.findByUserCustomers(userService.findByIdUsers(id));
    }

}

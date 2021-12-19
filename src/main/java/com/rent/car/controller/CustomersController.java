package com.rent.car.controller;

import com.rent.car.model.Customers;
import com.rent.car.service.CustomersService;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user/customer")
public class CustomersController {
    @Autowired
    private CustomersService customersService;

    @PostMapping("/{id}/files/driver/license/image")
    public void uploadDriverLicenseImage(@NotNull @RequestParam("file") MultipartFile multipartFile, @PathVariable Long id) throws IOException {
        customersService.saveDriverLicenseImage(multipartFile, id);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Customers> getCustomersByUserId(@PathVariable Long id) {
        return customersService.findCustomersByUserId(id);
    }
    @PostMapping("/addCustomers/{id}")
    public Customers createCustomers(@RequestBody Customers customers, @PathVariable Long id) {
        return customersService.saveCustomers(customers,id);
    }
    @PutMapping("/updateCustomers")
    public ResponseEntity<Customers> updateCustomers(@RequestBody Customers customers) {
        return ResponseEntity.ok(customersService.updateCustomers(customers));
    }
    @GetMapping("/findCustomers/{id}")
    public ResponseEntity<Customers> getCustomersById(@PathVariable Long id) {
        return customersService.findCustomersByCustomersId(id);
    }
}

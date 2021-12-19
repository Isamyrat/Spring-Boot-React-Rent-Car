package com.rent.car.controller;

import com.rent.car.model.Employee;
import com.rent.car.service.EmployeeService;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user/employer")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/{emloyeeId}/diploma/image")
    public void uploadDiplomaImage(@NotNull @RequestParam("file") MultipartFile multipartFile, @PathVariable Long emloyeeId) throws IOException {
        employeeService.saveDiplomaImage(multipartFile, emloyeeId);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getCustomersByUserId(@PathVariable Long id) {
        return employeeService.findEmployeeByUserId(id);
    }
    @PostMapping("/addEmployee/{id}")
    public Employee createCustomers(@RequestBody Employee employee, @PathVariable Long id) {
        return employeeService.saveEmployee(employee,id);
    }
    @PutMapping("/updateEmployee")
    public ResponseEntity<Employee> updateCustomers(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.updateEmployee(employee));
    }
    @GetMapping("/findEmployee/{id}")
    public ResponseEntity<Employee> getCustomersById(@PathVariable Long id) {
        return employeeService.findEmployeeByEmployeeId(id);
    }
}

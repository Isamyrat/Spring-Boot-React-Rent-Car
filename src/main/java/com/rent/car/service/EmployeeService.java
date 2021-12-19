package com.rent.car.service;

import com.rent.car.exception.ResourceNotFoundException;
import com.rent.car.model.Employee;
import com.rent.car.model.User;
import com.rent.car.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@Service
public class EmployeeService {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee findByEmployeeId(Long id){

        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
    }
    public void saveDiplomaImage(MultipartFile file, Long id) throws IOException {
        Employee employee = findByEmployeeId(id);
        employee.setDiplomaImage(file.getBytes());
        employeeRepository.save(employee);
    }
    public Employee saveEmployee(Employee employee, Long id) {
        User user = userService.findByIdUsers(id);
        if(findByIdEmployee(user.getId()) != null){
            return employee;
        }
        employee.setUserEmployee(user);
        employee.setTakeToWork(LocalDate.now());
        return employeeRepository.save(employee);
    }
    public ResponseEntity<Employee> findEmployeeByUserId(Long id){
        Employee employee = employeeRepository.findByUserEmployee(userService.findByIdUsers(id));
        return ResponseEntity.ok(employee);
    }
    public ResponseEntity<Employee> findEmployeeByEmployeeId(Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
        return ResponseEntity.ok(employee);
    }
    public Employee updateEmployee(Employee employee){
        Employee employee1 = findByEmployeeId(employee.getId());
        employee.setDiplomaImage(employee1.getDiplomaImage());
        employee.setTakeToWork(employee1.getTakeToWork());
        employee.setUserEmployee(employee1.getUserEmployee());
        return employeeRepository.save(employee);
    }
    public void deleteEmployee(Long id){
        Employee employee = employeeRepository.findByUserEmployee(userService.findByIdUsers(id));

        if(employee == null){
            return;
        }

        employeeRepository.delete(employee);
    }
    public Employee findByIdEmployee(Long id){
        return employeeRepository.findByUserEmployee(userService.findByIdUsers(id));
    }
}

package com.rent.car.controller;

import com.rent.car.model.Rental;
import com.rent.car.model.utils.Status;
import com.rent.car.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rental")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @GetMapping("/getAllRentalByCar")
    public ResponseEntity<Page<Rental>> getAllRentalByCarId(Long id, int pageNumber, int pageSize) {
        return new ResponseEntity<>(rentalService.findAllByCarId(id,
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }
    @GetMapping("/getAllRentalByCarAndByUser")
    public ResponseEntity<Page<Rental>> getAllRentalByCarId(Long idUser,Long carId, int pageNumber, int pageSize) {
        return new ResponseEntity<>(rentalService.findRentalByUserAndByCar(idUser,carId,
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }

    @GetMapping("/getAllRentalByUserId")
    public ResponseEntity<Page<Rental>> findAllRentalByUserId(Long id, int pageNumber, int pageSize) {
        return new ResponseEntity<>(rentalService.findAllByUserId(id,
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }

    @GetMapping("/findAllRentalByUser/{id}")
    public ResponseEntity<List<Rental>> getAllRentalByUserId(@PathVariable Long id) {
        return new ResponseEntity<>(rentalService.findAllByUserId(id), HttpStatus.OK);
    }

    @GetMapping("/getAllRentals")
    public ResponseEntity<Page<Rental>> getAllRental(int pageNumber, int pageSize) {
        return new ResponseEntity<>(rentalService.findAllRentals(
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }
    @GetMapping("/getAllRentalOnWait")
    public ResponseEntity<Page<Rental>> getAllRentalOnWait(int pageNumber, int pageSize) {
        return new ResponseEntity<>(rentalService.findAllRentalsOnWait(
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }
    @GetMapping("/getAllRentalOnBooking")
    public ResponseEntity<Page<Rental>> getAllRentalOnBooking(int pageNumber, int pageSize) {
        return new ResponseEntity<>(rentalService.findAllRentalsOnBooking(
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }

    @PostMapping("/addRental/{idUser}/{carId}")
    public Rental createRental(@RequestBody Rental rental,@PathVariable Long idUser , @PathVariable Long carId) {
        return rentalService.saveRental(rental, idUser, carId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Long id) {
        return rentalService.findById(id);
    }

    @PutMapping("/updateRentalStatus")
    public ResponseEntity<Rental> updateRentalStatus(@RequestBody Rental rental) {
        return ResponseEntity.ok(rentalService.updateRentalByStatus(rental));
    }
    @PutMapping("/updateRentalStatusCancellation/{id}")
    public ResponseEntity<Rental> updateRentalStatusCancellation(@PathVariable Long id) {
        return ResponseEntity.ok(rentalService.updateRentalByStatusCancellation(id));
    }
    @PutMapping("/updateRentalStatusAccept/{id}")
    public ResponseEntity<Rental> updateRentalStatusAccept(@PathVariable Long id) {
        return ResponseEntity.ok(rentalService.updateRentalByStatusAccept(id));
    }
    @PutMapping("/updateRentalFields")
    public ResponseEntity<Rental> updateRentalFields(@RequestBody Rental rental) {
        return ResponseEntity.ok(rentalService.updateRentalByFields(rental));
    }
    @DeleteMapping("/deleteRental/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteRental(@PathVariable Long id) {
        return rentalService.deleteRental(id);
    }
    @GetMapping("/status")
    public  ResponseEntity<Set<String>> findAllStatuses() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList(Status.BOOKING.toString(), Status.ACCEPT.toString(),Status.ON_RENTAl.toString(), Status.ON_WAIT.toString())), HttpStatus.OK);
    }

}

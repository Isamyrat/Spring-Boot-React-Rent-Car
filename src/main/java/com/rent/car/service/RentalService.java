package com.rent.car.service;

import com.rent.car.exception.ResourceNotFoundException;
import com.rent.car.model.Car;
import com.rent.car.model.Rental;
import com.rent.car.model.User;
import com.rent.car.model.utils.Status;
import com.rent.car.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private CarService carService;


    @Autowired
    private SendEmailService sendEmailService;


    public Rental saveRental(Rental rental, Long idUser, Long idCar) {
        User user = userService.findByIdUsers(idUser);
        Car car = carService.findByCarId(idCar);
        rental.setUserRental(user);
        rental.setCarRental(car);
        rental.setStatus(Status.ON_WAIT);
        rental.setPrice(car.getPrice() * rental.getCountOfDays());
        return rentalRepository.save(rental);
    }

    public Page<Rental> findAllByUserId(Long id, Pageable pageable){
        User user = userService.findByIdUsers(id);
        return rentalRepository.findByUserRental(user, pageable);
    }
    public Page<Rental> findAllByCarId(Long id, Pageable pageable){
        Car car = carService.findByCarId(id);
        return rentalRepository.findByCarRental(car, pageable);
    }
    public Page<Rental> findAllRentals(Pageable pageable){
        return rentalRepository.findAll(pageable);
    }
    public Page<Rental> findAllRentalsOnWait(Pageable pageable){
        return rentalRepository.findAllByStatus(Status.ON_WAIT,pageable);
    }
    public Page<Rental> findAllRentalsOnBooking(Pageable pageable){
        return rentalRepository.findAllByStatus(Status.BOOKING,pageable);
    }
    public Rental findByIdRental(Long id){
        return rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not exist with id:" + id));
    }
    public ResponseEntity<Rental> findById(Long id){
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not exist with id:" + id));
        return ResponseEntity.ok(rental);
    }
    public Rental updateRentalByStatus(Rental rental1){
        Rental rental = findByIdRental(rental1.getId());
        rental1.setCarRental(rental.getCarRental());
        rental1.setUserRental(rental.getUserRental());
        rental1.setPrice(rental.getPrice());
        rental1.setStartDate(rental.getStartDate());
        rental1.setCountOfDays(rental.getCountOfDays());
        return rentalRepository.save(rental1);
    }
    public Rental updateRentalByStatusCancellation(Long id){

        Rental rental = findByIdRental(id);

        rental.setStatus(Status.CANCELLATION);
        sendEmailService.sendAcceptOrDeniedMail(rental.getUserRental(),rental);

        return rentalRepository.save(rental);
    }

    public Rental updateRentalByStatusAccept(Long id){

        Rental rental = findByIdRental(id);
        rental.setStatus(Status.BOOKING);
        sendEmailService.sendAcceptOrDeniedMail(rental.getUserRental(),rental);

        return rentalRepository.save(rental);
    }
    public Rental updateRentalByFields(Rental rental1){

        Rental rental = findByIdRental(rental1.getId());

        Car car = carService.findByCarId(rental.getCarRental().getId());
        rental1.setCarRental(rental.getCarRental());
        rental1.setUserRental(rental.getUserRental());
        rental1.setPrice(rental1.getCountOfDays() * car.getPrice());
        rental1.setStatus(rental.getStatus());
        return rentalRepository.save(rental1);
    }
    public ResponseEntity<Map<String, Boolean>> deleteRental(Long id){
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not exist with id:" + id));

        rentalRepository.delete(rental);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    public List<Rental> findAllByUserId(Long id) {
        User user = userService.findByIdUsers(id);
        return rentalRepository.findByUserRental(user);
    }
    public Page<Rental> findRentalByUserAndByCar(Long idUser, Long idCar,Pageable pageable) {

        User user = userService.findByIdUsers(idUser);
        Car car = carService.findByCarId(idCar);

        return rentalRepository.findByUserRentalAndCarRental(user,car, pageable);
    }
}

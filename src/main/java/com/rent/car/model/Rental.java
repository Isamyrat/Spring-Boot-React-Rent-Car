package com.rent.car.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rent.car.model.utils.Status;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "rental")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "price")
    private double price;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "count_of_days")
    private short countOfDays;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User userRental;

    @ManyToOne
    @JoinColumn(name = "car_id")
    @JsonIgnore
    private Car carRental;


    public Rental() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public short getCountOfDays() {
        return countOfDays;
    }

    public void setCountOfDays(short countOfDays) {
        this.countOfDays = countOfDays;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUserRental() {
        return userRental;
    }

    public void setUserRental(User userRental) {
        this.userRental = userRental;
    }

    public Car getCarRental() {
        return carRental;
    }

    public void setCarRental(Car carRental) {
        this.carRental = carRental;
    }
}

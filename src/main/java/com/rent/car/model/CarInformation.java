package com.rent.car.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rent.car.model.utils.Color;

import javax.persistence.*;

@Entity
@Table(name = "car_information")
public class CarInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "color")
    private Color color;

    @Column(name = "mileage")
    private long mileage;

    @Column(name = "condition")
    private String condition;

    @Column(name = "number_of_car")
    private String carNumber;

    @Column(name = "year")
    private short year;

    @OneToOne
    @JoinColumn(name = "car_id")
    @JsonIgnore
    private Car carId;

    public CarInformation() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public long getMileage() {
        return mileage;
    }

    public void setMileage(long mileage) {
        this.mileage = mileage;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public short getYear() {
        return year;
    }

    public void setYear(short year) {
        this.year = year;
    }

    public Car getCarId() {
        return carId;
    }

    public void setCarId(Car carId) {
        this.carId = carId;
    }
}

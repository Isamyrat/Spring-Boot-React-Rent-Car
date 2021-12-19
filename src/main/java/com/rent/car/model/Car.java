package com.rent.car.model;

import com.rent.car.model.utils.Type;
import com.rent.car.model.utils.Class;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name = "class")
    private Class classOfCar;

    @Column(name = "count")
    private int count;

    @Column(name = "price_one_day")
    private float price;

    @Column(name = "doors")
    private byte doors;

    @Column(name = "count_passengers")
    private byte passengers;

    @Column(name = "transmission")
    private String transmission;

    @Lob
    @Column(columnDefinition = "BLOB", name = "image")
    private  byte[] image;

    @OneToOne(mappedBy = "carId")
    private CarInformation carInformation;

    @OneToMany(mappedBy = "carRating")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Rating> ratingCar;

    public Car() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }


    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Class getClassOfCar() {
        return classOfCar;
    }

    public void setClassOfCar(Class classOfCar) {
        this.classOfCar = classOfCar;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public byte getDoors() {
        return doors;
    }

    public void setDoors(byte doors) {
        this.doors = doors;
    }

    public byte getPassengers() {
        return passengers;
    }

    public void setPassengers(byte passengers) {
        this.passengers = passengers;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public CarInformation getCarInformation() {
        return carInformation;
    }

    public void setCarInformation(CarInformation carInformation) {
        this.carInformation = carInformation;
    }

    public List<Rating> getRatingCar() {
        return ratingCar;
    }

    public void setRatingCar(List<Rating> ratingCar) {
        this.ratingCar = ratingCar;
    }
}
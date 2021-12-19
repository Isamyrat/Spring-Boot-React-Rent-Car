package com.rent.car.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "customers")
public class Customers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Lob
    @Column(columnDefinition = "BLOB", name = "driver_license_image")
    private  byte[] driverLicenseImage;

    @Column(name = "driver_license_number")
    private String driverLicenseNumber;

    @Column(name = "driving_experience")
    private short drivingExperience;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User userCustomers;

    public Customers() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public byte[] getDriverLicenseImage() {
        return driverLicenseImage;
    }

    public void setDriverLicenseImage(byte[] driverLicenseImage) {
        this.driverLicenseImage = driverLicenseImage;
    }

    public String getDriverLicenseNumber() {
        return driverLicenseNumber;
    }

    public void setDriverLicenseNumber(String driverLicenseNumber) {
        this.driverLicenseNumber = driverLicenseNumber;
    }

    public short getDrivingExperience() {
        return drivingExperience;
    }

    public void setDrivingExperience(short drivingExperience) {
        this.drivingExperience = drivingExperience;
    }

    public User getUserCustomers() {
        return userCustomers;
    }

    public void setUserCustomers(User userCustomers) {
        this.userCustomers = userCustomers;
    }
}

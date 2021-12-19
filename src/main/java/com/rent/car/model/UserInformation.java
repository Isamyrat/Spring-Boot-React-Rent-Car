package com.rent.car.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rent.car.model.utils.Genre;

import javax.persistence.*;

@Entity
@Table(name = "user_information")
public class UserInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "genre")
    private Genre genre;

    @Column(name = "age")
    private short age;

    @Column(name = "passport_number")
    private String passportNumber;

    @Lob
    @Column(columnDefinition = "BLOB", name = "passport_image")
    private byte[] passportImage;

    @Lob
    @Column(columnDefinition = "BLOB", name = "account_image")
    private byte[] accountImage;


    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User userId;

    public UserInformation() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public short getAge() {
        return age;
    }

    public void setAge(short age) {
        this.age = age;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public byte[] getPassportImage() {
        return passportImage;
    }

    public void setPassportImage(byte[] passportImage) {
        this.passportImage = passportImage;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public void setAccountImage(byte[] accountImage) {
        this.accountImage = accountImage;
    }

    public byte[] getAccountImage() {
        return accountImage;
    }



}
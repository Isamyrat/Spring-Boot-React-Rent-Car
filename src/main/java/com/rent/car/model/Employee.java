package com.rent.car.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "position")
    private String position;

    @Column(name = "education")
    private String education;

    @Column(name = "create_at_work")
    private LocalDate takeToWork;

    @Lob
    @Column(columnDefinition = "BLOB", name = "diploma_image")
    private  byte[] diplomaImage;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User userEmployee;

    public Employee() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public LocalDate getTakeToWork() {
        return takeToWork;
    }

    public void setTakeToWork(LocalDate takeToWork) {
        this.takeToWork = takeToWork;
    }

    public User getUserEmployee() {
        return userEmployee;
    }

    public void setUserEmployee(User userEmployee) {
        this.userEmployee = userEmployee;
    }

    public byte[] getDiplomaImage() {
        return diplomaImage;
    }

    public void setDiplomaImage(byte[] diplomaImage) {
        this.diplomaImage = diplomaImage;
    }

}

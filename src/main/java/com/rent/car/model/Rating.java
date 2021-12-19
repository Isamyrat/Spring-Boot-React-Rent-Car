package com.rent.car.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "rating_number")
    private byte ratingNumber;

    @Column(name = "rating_text")
    private String ratingText;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User userRating;

    @ManyToOne
    @JoinColumn(name = "CAR_ID")
    @JsonIgnore
    private Car carRating;


    public Rating() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public byte getRatingNumber() {
        return ratingNumber;
    }

    public void setRatingNumber(byte ratingNumber) {
        this.ratingNumber = ratingNumber;
    }

    public String getRatingText() {
        return ratingText;
    }

    public void setRatingText(String ratingText) {
        this.ratingText = ratingText;
    }

    public Car getCarRating() {
        return carRating;
    }

    public void setCarRating(Car carRating) {
        this.carRating = carRating;
    }

    public User getUserRating() {
        return userRating;
    }

    public void setUserRating(User userRating) {
        this.userRating = userRating;
    }
}

package com.rent.car.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String surname;
    @Column(nullable = false)
    private String password;
    @Column(name = "create_at")
    private LocalDate createAt;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne(mappedBy = "userId")
    private UserInformation userInformation;

    @OneToOne(mappedBy = "userCustomers")
    private Customers userCustomers;

    @OneToOne(mappedBy = "userEmployee")
    private Employee userEmployee;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }


    public UserInformation getUserInformation() {
        return userInformation;
    }

    public void setUserInformation(UserInformation userInformation) {
        this.userInformation = userInformation;
    }

    public Customers getUserCustomers() {
        return userCustomers;
    }

    public void setUserCustomers(Customers userCustomers) {
        this.userCustomers = userCustomers;
    }

    public Employee getUserEmployee() {
        return userEmployee;
    }

    public void setUserEmployee(Employee userEmployee) {
        this.userEmployee = userEmployee;
    }
}
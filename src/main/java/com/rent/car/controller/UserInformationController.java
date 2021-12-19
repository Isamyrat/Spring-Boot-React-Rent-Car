package com.rent.car.controller;


import com.rent.car.model.UserInformation;
import com.rent.car.model.utils.Genre;
import com.rent.car.service.UserInformationService;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user/information")
public class UserInformationController {
    @Autowired
    private UserInformationService userInformationService;

    @GetMapping("/{id}")
    public ResponseEntity<UserInformation> getUserInformationByUserId(@PathVariable Long id) {
        return userInformationService.findUserInformationByUserId(id);
    }
    @PostMapping("/addUserInformation/{id}")
    public UserInformation createUserInformation(@RequestBody UserInformation userInformation, @PathVariable Long id){

        return userInformationService.saveUserInformation(userInformation,id);
    }
    @GetMapping("/genders")
    public  ResponseEntity<Set<String>> findAllGenders() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList(Genre.FEMALE.toString(), Genre.MALE.toString())), HttpStatus.OK);
    }
    @PostMapping("/{idUserInformation}/files/account/image")
    public void uploadAccountImage(@NotNull @RequestParam("file") MultipartFile multipartFile, @PathVariable Long idUserInformation) throws IOException {
        userInformationService.saveAccountImage(multipartFile, idUserInformation);

    }

    @PostMapping("/{idUserInformation}/files/passport/image")
    public void uploadPassportImage(@NotNull @RequestParam("file") MultipartFile multipartFile, @PathVariable Long idUserInformation) throws IOException {

        userInformationService.savePassportImage(multipartFile, idUserInformation);

    }

    @PutMapping("/updateUserInformation")
    public ResponseEntity<UserInformation> updateUserInformation(@RequestBody UserInformation userInformation) {
        return ResponseEntity.ok(userInformationService.updateUserInformation(userInformation));
    }
    @GetMapping("/findUserInformation/{id}")
    public ResponseEntity<UserInformation> getUserInformationById(@PathVariable Long id) {
        return userInformationService.findUserInformationByUserInformationId(id);
    }
}

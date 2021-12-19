package com.rent.car.service;

import com.rent.car.exception.ResourceNotFoundException;
import com.rent.car.model.User;
import com.rent.car.model.UserInformation;
import com.rent.car.repository.UserInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserInformationService {

    @Autowired
    private UserInformationRepository userInformationRepository;

    @Autowired
    private UserServiceImpl userService;

   public void savePassportImage(MultipartFile file, Long id) throws IOException {
       UserInformation userInformation = findByIdUser(id);
       userInformation.setPassportImage(file.getBytes());
       userInformationRepository.save(userInformation);
   }
   public void saveAccountImage(MultipartFile file,Long id) throws IOException {
       UserInformation userInformation = findByIdUser(id);
       System.out.println(userInformation);
       userInformation.setAccountImage(file.getBytes());
       userInformationRepository.save(userInformation);
   }
    public UserInformation saveUserInformation(UserInformation userInformation, Long id) {
        User user = userService.findByIdUsers(id);
        if(findByIdUserInformation(user.getId()) != null){
            return userInformation;
        }
        userInformation.setUserId(user);
        return userInformationRepository.save(userInformation);
    }

    public ResponseEntity<UserInformation> findUserInformationByUserId(Long id){
        UserInformation userInformation = userInformationRepository.findByUserId(userService.findByIdUsers(id));
        return ResponseEntity.ok(userInformation);
    }
    public ResponseEntity<UserInformation> findUserInformationByUserInformationId(Long id){
        UserInformation userInformation = userInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User information not exist with id:" + id));
        return ResponseEntity.ok(userInformation);
    }

    public UserInformation findByIdUserInformation(Long id){
        return userInformationRepository.findByUserId(userService.findByIdUsers(id));
    }

    public UserInformation findByIdUser(Long id){

        return userInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User information not exist with id:" + id));
    }



    public UserInformation updateUserInformation(UserInformation userInformation){
        UserInformation userInformation1 = findByIdUser(userInformation.getId());
        userInformation.setAccountImage(userInformation1.getAccountImage());
        userInformation.setPassportImage(userInformation1.getPassportImage());

        userInformation.setId(userInformation1.getId());

        userInformation.setUserId(userInformation1.getUserId());
        return userInformationRepository.save(userInformation);
    }

    public void deleteUserInformation(Long id){
        UserInformation userInformation = userInformationRepository.findByUserId(userService.findByIdUsers(id));

        if(userInformation == null){
            return;
        }

        userInformationRepository.delete(userInformation);
    }

}


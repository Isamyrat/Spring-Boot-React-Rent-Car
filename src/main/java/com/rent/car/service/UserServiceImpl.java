package com.rent.car.service;

import com.rent.car.exception.ResourceNotFoundException;
import com.rent.car.model.Rating;
import com.rent.car.model.Rental;
import com.rent.car.model.User;
import com.rent.car.repository.UserRepository;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserServiceImpl {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RentalService rentalService;

	@Autowired
	private RatingService ratingService;

	public Collection<User> findAll() {
		return userRepository.findAll();
	}


	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}


	public User saveOrUpdate(User user) {
		return userRepository.saveAndFlush(user);
	}


	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			userRepository.deleteById(id);
			jsonObject.put("message", "User deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

	public ResponseEntity<User> findByIdUser(Long id){
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));
		return ResponseEntity.ok(user);
	}

	public User findByIdUsers(Long id){
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));
	}
	public User updateUser(User user1){

		User user = findByIdUsers(user1.getId());
		user1.setEmail(user.getEmail());
		user1.setPassword(user.getPassword());
		user1.setRole(user.getRole());
		user1.setCreateAt(user.getCreateAt());
		return userRepository.save(user1);
	}
	public Page<User> findAll(Pageable pageable){
		return userRepository.findAll(pageable);
	}
	public Page<User> findAll(Pageable pageable, String searchText) {
		return userRepository.findAllUserPageable(pageable, searchText);
	}
	public User getUser(String username) {
		return userRepository.findByEmail(username);
	}

	public ResponseEntity<User> findByRentalId(Long id){
		Rental rental = rentalService.findByIdRental(id);
		User user = userRepository.findById(rental.getCarRental().getId())
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));
		return ResponseEntity.ok(user);
	}
	public ResponseEntity<User> findByRatingId(Long id){
		Rating rating = ratingService.findByIdRating(id);

		User user = userRepository.findById(rating.getCarRating().getId())
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id:" + id));
		return ResponseEntity.ok(user);
	}
}
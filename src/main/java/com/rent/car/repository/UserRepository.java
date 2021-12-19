package com.rent.car.repository;

import com.rent.car.model.Role;
import com.rent.car.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query("FROM User WHERE email=:email")
	User findByEmail(@Param("email") String email);


	User findByRole(Role role);

//	Page<User> findAllUsersPageable(Pageable pageable);

	@Query("FROM User u WHERE u.name LIKE %:searchText% OR u.surname LIKE %:searchText% OR u.email LIKE %:searchText%")
	Page<User> findAllUserPageable(Pageable pageable, @Param("searchText") String searchText);


}
package com.example.projetDS.persistance.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.projetDS.persistance.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
	List<User> findByRole(int role);
	List<User> findById(int id);
}

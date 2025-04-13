package com.example.projetDS.service.interfaces;

import java.util.List;

import com.example.projetDS.persistance.entities.User;

public interface IUser {
	
	List<User> getAllUsers();
	List<User> findByRole(int role);
    User getUserById(Long id);
    User getUserByEmail(String email);
    User saveUser(User user);
    User updateUser(User user);
    void deleteUser(Long id);

}

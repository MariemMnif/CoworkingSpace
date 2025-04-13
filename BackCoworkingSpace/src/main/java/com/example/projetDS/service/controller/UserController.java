package com.example.projetDS.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetDS.persistance.entities.User;
import com.example.projetDS.service.impliments.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200") 
public class UserController {
	
	 @Autowired
	 private UserService userService;
	 
	 @CrossOrigin
	 @GetMapping("/all")
	 public List<User> getAllUsers() {
		 return userService.getAllUsers();
	 }

	 @CrossOrigin
	 @GetMapping("/getUserById/{id}")
	 public User getUserById(@PathVariable Long id) {
	     return userService.getUserById(id);
	 }
	 
	 @CrossOrigin
	 @GetMapping("/getUserByRole/{role}")
	 public List<User> getUserByRole(@PathVariable int role) {
	     return userService.findByRole(role);
	 }
	 
	 @CrossOrigin
	 @RequestMapping(method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	 public User createUser(@RequestBody User user) {
	     return userService.saveUser(user);
	 }
	 
	 @CrossOrigin
	 @PutMapping("/update")
	 public User updateUser(@RequestBody User user) {
	     return userService.updateUser(user);
	 }
	 
	 @CrossOrigin
	 @DeleteMapping("/delete/{id}")
	 public void deleteUser(@PathVariable Long id) {
	     userService.deleteUser(id);
	 }

	 @CrossOrigin
	 @GetMapping("/getUserByEmail/{email}")
	 public User getUserByEmail(@PathVariable String email) {
	     return userService.getUserByEmail(email);
	  }
}

package com.example.projetDS.service.impliments;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetDS.persistance.dao.UserRepository;
import com.example.projetDS.persistance.entities.User;
import com.example.projetDS.service.interfaces.IUser;
 @Service
public class UserService implements IUser {

    @Autowired
    private UserRepository userRepository;

	@Override
	public User getUserById(Long id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id).get();
	}

	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email);
	}

	@Override
	public User saveUser(User user) {
		// TODO Auto-generated method stub
		  User existingUser = userRepository.findByEmail(user.getEmail());
	        if (existingUser != null) {
	            throw new RuntimeException("Un utilisateur avec cet email existe déjà !");
	        }
		return userRepository.save(user);
	}

	@Override
	public User updateUser(User user) {
		// TODO Auto-generated method stub
        Optional<User> existingUserOptional = userRepository.findById(user.getId());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            
            User userWithSameEmail = userRepository.findByEmail(user.getEmail());
            if (userWithSameEmail != null && !userWithSameEmail.getId().equals(user.getId())) {
                throw new RuntimeException("Un utilisateur avec cet email existe déjà !");
            }
        
            existingUser.setNom(user.getNom());
            existingUser.setPrenom(user.getPrenom());
            existingUser.setEmail(user.getEmail());
            existingUser.setMdp(user.getMdp());
            existingUser.setRole(user.getRole());
        
            return userRepository.save(existingUser);
            } else {throw new RuntimeException("Utilisateur non trouvé !");}
	}

	@Override
	public void deleteUser(Long id) {
		// TODO Auto-generated method stub
		userRepository.deleteById(id);
		
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public List<User> findByRole(int role) {
		// TODO Auto-generated method stub
		return userRepository.findByRole(role);
	}
}

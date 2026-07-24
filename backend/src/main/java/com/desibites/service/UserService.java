package com.desibites.service;

import com.desibites.entity.User;
import com.desibites.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Login User
    public User loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
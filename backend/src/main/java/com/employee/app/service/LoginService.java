/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.employee.app.service;

import com.employee.app.dto.UserDTO;
import java.util.*;
import org.springframework.stereotype.Service;

/**
 *
 * @author shekhar
 */
@Service
public class LoginService {
    
    Map<String, String> userMap = new HashMap<>(Map.of("admin", "admin"));
    
    public Optional<Integer> login(UserDTO userDTO) {
        String password = userMap.get(userDTO.userName());
        if(password != null && password.equals(userDTO.password())){
            return Optional.of(1);
        }
        return Optional.empty();
    }
}

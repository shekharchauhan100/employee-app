/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.employee.app.controller;

import com.employee.app.payload.JwtAuthenticationResponse;
import com.employee.app.dto.UserDTO;
import com.employee.app.service.JwtTokenService;
import com.employee.app.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author shekhar
 */

@RestController()
@RequestMapping("/auth")
public class AuthController {
    
    private final JwtTokenService jwtTokenService;
    private final LoginService loginService;

    public AuthController(JwtTokenService jwtTokenService, LoginService loginService) {
        this.jwtTokenService = jwtTokenService;
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        return loginService.login(userDTO)
                .map(userId -> {
                    String jwt = jwtTokenService.generateToken(userId, "USER");
                    return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,"Bearer","success"));
                }).orElseGet(() -> ResponseEntity.ok(new JwtAuthenticationResponse("User is not valid","not available","failure")));
    }
}

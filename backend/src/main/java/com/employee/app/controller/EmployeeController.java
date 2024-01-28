/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.employee.app.controller;

import com.employee.app.entity.Employee;
import com.employee.app.service.EmployeeService;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author shekhar
 */

@RestController()
@RequestMapping("/employees")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    
     
    @GetMapping
    public List<Employee> findAll(@RequestParam(required=false) String firstName, @RequestParam(required=false) String birthYear, @RequestParam(required=false) Integer ageFrom, @RequestParam(required=false) Integer ageTo) {
        return employeeService.findAll(firstName,birthYear, ageFrom, ageTo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findById(@PathVariable String id) {
        Employee employee = employeeService.findByEmployeeId(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee not found for this id :: " + id));
        return ResponseEntity.ok(employee);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<Employee> create(@RequestBody @Valid Employee employee) {
        return new ResponseEntity<>(employeeService.save(employee), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Employee> update(@RequestBody @Valid Employee employee) {
        return new ResponseEntity<>(employeeService.save(employee), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteById(@PathVariable String id) {
        employeeService.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/search/{employeeId}")
    public List<Employee> searchByEmployeeId(@PathVariable String employeeId) {
        return employeeService.searchByEmployeeId(employeeId);
    }
    
}

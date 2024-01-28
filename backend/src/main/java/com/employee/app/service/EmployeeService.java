/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.employee.app.service;

import com.employee.app.entity.Employee;
import com.employee.app.repository.EmployeeRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author shekhar
 */

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> findAll(String firstName,String birthYear,Integer ageFrom, Integer ageTo) {
        return employeeRepository.filterEmployee(firstName,birthYear,ageFrom, ageTo);
    }

    public Optional<Employee> findByEmployeeId(String id) {
        return employeeRepository.findByEmployeeId(id);
    }

    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void deleteById(String id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> searchByEmployeeId(String employeeId) {
        return employeeRepository.findByEmployeeIdContainingIgnoreCase(employeeId);
    }

}

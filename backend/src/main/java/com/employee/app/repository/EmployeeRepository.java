/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.employee.app.repository;

import com.employee.app.entity.Employee;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author shekhar
 */
public interface EmployeeRepository extends JpaRepository<Employee, String>{ 

    public List<Employee> findByEmployeeIdContainingIgnoreCase(String employeeId);

    public Optional<Employee> findByEmployeeId(String id);
    
    @Query("SELECT e FROM Employee e WHERE ((:firstName is null or e.firstName like %:firstName%) or (:firstName is null or e.lastName like %:firstName%)) and (:birthYear is null or year(e.dateOfBirth) = :birthYear) and (:ageFrom is null or :ageTo is null or e.age BETWEEN :ageFrom and :ageTo)")
     List<Employee> filterEmployee(@Param("firstName") String firstName, @Param("birthYear") String birthYear, @Param("ageFrom") Integer ageFrom, @Param("ageTo") Integer ageTo);
        
}

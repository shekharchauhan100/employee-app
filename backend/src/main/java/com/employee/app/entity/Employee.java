/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.employee.app.entity;

import com.employee.app.enumeration.Department;
import com.employee.app.enumeration.Designation;
import com.employee.app.enumeration.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
/**
 *
 * @author shekhar
 */
@Entity
@Getter
@Setter
@Table(name = "employee")
public class Employee {
    @Id
    @GenericGenerator(
        name = "employee_id",
        strategy = "com.employee.app.entity.EmployeeIdGenerator"
       )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee_id")
    @Column(name = "employee_id")
    private String employeeId;
    
    @Size(min = 2, message= "First name should be atleast two character.")
    @Column(name = "first_name")
    private String firstName;
    
    @Size(min = 2, message= "Last name should be atleast two character.")
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "gender")
    private Gender gender;
    
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    
    @Column(name = "department")
    private Department department;
    
    @Column(name = "designation")
    private Designation designation;
    
    @Column(name = "marital_status")
    private String maritalStatus;
    
    @Min(value = 18, message = "Age should be equals to 18 or greater than 18")
    @Max(value = 100, message = "Age should not be greater than 100 years")
    @Column(name = "age")
    private Integer age;
    
    @Column(name = "mobile")
    @Size(min = 10, max = 10, message= "Please enter the valid phone number")
    private String mobile;
    
    @Column(name = "address")
    private String address;
    
    
    public Employee(){
   
    }

    @Override
    public String toString() {
        return "Employee{" + "employeeId=" + employeeId + ", firstName=" + firstName + ", lastName=" + lastName + ", gender=" + gender + ", dateOfBirth=" + dateOfBirth + ", department=" + department + ", designation=" + designation + ", maritalStatus=" + maritalStatus + ", age=" + age + ", mobile=" + mobile + ", address=" + address + '}';
    }
    
    
}

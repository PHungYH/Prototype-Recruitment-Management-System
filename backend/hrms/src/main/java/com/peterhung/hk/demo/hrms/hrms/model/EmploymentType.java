package com.peterhung.hk.demo.hrms.hrms.model;

import jakarta.persistence.*;

@Entity
@Table(name="employment_types")
public class EmploymentType {
    @Id
    @Column(name="emp_type_id")
    private int id;
    private String name;

    public int getId() {return id;}
    
    public String getName() {return name;}
}

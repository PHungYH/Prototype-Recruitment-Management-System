package com.peterhung.hk.demo.hrms.hrms.model;

import jakarta.persistence.*;

@Entity
@Table(name="departments")
public class Department {
    @Id
    @Column(name="dept_id")
    private int id;
    private String name;

    public int getId() {return id;}

    public String getName() {return name;}
}

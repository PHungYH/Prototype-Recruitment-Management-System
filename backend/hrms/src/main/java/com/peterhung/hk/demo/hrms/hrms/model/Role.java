package com.peterhung.hk.demo.hrms.hrms.model;

import jakarta.persistence.*;

@Entity
@Table(name="roles")
public class Role {
    @Id
    @Column(name="role_id")
    private int id;
    @Column(name="role_name")
    private String name;

    public int getId() {return id;}
    public String getName() {return name;}
}

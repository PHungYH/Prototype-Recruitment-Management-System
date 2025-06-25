package com.peterhung.hk.demo.hrms.hrms.model;

import jakarta.persistence.*;

@Entity
@Table(name="positions")
public class Position {
    @Id
    @Column(name="position_id")
    private int id;
    private String name;

    public int getId() {return id;}

    public String getName() {return name;}
}

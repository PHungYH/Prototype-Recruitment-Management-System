package com.peterhung.hk.demo.rms.rms.model;

import jakarta.persistence.*;

@Entity
@Table(name="application_status")
public class ApplicationStatus {
    @Id
    @Column(name="status_id")
    private int id;

    @Column(name="status_name")
    private String name;

    public int getId() {return id;}

    public String getName() {return name;}
}

package com.peterhung.hk.demo.rms.rms.model;

import jakarta.persistence.*;

@Entity
@Table(name="migrations")
public class Migration {
    @Id
    @Column(name="migration_id")
    private int id;
    @OneToOne
    @JoinColumn(name="appl_id")
    Applicant applicant;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Applicant getApplicant() {
        return applicant;
    }
    public void setApplicant(Applicant applicant) {
        this.applicant = applicant;
    }
}

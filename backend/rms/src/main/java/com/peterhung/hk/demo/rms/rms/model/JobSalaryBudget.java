package com.peterhung.hk.demo.rms.rms.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "job_salary_budgets")
public class JobSalaryBudget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_sal_budget_id")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "job_id", nullable = false, unique = true)
    private JobOpening jobOpening;

    @Column(name = "salary_from", nullable = false, precision = 10, scale = 2)
    private BigDecimal salaryFrom;

    @Column(name = "salary_to", nullable = false, precision = 10, scale = 2)
    private BigDecimal salaryTo;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public JobOpening getJobOpening() {
        return jobOpening;
    }

    public void setJobOpening(JobOpening jobOpening) {
        this.jobOpening = jobOpening;
    }

    public BigDecimal getSalaryFrom() {
        return salaryFrom;
    }

    public void setSalaryFrom(BigDecimal salaryFrom) {
        this.salaryFrom = salaryFrom;
    }

    public BigDecimal getSalaryTo() {
        return salaryTo;
    }

    public void setSalaryTo(BigDecimal salaryTo) {
        this.salaryTo = salaryTo;
    }

    @PrePersist
    @PreUpdate
    private void validateSalaryRange() {
        if (salaryTo.compareTo(salaryFrom) < 0) {
            throw new IllegalArgumentException("salaryTo must be greater than or equal to salaryFrom");
        }
    }
}
package com.peterhung.hk.demo.rms.rms.dto.response;

import com.peterhung.hk.demo.rms.rms.model.EmploymentType;
import java.util.*;

public class EmploymentTypesResponse {
    private List<EmploymentType> employmentTypes;


    public EmploymentTypesResponse(List<EmploymentType> employmentTypes) {
        this.employmentTypes = employmentTypes;
    }

    public List<EmploymentType> getEmploymentTypes() {
        return employmentTypes;
    }

    public void setEmploymentTypes(List<EmploymentType> employmentTypes) {
        this.employmentTypes = employmentTypes;
    }
}

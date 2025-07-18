package com.peterhung.hk.demo.rms.rms.dto.response;

import com.peterhung.hk.demo.rms.rms.model.Department;
import java.util.*;

public class DepartmentsResponse {
    private List<Department> departments;


    public DepartmentsResponse(List<Department> departments) {
        this.departments = departments;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }
}

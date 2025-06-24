DROP DATABASE platform;
CREATE DATABASE platform; 

-- ROLES table
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- DEPTS table
CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- EMPLOYEES table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(100) NOT NULL,
    dept_id INT NOT NULL,
    role_id INT NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    CONSTRAINT fk_departments FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- APPLICANTS table
CREATE TABLE applicants (
    appl_id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- EMPLOYEE PROFILES table
CREATE TABLE employee_profiles (
    prof_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT NOT NULL UNIQUE,
    surname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    alias VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(10),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255),
    emergency_contact_name VARCHAR(100),
    emergency_contact_relationship VARCHAR(50),
    emergency_contact_phone VARCHAR(20),
    marital_status VARCHAR(20),
    nationality VARCHAR(50),
    CONSTRAINT fk_employees FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);


-- APPLICANT PROFILES table
CREATE TABLE applicant_profiles (
    prof_id INT PRIMARY KEY AUTO_INCREMENT,
    appl_id INT NOT NULL UNIQUE,
    surname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    alias VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(10),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255),
    nationality VARCHAR(50),
    CONSTRAINT fk_applicants FOREIGN KEY (appl_id) REFERENCES applicants(appl_id)
);
DROP DATABASE IF EXISTS platform;
CREATE DATABASE platform; 

-- ROLES table
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- DEPTS table
CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100) UNIQUE NOT NULL
);

-- EMPLOYMENT TYPES table
CREATE TABLE employment_types (
    emp_type_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_type_name VARCHAR(50) UNIQUE NOT NULL
);

-- POSITIONS table
CREATE TABLE positions (
    position_id INT PRIMARY KEY AUTO_INCREMENT,
    position_name VARCHAR(100) UNIQUE NOT NULL
);

-- EMPLOYEE DETAILS table
CREATE TABLE employee_details (
    emp_det_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_id INT NOT NULL,
    position_id INT NOT NULL,
    date_of_joining DATE NOT NULL,
    date_of_leaving DATE,
    emp_type_id INT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_departments FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    CONSTRAINT fk_employment_types FOREIGN KEY (emp_type_id) REFERENCES employment_types(emp_type_id),
    CONSTRAINT fk_positions FOREIGN KEY (position_id) REFERENCES positions(position_id)
);

-- EMPLOYEE PROFILES table
CREATE TABLE employee_profiles (
    emp_prof_id INT PRIMARY KEY AUTO_INCREMENT,
    lastname VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    alias VARCHAR(50),
    idcard VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(1) NOT NULL CHECK (gender IN ('M', 'F')),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    emergency_contact_name VARCHAR(100),
    emergency_contact_relationship VARCHAR(50),
    emergency_contact_phone VARCHAR(20),
    marital_status VARCHAR(20),
    nationality VARCHAR(50)
);

-- EMPLOYEES table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    emp_det_id INT NOT NULL,
    emp_prof_id INT NOT NULL,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(role_id),
    CONSTRAINT fk_employee_details FOREIGN KEY (emp_det_id) REFERENCES employee_details(emp_det_id),
    CONSTRAINT fk_employee_profiles FOREIGN KEY (emp_prof_id) REFERENCES employee_profiles(emp_prof_id)
);

-- APPLICANT PROFILES table
CREATE TABLE applicant_profiles (
    appl_prof_id INT PRIMARY KEY AUTO_INCREMENT,
    surname VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    alias VARCHAR(50),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(1) NOT NULL CHECK (gender IN ('M', 'F')),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    nationality VARCHAR(50)
);

-- APPLICANTS table
CREATE TABLE applicants (
    appl_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    appl_prof_id INT NOT NULL,
    CONSTRAINT fk_applicant_profiles FOREIGN KEY (appl_prof_id) REFERENCES applicant_profiles(appl_prof_id)
);
DROP DATABASE IF EXISTS platformrecruit;
CREATE DATABASE platformrecruit; 

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

-- APPLICANT PROFILES table
CREATE TABLE applicant_profiles (
    appl_prof_id INT PRIMARY KEY AUTO_INCREMENT,
    lastname VARCHAR(50),
    firstname VARCHAR(50),
    alias VARCHAR(50),
    idcard VARCHAR(4),
    date_of_birth DATE,
    gender VARCHAR(1) CHECK (gender IN ('M', 'F')),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    nationality VARCHAR(2),
    linkedin VARCHAR(200)
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

-- admin table
CREATE TABLE admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- JOB OPENINGS table
CREATE TABLE job_openings (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    job_title VARCHAR(100) NOT NULL,
    emp_type_id INT NOT NULL, 
    dept_id INT NOT NULL,
    job_description TEXT NOT NULL,
    job_requirements TEXT NOT NULL,
    job_posted_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_job_openings_employment_types FOREIGN KEY (emp_type_id) REFERENCES employment_types(emp_type_id),
    CONSTRAINT fk_job_openings_departments FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- APPLICATION STATUS table
CREATE TABLE application_status (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(20)
);

-- JOB APPLICATIONS table
CREATE TABLE job_applications (
    job_application_id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    appl_id INT NOT NULL,
    interview_time DATETIME,
    interview_location VARCHAR(100),
    applied_time DATETIME NOT NULL,
    status_id INT NOT NULL,
    CONSTRAINT fk_job_applications_job_openings FOREIGN KEY (job_id) REFERENCES job_openings(job_id),
    CONSTRAINT fk_job_applications_applicants FOREIGN KEY (appl_id) REFERENCES applicants(appl_id),
    CONSTRAINT fk_job_applications_status_id FOREIGN KEY (status_id) REFERENCES application_status(status_id)
);
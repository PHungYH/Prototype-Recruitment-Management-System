-- Insert roles
INSERT INTO roles (role_name) VALUES 
('Applicant'),
('HR');

-- Insert departments
INSERT INTO departments (dept_name) VALUES 
('HR'),
('System Admin'),
('IT');

-- Insert employment types
INSERT INTO employment_types (emp_type_name) VALUES 
('Full-Time'),
('Part-Time');

-- Insert positions
INSERT INTO positions (position_name) VALUES 
('Software Engineer'),
('HR Specialist'),
('Marketing Analyst');

-- Insert applicant profiles
INSERT INTO applicant_profiles (lastname, firstname, alias, idcard, date_of_birth, gender, phone_number, address, nationality) VALUES 
('Smith', 'John', 'Johnny', 'A1234567', '1990-05-12', 'M', '90000001', '101 Main Street, Cityville', 'USA'),
('Taylor', 'Emily', NULL, 'A2345678', '1993-09-30', 'F', '90000002', '202 Oak Avenue, Townsville', 'Canada'),
('Nguyen', 'Liam', 'Lee', 'A3456789', '1991-12-18', 'M', '90000003', '303 Pine Road, Villagetown', 'Vietnam');

-- Insert applicants
-- Raw: P@ssw0rd, Hashed password: $2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya
INSERT INTO applicants (username, email, password_hash, appl_prof_id) VALUES 
('applicant1', 'applicant1@gmail.com', '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya', 1),
('applicant2', 'applicant2@gmail.com', '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya', 2),
('applicant3', 'applicant3@gmail.com', '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya', 3);

-- Insert admin data into admins table
-- Raw: P@ssw0rd, Hashed password: $2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya
INSERT INTO admins (username, password_hash) VALUES
('admin1', '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya'),
('admin2', '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya'), 
('admin3', '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya');

-- Insert job openings
INSERT INTO job_openings (job_title, emp_type_id, dept_id, job_description, job_requirements, job_posted_date, is_active) VALUES 
('Frontend Developer', 1, 1, 'Develop UI components and collaborate with backend team.', 'HTML, CSS, JavaScript, React', '2025-06-01', TRUE),
('HR Assistant', 1, 2, 'Assist with recruitment and employee onboarding.', 'Strong communication, organizational skills', '2025-06-10', TRUE),
('Marketing Intern', 2, 3, 'Support digital marketing campaigns and content creation.', 'Social media, Canva, basic SEO', '2025-06-15', TRUE);

-- Insert job salary budgets
INSERT INTO job_salary_budgets (job_id, salary_from, salary_to) VALUES 
(1, 25000.00, 40000.00),
(2, 18000.00, 25000.00),
(3, 8000.00, 12000.00);

-- Insert application status
INSERT INTO application_status (status_name) VALUES 
('Applied'),
('Reviewing'),
('Offered'),
('Rejected');

-- Insert job applications
INSERT INTO job_applications (job_id, appl_id, applied_time, status_id) VALUES 
(1, 1, '2025-06-20', 1),
(2, 2, '2025-06-21', 2),
(3, 3, '2025-06-22', 1);

-- Insert followups
INSERT INTO followups (admin_id, job_application_id) VALUES
(3, 1);

-- Insert migrations
INSERT INTO migrations (appl_id) VALUES 
(1),
(2),
(3);
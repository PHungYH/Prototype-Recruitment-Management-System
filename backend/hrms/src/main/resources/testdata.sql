-- Insert sample roles
-- HR > Admin > Normal
INSERT INTO roles (name) VALUES
('HR'),
('Admin'),
('Normal');

-- Insert sample departments
INSERT INTO departments (name) VALUES
('HR'),
('System Admin'),
('IT');

-- Insert sample employment types
INSERT INTO employment_types (name) VALUES
('Full-time'),
('Part-time');

-- Insert sample positions
INSERT INTO positions (name) VALUES
('HR Manager'),
('System Administrator'),
('Developer');

-- Insert sample employee details
INSERT INTO employee_details (dept_id, position_id, date_of_joining, emp_type_id, salary) VALUES 
(1, 1, '2025-01-01', 1, 50000.00),
(2, 2, '2025-02-01', 1, 30000.00),
(3, 3, '2025-03-01', 1, 20000.00),
(3, 3, '2025-04-01', 2, 10000.00);

-- Insert sample employee profiles
INSERT INTO employee_profiles (surname, firstname, idcard, date_of_birth, gender) VALUES 
('Hung', 'Peter', 'A1234567', '1990-01-01', 'F'),
('Xue', 'Chun', 'B2345678', '1992-02-02', 'M'),
('Keung', 'Wai', 'C3456789', '1994-03-03', 'M'),
('Zhang', 'Qing Fu', 'D4567890', '1996-04-04', 'F');

-- Insert sample employees
-- Raw: P@ssw0rd, Hashed password: $2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya
INSERT INTO employees (login, role_id, password_hash, emp_det_id, prof_id) VALUES
('phung', 1, '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya', 1, 1),
('jxue', 2, '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya', 2, 2),
('jkeung', 3, '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya', 3, 3),
('zqfu', 3, '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya', 4, 4);

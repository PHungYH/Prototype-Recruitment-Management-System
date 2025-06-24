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

-- Insert sample employees
-- Raw: P@ssw0rd, Hashed password: $2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya
INSERT INTO employees (login, dept_id, role_id, password_hash) VALUES
('phung', 1, 1, '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya'),
('jxue', 2, 2, '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya'),
('jkeung', 3, 3, '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya'),
('zqfu', 3, 3, '$2a$10$9m7pR.K04NZSpYzibpl64uGCt6.sdcq/WkCEMh3LKR2/L3Yijvrya');

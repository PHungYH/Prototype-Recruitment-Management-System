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
INSERT INTO applicant_profiles (lastname, firstname, alias, idcard, date_of_birth, gender, phone_number, address, nationality, linkedin) VALUES 
('Smith', 'John', 'Johnny', 'A123', '1990-05-12', 'M', '90000001', '101 Main Street, Cityville', 'US', 'peter-hung-a31806193'),
('Taylor', 'Emily', NULL, 'A234', '1993-09-30', 'F', '90000002', '202 Oak Avenue, Townsville', 'HK', 'peter-hung-a31806193'),
('Nguyen', 'Liam', 'Lee', 'A345', '1991-12-18', 'M', '90000003', '303 Pine Road, Villagetown', 'HK', 'peter-hung-a31806193');

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
('UI Engineer 1', 1, 3, 'Design and implement responsive user interfaces for web applications.', 'HTML, CSS, JavaScript, Vue.js', '2025-06-01', TRUE),
('Web Designer 2', 1, 3, 'Create engaging layouts and collaborate with developers for seamless UX.', 'Figma, CSS, JavaScript, UX principles', '2025-06-01', TRUE),
('React Developer 3', 1, 3, 'Build dynamic frontend features using React and Redux.', 'React, Redux, TypeScript, REST APIs', '2025-06-01', TRUE),
('Frontend Engineer 4', 1, 3, 'Implement UI logic and optimize performance for web apps.', 'JavaScript, React, Webpack, Git', '2025-06-01', TRUE),
('JavaScript Developer 5', 1, 3, 'Develop interactive components and ensure cross-browser compatibility.', 'JavaScript, HTML5, CSS3, Babel', '2025-06-01', TRUE),
('UX Developer 6', 1, 3, 'Collaborate with designers to translate wireframes into code.', 'HTML, CSS, JavaScript, UX tools', '2025-06-01', TRUE),
('Frontend Specialist 7', 1, 3, 'Maintain and enhance existing UI codebase.', 'React, SCSS, Git, Agile methodologies', '2025-06-01', TRUE),
('Web UI Developer 8', 1, 3, 'Develop modular and reusable UI components.', 'JavaScript, React, Tailwind CSS', '2025-06-01', TRUE),
('Interface Developer 9', 1, 3, 'Work closely with backend engineers to integrate APIs.', 'React, REST, GraphQL, CSS Modules', '2025-06-01', TRUE),
('Frontend Architect 10', 1, 3, 'Define frontend architecture and enforce coding standards.', 'React, TypeScript, CI/CD, Webpack', '2025-06-01', TRUE),
('Junior Web Developer 11', 1, 3, 'Assist in building and testing UI features.', 'HTML, CSS, JavaScript, Git basics', '2025-06-01', TRUE),
('Frontend Intern 12', 2, 3, 'Support frontend team with bug fixes and documentation.', 'HTML, CSS, basic JavaScript', '2025-06-01', TRUE),
('UI/UX Developer 13', 1, 3, 'Bridge the gap between design and development.', 'Figma, JavaScript, CSS, accessibility', '2025-06-01', TRUE),
('Mobile Web Developer 14', 1, 3, 'Optimize web apps for mobile responsiveness.', 'React, CSS Flexbox/Grid, media queries', '2025-06-01', TRUE),
('Interactive Developer 15', 1, 3, 'Create interactive elements and animations.', 'JavaScript, GSAP, CSS transitions', '2025-06-01', TRUE),
('Frontend Consultant 16', 1, 3, 'Advise on frontend best practices and performance.', 'React, Lighthouse, DevTools, SEO basics', '2025-06-01', TRUE),
('Web Application Developer 17', 1, 3, 'Develop and maintain web-based user interfaces.', 'React, HTML, CSS, REST APIs', '2025-06-01', TRUE),
('SPA Developer 18', 1, 3, 'Build single-page applications with modern frameworks.', 'React, Vue, routing, state management', '2025-06-01', TRUE),
('HR Assistant 19', 1, 1, 'Coordinate interviews and maintain HR records.', 'MS Office, communication, time management', '2025-06-10', TRUE),
('Marketing Intern 20', 2, 1, 'Assist in social media strategy and analytics.', 'Instagram, Canva, Google Analytics', '2025-06-15', TRUE),
('Data Analyst 21', 1, 3, 'Analyze datasets to support business decisions.', 'SQL, Excel, Power BI, critical thinking', '2025-06-18', TRUE),
('QA Tester 22', 1, 3, 'Test web applications and report bugs.', 'Manual testing, Selenium, Jira', '2025-06-20', TRUE),
('DevOps Intern 23', 2, 2, 'Support CI/CD pipelines and deployment tasks.', 'Linux, GitHub Actions, Docker basics', '2025-06-22', TRUE),
('Content Writer 24', 1, 1, 'Write blog posts and marketing copy.', 'SEO writing, grammar, storytelling', '2025-06-25', TRUE),
('IT Support Specialist 25', 1, 2, 'Provide technical support and troubleshoot issues.', 'Windows, networking, customer service', '2025-06-28', TRUE);

-- Insert application status
INSERT INTO application_status (status_name) VALUES 
('Applied'),
('Interview'),
('Offered'),
('Rejected'),
('Closed');

-- Insert job applications
INSERT INTO job_applications (job_id, appl_id, applied_time, status_id) VALUES 
(1, 1, '2025-06-20 12:00:00', 1),
(2, 2, '2025-06-21 12:00:00', 2),
(3, 3, '2025-06-22 12:00:00', 1);
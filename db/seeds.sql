INSERT INTO departments (name)
VALUES
    ("Accounting"),
    ("Customer Support"),
    ("Sales"),
    ("Human Resources"),
    ("Management");

-- add to roles
INSERT INTO roles (title, salary, department_id)
VALUES
    ("Tax Accountant", 90000, 1),
    ("Call agent", 75000, 3),
    ("Senior SalesPerson", ),
    ("Recruiter", 120000, 2) ,
    ("Financial Analyst", 135000, 4 ),
    ("Regional Manager", 130000, 3),
    ("Human Resource representative", 100000, 4 ),
    ("Junior SalesPerson", 80000, 1 );
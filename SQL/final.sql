-- #1
CREATE DATABASE IF NOT EXISTS workers;
USE workers;
CREATE TABLE IF NOT EXISTS positions (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
    position VARCHAR(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS employees (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    position_id INTEGER NOT NULL,
    salary INT UNSIGNED NOT NULL,
    FOREIGN KEY (position_id) REFERENCES positions (id)
);
INSERT INTO positions (id, position) VALUES (null, 'Architect');
INSERT INTO positions (id, position) VALUES (null, 'Engineer');
INSERT INTO positions (id, position) VALUES (null, 'Musician');
INSERT INTO positions (id, position) VALUES (null, 'Tester');
INSERT INTO employees (id, first_name, last_name, position_id, salary)
VALUES (null, 'Gregory', 'Semenov', 3, 180000),
		(null, 'Bulat', 'Dust', 1, 200000),
        (null, 'Anton', 'Chigurh', 2, 80000),
        (null, 'Anna', 'Chapman', 4, 24000),
        (null, 'Alexander', 'Pushkin', 4, 32000);

-- #2
SELECT employee.first_name, employee.last_name, pos.position, employee.salary
FROM employees employee
INNER JOIN positions pos ON employee.position_id=pos.id
WHERE salary < 90000;

SELECT employee.first_name, employee.last_name, pos.position, employee.salary
FROM employees employee
INNER JOIN positions pos ON employee.position_id=pos.id
WHERE salary < 90000 AND position='Tester';

-- #3
CREATE TABLE IF NOT EXISTS relations (
	inferior_id INT UNSIGNED NOT NULL,
    chief_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (inferior_id, chief_id),
    INDEX inferior_id (inferior_id),
    INDEX chief_id (chief_id),
    CONSTRAINT fk_inferior_id FOREIGN KEY (inferior_id)
		REFERENCES employees (id) ON DELETE CASCADE,
	CONSTRAINT fk_chief_id FOREIGN KEY (chief_id)
		REFERENCES employees (id) ON DELETE CASCADE
);
INSERT INTO relations (inferior_id, chief_id) VALUES
	(1, 2), (3, 2), (4, 1), (5, 1);

SELECT employees.first_name, employees.last_name, positions.position
FROM employees
INNER JOIN positions ON employees.position_id=positions.id
WHERE employees.id IN (SELECT relations.inferior_id FROM relations
	WHERE relations.chief_id=1);
-- Change chief_id to get information about inferiors!
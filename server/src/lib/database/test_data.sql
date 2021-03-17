INSERT INTO statuses (file, text)
VALUES ("/statuses/test.jpg", "Test");

INSERT INTO jobs (first_name, last_name, email, phone, address, city, province, country, status_id) 
VALUES ("Noah", "Varghese", "varghese.noah@gmail.com", "+16477715777", "207 Elderwood Trail", "Oakville", "ON", "Canada", "1");

INSERT INTO images (file, text, job_id)
VALUES ("/job/1/test.jpg", "Before", "1");

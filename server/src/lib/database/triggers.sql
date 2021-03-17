CREATE TRIGGER update_jobs
BEFORE UPDATE
ON jobs FOR EACH ROW
SET NEW.updated_on = NOW();

CREATE TRIGGER update_statuses
BEFORE UPDATE
ON statuses FOR EACH ROW
SET NEW.updated_on = NOW();

CREATE TRIGGER update_images
BEFORE UPDATE
ON images FOR EACH ROW
SET NEW.updated_on = NOW();
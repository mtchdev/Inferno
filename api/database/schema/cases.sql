CREATE TABLE IF NOT EXISTS cases (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `actor_id` VARCHAR(255) NOT NULL,
    reason VARCHAR(255),
    unix_added INT(4) UNSIGNED NOT NULL,
    unix_updated INT(4) UNSIGNED NOT NULL,

    PRIMARY KEY (id)
    
)
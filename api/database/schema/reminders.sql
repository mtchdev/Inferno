CREATE TABLE IF NOT EXISTS reminders (

    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255),
    `guild_id` VARCHAR(255) NOT NULL,
    `channel_id` VARCHAR(255) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `time` INT(4) UNSIGNED NOT NULL,

    PRIMARY KEY (id)

)

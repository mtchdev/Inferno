CREATE TABLE IF NOT EXISTS configs (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    guild_id VARCHAR(255) NOT NULL,
    prefix VARCHAR(255) NOT NULL,
    mod_role VARCHAR(255),
    admin_role VARCHAR(255),
    mute_role VARCHAR(255),

    PRIMARY KEY (id)
)

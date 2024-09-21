DROP DATABASE IF EXISTS tasklistdb;
CREATE DATABASE tasklistdb;
USE tasklistdb;

CREATE TABLE user (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(255),
    photo VARCHAR(255),
    birthDate DATE,
    password VARCHAR(255),
    email VARCHAR(255),
    sex ENUM('Masculino', 'Feminino', 'Outro', 'Prefiro não responder'),
    status ENUM('Ativado', 'Desativado', 'Bloqueado') NOT NULL DEFAULT 'Ativado',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME
) ENGINE=InnoDB;

CREATE TABLE message (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    content TEXT NULL,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    user_id INT UNSIGNED NOT NULL,
    filename VARCHAR(255) NULL,
    path VARCHAR(255) NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_message_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE  chat (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    name VARCHAR(45) NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;


CREATE TABLE login_status (
    user_id INT UNSIGNED PRIMARY KEY,
    logged_in BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);


INSERT INTO `user` (`id`, `name`, `username`, `photo`, `birthDate`, `password`, `email`, `sex`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'sandro', 'sandro', 'https://yt3.googleusercontent.com/ytc/AIdro_kX71kduAnHcd1ydjdYJDclPbDfs0SQHuHcWK4RgBvuq6k=s176-c-k-c0x00ffffff-no-rj', '2024-06-12', '$2b$10$lcH7DVg8z7DyN78x.0C2ZOVIe/1qX5l3LYcElzIoqrF9sngv5.IV6', 'sandro@gmail.com', 'Masculino', 'Ativado', '2024-06-14 20:47:33', '2024-06-14 20:47:33'),
(4, 'juca', 'juca', 'https://i.pinimg.com/564x/54/a5/76/54a576b96c941f11b6927ecbd4f111fc.jpg', '2024-06-12', '$2b$10$OE3CzEi.mE9Af.WKjzDkuurTvY2YAPrALGSfd6opvv/Yqnzc4IUcK', 'aaaa@ssss.dddd', 'Masculino', 'Ativado', '2024-06-12 20:24:05', NULL),
(5, 'ted', 'ted', 'https://s2-quem.glbimg.com/YuaYenzW5M5XSoIMjCm5JEKraJc=/0x0:1030x561/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b0f0e84207c948ab8b8777be5a6a4395/internal_photos/bs/2024/u/y/Vbd5giRYAlYFLXlqtU4A/turmadamonica-1664566945-2938923007722585403-187', '2024-06-14', '$2b$10$xSgoNivZGefyALkDDY/9i.Ke1ff2M.uolElpUbdAPQQwUfsl9pDc6', 'sandrogomesoficial@hotmail.com', 'Masculino', 'Ativado', '2024-06-14 18:48:20', NULL),
(6, 'mascara', 'mascara', 'https://d26lpennugtm8s.cloudfront.net/stores/957/778/rte/m%C3%A1scaras%20(271).jpg', '2024-06-17', '$2b$10$ZY5H7Adf5nkmjINzpkwyz.jzehUjBZAiwh9POPCT9rs5k9Glhh/1.', 'wal@gmail.com', 'Masculino', 'Ativado', '2024-06-17 19:03:07', '2024-06-17 19:03:07'),
(7, 'Bete', 'Bete', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDSudtoDXDKBilrQU52l8odvXuYs9e3bepdg&s', '2024-06-17', '$2b$10$jxrcCmOKagufGKfZd1Yoa.Kdo3JsNe/YMQm0411Qby8cwtVOE1/T6', 'bete@gmail.com', 'Masculino', 'Ativado', '2024-06-17 21:16:06', '2024-06-17 21:16:06');


SELECT * FROM user;
SELECT * FROM message;



# ajustar as colunas
# ALTER TABLE message ADD COLUMN filename VARCHAR(255) NULL;
# ALTER TABLE message ADD COLUMN path VARCHAR(255) NULL;
# ALTER TABLE message MODIFY COLUMN content TEXT NULL;
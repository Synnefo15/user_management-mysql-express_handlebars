CREATE TABLE `user_management`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(40) NOT NULL , `last_name` VARCHAR(40) NOT NULL , `email` VARCHAR(40) NOT NULL , `phone` VARCHAR(40) NOT NULL , `comment` TEXT NOT NULL , `status` VARCHAR(10) NOT NULL DEFAULT 'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;


INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `phone`, `comment`, `status`) VALUES (NULL, 'rafo', 'cahya', 'cahya@gmial.com', '0819821983', 'ini coment dari rafi', 'active');
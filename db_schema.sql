CREATE TABLE `user` (
  `id` integer PRIMARY KEY,
  `password` text NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `comment` (
  `id` integer PRIMARY KEY,
  `text` text NOT NULL,
  `homePage` varchar(255),
  `userId` integer NOT NULL,
  `parentId` integer,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

CREATE TABLE `commentFile` (
  `id` integer PRIMARY KEY,
  `url` text NOT NULL,
  `commentId` integer NOT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
);

ALTER TABLE `comment` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`parentId`) REFERENCES `comment` (`id`);

ALTER TABLE `commentFile` ADD FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`);

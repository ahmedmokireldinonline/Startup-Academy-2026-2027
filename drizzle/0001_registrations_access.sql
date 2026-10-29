CREATE TABLE IF NOT EXISTS `registrations` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(160) NOT NULL,
  `email` varchar(320) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `country` varchar(8) NOT NULL,
  `dialCode` varchar(12) NOT NULL,
  `stage` varchar(100) NOT NULL,
  `goal` text NOT NULL,
  `language` varchar(8) NOT NULL DEFAULT 'ar',
  `status` enum('new','contacted','qualified','archived') NOT NULL DEFAULT 'new',
  `notes` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `lastContactedAt` timestamp,
  CONSTRAINT `registrations_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `registration_access_tokens` (
  `id` int AUTO_INCREMENT NOT NULL,
  `registrationId` int NOT NULL,
  `tokenHash` varchar(128) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `expiresAt` timestamp NOT NULL,
  CONSTRAINT `registration_access_tokens_id` PRIMARY KEY(`id`),
  CONSTRAINT `registration_access_tokens_tokenHash_unique` UNIQUE(`tokenHash`),
  CONSTRAINT `registration_access_tokens_registration_fk` FOREIGN KEY (`registrationId`) REFERENCES `registrations`(`id`) ON DELETE CASCADE
);

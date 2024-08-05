﻿CREATE SCHEMA [user]

CREATE TABLE [user].[User]
(
	[Id] INT IDENTITY(1, 1) NOT NULL CONSTRAINT PK_User PRIMARY KEY,
	[CreateDate] DATETIME NOT NULL CONSTRAINT DF_User_CreateDate DEFAULT (GETDATE()),
	[ModifyDate] DATETIME NOT NULL CONSTRAINT DF_User_ModifyDate DEFAULT (GETDATE()),
	[CreateUser_Id] INT, 
	[ModifyUser_Id] INT,
	[IsActive] BIT NOT NULL CONSTRAINT DF_User_IsActive DEFAULT (1),
	[Login] NVARCHAR(500) NOT NULL,
	[PasswordHash] NVARCHAR(500) NOT NULL,
	[PasswordSalt] NVARCHAR(500) NOT NULL
)

CREATE TABLE [user].[Login]
(
	[Id] INT IDENTITY(1, 1) NOT NULL CONSTRAINT PK_UserLogin PRIMARY KEY,
	[CreateDate] DATETIME NOT NULL CONSTRAINT DF_UserLogin_CreateDate DEFAULT (GETDATE()),
	[User_Id] INT NOT NULL CONSTRAINT FK_UserLogin_User REFERENCES [user].[User](Id),
	[Ip] NVARCHAR(100) NULL,
	[IsSuccess] BIT
)
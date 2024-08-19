CREATE SCHEMA [time]

CREATE TABLE [time].[Activity]
(
	[Id] INT IDENTITY(1, 1) NOT NULL CONSTRAINT PK_TimeActivity PRIMARY KEY,
	[CreateDate] DATETIME NOT NULL CONSTRAINT DF_TimeActivity_CreateDate DEFAULT (GETDATE()),
	[ModifyDate] DATETIME NOT NULL CONSTRAINT DF_TimeActivity_ModifyDate DEFAULT (GETDATE()),
	[CreateUser_Id] INT, 
	[ModifyUser_Id] INT,
	[IsActive] BIT NOT NULL CONSTRAINT DF_TimeActivity_IsActive DEFAULT (1),
	[User_Id] INT NOT NULL CONSTRAINT DF_TimeActivity_User REFERENCES [user].[User](Id),
	[Name] NVARCHAR(200) NOT NULL,
	[Color] NVARCHAR(100) NOT NULL,
	[Icon] NVARCHAR(100) NULL
)

CREATE TABLE [time].[Entry]
(
	[Id] INT IDENTITY(1, 1) NOT NULL CONSTRAINT PK_TimeEntry PRIMARY KEY,
	[CreateDate] DATETIME NOT NULL CONSTRAINT DF_TimeEntry_CreateDate DEFAULT (GETDATE()),
	[ModifyDate] DATETIME NOT NULL CONSTRAINT DF_TimeEntry_ModifyDate DEFAULT (GETDATE()),
	[CreateUser_Id] INT, 
	[ModifyUser_Id] INT,
	[IsActive] BIT NOT NULL CONSTRAINT DF_TimeEntry_IsActive DEFAULT (1),
	[Activity_Id] INT NOT NULL CONSTRAINT DF_TimeEntry_Activity REFERENCES [time].[Activity](Id),
	[DateFrom] DATETIME NOT NULL,
	[DateTo] DATETIME NULL,
	[Description] NVARCHAR(500) NULL,
)
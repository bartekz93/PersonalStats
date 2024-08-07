CREATE SCHEMA [budget]

CREATE TABLE [budget].[Wallet]
(
	[Id] INT IDENTITY(1, 1) NOT NULL CONSTRAINT PK_BudgetWallet PRIMARY KEY,
	[CreateDate] DATETIME NOT NULL CONSTRAINT DF_BudgetWallet_CreateDate DEFAULT (GETDATE()),
	[ModifyDate] DATETIME NOT NULL CONSTRAINT DF_BudgetWallet_ModifyDate DEFAULT (GETDATE()),
	[CreateUser_Id] INT, 
	[ModifyUser_Id] INT,
	[IsActive] BIT NOT NULL CONSTRAINT DF_BudgetWallet_IsActive DEFAULT (1),
	[User_Id] INT NOT NULL CONSTRAINT DF_BudgetWallet_User REFERENCES [user].[User](Id),
	[Name] NVARCHAR(200) NOT NULL,
	[Color] NVARCHAR(100) NOT NULL,
	[Currency] CHAR(3)
)

CREATE TABLE [budget].[Category]
(
	[Id] INT IDENTITY(1, 1) NOT NULL CONSTRAINT PK_BudgetCategory PRIMARY KEY,
	[CreateDate] DATETIME NOT NULL CONSTRAINT DF_BudgetCategory_CreateDate DEFAULT (GETDATE()),
	[ModifyDate] DATETIME NOT NULL CONSTRAINT DF_BudgetCategory_ModifyDate DEFAULT (GETDATE()),
	[CreateUser_Id] INT, 
	[ModifyUser_Id] INT,
	[IsActive] BIT NOT NULL CONSTRAINT DF_BudgetCategory_IsActive DEFAULT (1),
	[User_Id] INT NOT NULL CONSTRAINT DF_BudgetCategory_User REFERENCES [user].[User](Id),
	[Type] CHAR(1) NOT NULL,
	[Name] NVARCHAR(200) NOT NULL,
	[Color] NVARCHAR(100) NOT NULL,
	[Icon] NVARCHAR(100) NOT NULL
)

CREATE TABLE [budget].[Transaction]
(
	[Id] INT IDENTITY(1, 1) NOT NULL CONSTRAINT PK_BudgetTransaction PRIMARY KEY,
	[CreateDate] DATETIME NOT NULL CONSTRAINT DF_BudgetTransaction_CreateDate DEFAULT (GETDATE()),
	[ModifyDate] DATETIME NOT NULL CONSTRAINT DF_BudgetTransaction_ModifyDate DEFAULT (GETDATE()),
	[CreateUser_Id] INT, 
	[ModifyUser_Id] INT,
	[IsActive] BIT NOT NULL CONSTRAINT DF_BudgetTransaction_IsActive DEFAULT (1),
	[User_Id] INT NOT NULL CONSTRAINT DF_BudgetTransaction_User REFERENCES [user].[User](Id),
	[Wallet_Id] INT NOT NULL CONSTRAINT FK_BudgetTransaction_Wallet REFERENCES [budget].[Wallet](Id),
	[Category_Id] INT NOT NULL CONSTRAINT FK_BudgetTransaction_Category REFERENCES [budget].[Category](Id),
	[Date] DATE NOT NULL,
	[Amount] DECIMAL(16, 2) NOT NULL,
	[Note] NVARCHAR(500)
)
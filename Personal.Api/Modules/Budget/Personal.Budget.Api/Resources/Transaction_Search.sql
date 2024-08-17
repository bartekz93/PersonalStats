--DECLARE @User_Id INT
--DECLARE @Note NVARCHAR(500)
--DECLARE @AmountMin DECIMAL(16, 2)
--DECLARE @AmountMax DECIMAL(16, 2)
--DECLARE @DateFrom DATE
--DECLARE @DateTo DATE
--DECLARE @CategoryIds NVARCHAR(MAX)
--DECLARE @WalletIds NVARCHAR(MAX)
--DECLARE @Offset INT = 0
--DECLARE @Rows INT = 10
--DECLARE @SortBy NVARCHAR(100) = NULL
--DECLARE @SortOrder INT = NULL

DECLARE @NotePat NVARCHAR(100) = CONCAT('%', @Note, '%')

SELECT
	T.Id,
	T.[Date],
	T.[Amount],
	T.[Note] AS [Description],
	C.Id AS CategoryId,
	C.[Name] AS CategoryName,
	C.[Icon] AS CategoryIcon,
	C.[Color] AS CategoryColor,
	W.Id AS WalletId,
	W.[Name] AS WalletName,
	W.[Color] AS WalletColor,
	W.[Currency] AS WalletCurrency,
	SUM(T.Amount) OVER() AS Balance,
	SUM(IIF(T.Amount > 0, T.Amount, 0)) OVER() AS FullIncome,
	SUM(IIF(T.Amount < 0, T.Amount, 0)) OVER() AS FullOutcome,
	COUNT(*) OVER() AS TotalRows
FROM 
	[budget].[Transaction] AS T (NOLOCK)
	JOIN [budget].[Wallet] AS W (NOLOCK) ON W.Id = T.Wallet_Id
	JOIN [budget].[Category] AS C (NOLOCK) ON C.Id = T.Category_Id
WHERE
	T.IsActive = 1
	AND T.[User_Id] = @User_Id
	AND (@AmountMin IS NULL OR T.[Amount] >= @AmountMin)
	AND (@AmountMax IS NULL OR T.[Amount] <= @AmountMin)
	AND (@DateFrom IS NULL OR T.[Date] >= @DateFrom)
	AND (@DateTo IS NULL OR T.[Date] <= @DateTo)
	AND (@Note IS NULL OR T.[Note] LIKE @NotePat)
	AND (@CategoryIds IS NULL OR T.Category_Id IN (SELECT value FROM STRING_SPLIT(@CategoryIds,',')))
	AND (@WalletIds IS NULL OR T.Wallet_Id IN (SELECT value FROM STRING_SPLIT(@WalletIds,',')))
ORDER BY [Date] DESC
OFFSET @Offset ROWS
FETCH NEXT @Rows ROWS ONLY
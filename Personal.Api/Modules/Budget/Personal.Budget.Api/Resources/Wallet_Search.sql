--DECLARE @User_Id INT = 1
--DECLARE @Name NVARCHAR(100) = NULL
--DECLARE @Currency CHAR(3) = NULL
--DECLARE @Offset INT = 0
--DECLARE @Rows INT = 10
--DECLARE @SortBy NVARCHAR(100) = NULL
--DECLARE @SortOrder INT = NULL


DECLARE @NamePat NVARCHAR(100) = CONCAT('%', @Name, '%')

SELECT
	W.Id,
	W.[Name],
	W.Color,
	W.Currency,
	COUNT(*) OVER() AS TotalRows
FROM 
	[budget].[Wallet] AS W (NOLOCK)
WHERE
	W.IsActive = 1
	AND W.[User_Id] = @User_Id
	AND (@Currency IS NULL OR W.Currency = @Currency)
	AND (@Name IS NULL OR W.[Name] LIKE @NamePat)
ORDER BY Id ASC
OFFSET @Offset ROWS
FETCH NEXT @Rows ROWS ONLY
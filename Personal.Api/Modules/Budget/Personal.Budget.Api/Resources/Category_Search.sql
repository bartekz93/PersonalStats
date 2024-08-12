--DECLARE @User_Id INT = 1
--DECLARE @Name NVARCHAR(100) = NULL
--DECLARE @Type CHAR(1) = NULL
--DECLARE @Offset INT = 0
--DECLARE @Rows INT = 10
--DECLARE @SortBy NVARCHAR(100) = NULL
--DECLARE @SortOrder INT = NULL


DECLARE @NamePat NVARCHAR(100) = CONCAT('%', @Name, '%')

SELECT
	C.Id,
	C.[Type],
	C.[Name],
	C.Color,
	C.Icon,
	COUNT(*) OVER() AS TotalRows
FROM 
	[budget].[Category] AS C (NOLOCK)
WHERE
	C.IsActive = 1
	AND C.[User_Id] = @User_Id
	AND (@Type IS NULL OR C.[Type] = @Type)
	AND (@Name IS NULL OR C.[Name] LIKE @NamePat)
ORDER BY Id ASC
OFFSET @Offset ROWS
FETCH NEXT @Rows ROWS ONLY
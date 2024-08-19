--DECLARE @User_Id INT = 1
--DECLARE @Name NVARCHAR(100) = NULL
--DECLARE @Offset INT = 0
--DECLARE @Rows INT = 10
--DECLARE @SortBy NVARCHAR(100) = NULL
--DECLARE @SortOrder INT = NULL


DECLARE @NamePat NVARCHAR(100) = CONCAT('%', @Name, '%')

SELECT
	A.Id,
	A.[Name],
	A.Color,
	A.Icon,
	COUNT(*) OVER() AS TotalRows
FROM 
	[time].[Activity] AS A (NOLOCK)
WHERE
	A.IsActive = 1
	AND A.[User_Id] = @User_Id
	AND (@Name IS NULL OR A.[Name] LIKE @NamePat)
ORDER BY [Name] ASC
OFFSET @Offset ROWS
FETCH NEXT @Rows ROWS ONLY
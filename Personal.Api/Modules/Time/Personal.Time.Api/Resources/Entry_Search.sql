--DECLARE @User_Id INT = 1
--DECLARE @DateFrom DATETIME
--DECLARE @DateTo DATETIME
--DECLARE @Offset INT = 0
--DECLARE @Rows INT = 10
--DECLARE @SortBy NVARCHAR(100) = NULL
--DECLARE @SortOrder INT = NULL

SELECT
	E.Id,
	E.[DateFrom],
	E.[DateTo],
	E.[Description],
	A.[Name] AS ActvityName,
	A.[Color] AS ActvityColor,
	A.[Icon] AS ActvityIcon,
	COUNT(*) OVER() AS TotalRows
FROM 
	[time].[Entry] AS E (NOLOCK)
	JOIN [time].[Activity] AS A (NOLOCK) ON E.Activity_Id = A.Id
WHERE
	E.IsActive = 1
	AND A.[User_Id] = @User_Id
	AND (@DateFrom IS NULL OR E.[DateFrom] >= @DateFrom)
	AND (@DateTo IS NULL OR E.[DateTo] IS NULL OR E.[DateTo] <= @DateTo)
ORDER BY [DateFrom] ASC
OFFSET @Offset ROWS
FETCH NEXT @Rows ROWS ONLY
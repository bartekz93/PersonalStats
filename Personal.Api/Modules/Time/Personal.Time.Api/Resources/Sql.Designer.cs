﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Personal.Time.Api.Resources {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "17.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Sql {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Sql() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("Personal.Time.Api.Resources.Sql", typeof(Sql).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to --DECLARE @User_Id INT = 1
        ///--DECLARE @Name NVARCHAR(100) = NULL
        ///--DECLARE @Offset INT = 0
        ///--DECLARE @Rows INT = 10
        ///--DECLARE @SortBy NVARCHAR(100) = NULL
        ///--DECLARE @SortOrder INT = NULL
        ///
        ///
        ///DECLARE @NamePat NVARCHAR(100) = CONCAT(&apos;%&apos;, @Name, &apos;%&apos;)
        ///
        ///SELECT
        ///	A.Id,
        ///	A.[Name],
        ///	A.Color,
        ///	A.Icon,
        ///	COUNT(*) OVER() AS TotalRows
        ///FROM 
        ///	[time].[Activity] AS A (NOLOCK)
        ///WHERE
        ///	A.IsActive = 1
        ///	AND A.[User_Id] = @User_Id
        ///	AND (@Name IS NULL OR A.[Name] LIKE @NamePat)
        ///ORDER BY [Name] ASC
        ///OFFSET @Offse [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string Activity_Search {
            get {
                return ResourceManager.GetString("Activity_Search", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to --DECLARE @User_Id INT = 1
        ///--DECLARE @DateFrom DATETIME
        ///--DECLARE @DateTo DATETIME
        ///--DECLARE @Offset INT = 0
        ///--DECLARE @Rows INT = 10
        ///--DECLARE @SortBy NVARCHAR(100) = NULL
        ///--DECLARE @SortOrder INT = NULL
        ///
        ///SELECT
        ///	E.Id,
        ///	E.[DateFrom],
        ///	E.[DateTo],
        ///	E.[Description],
        ///	A.[Name] AS ActvityName,
        ///	A.[Color] AS ActvityColor,
        ///	A.[Icon] AS ActvityIcon,
        ///	COUNT(*) OVER() AS TotalRows
        ///FROM 
        ///	[time].[Entry] AS E (NOLOCK)
        ///	JOIN [time].[Activity] AS A (NOLOCK) ON E.Activity_Id = A.Id
        ///WHERE
        ///	E.IsActive [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string Entry_Search {
            get {
                return ResourceManager.GetString("Entry_Search", resourceCulture);
            }
        }
    }
}

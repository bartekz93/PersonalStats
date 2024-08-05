using Personal.Shared.Dtos;
using Personal.Shared.Exceptions;
using System.Net;

namespace Personal.Bootstraper.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ErrorHandlerMiddleware> logger;

        public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
        {
            this.next = next;
            this.logger=logger;
        }

        public async Task Invoke(HttpContext ctx)
        {
            try
            {
                await next(ctx);
            }
            catch (BusinessException ex)
            {
                ctx.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await ctx.Response.WriteAsJsonAsync(new ErrorResponse(ex));
            }
            catch (TechnicalException ex)
            {
                LogError(ex);
                ctx.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await ctx.Response.WriteAsJsonAsync(new ErrorResponse(ex));
            }
            catch (Exception ex)
            {
                ctx.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                LogError(ex);
            }
        }

        private void LogError(Exception ex)
        {
            logger.LogError(ex, ex.Message);
        }
    }
}

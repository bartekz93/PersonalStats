using Personal.Shared.Exceptions;

namespace Personal.Shared.Dtos
{
    public class ErrorResponse
    {
        public IEnumerable<ErrorResponseItem> Errors { get; set; } = Enumerable.Empty<ErrorResponseItem>();

        public ErrorResponse(BusinessException ex)
        {
            Errors = [
                new ErrorResponseItem() {
                    Code = ex.Code,
                    Message = ex.Message,
                }
            ];
        }

        public ErrorResponse(TechnicalException ex)
        {
            Errors = [
                new ErrorResponseItem() {
                    Code = ex.Code,
                    Message = ex.Message,
                }
            ];
        }
    }

    public class ErrorResponseItem
    {
        public string Message { get; set; }
        public string Code { get; set; }
    }
}

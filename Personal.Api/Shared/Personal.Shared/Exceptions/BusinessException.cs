namespace Personal.Shared.Exceptions
{
    public class BusinessException : Exception
    {
        public string Code { get; private set; }

        private BusinessException(string code, string msg, Exception inner = null) : base(msg, inner)
        {
            Code = code;
        }

        public static BusinessException WithCode(string code, Exception inner = null)
        {
            return new BusinessException(code, string.Empty, inner);
        }

        public static BusinessException WithMessage(string msg, Exception inner = null)
        {
            return new BusinessException(string.Empty, msg, inner);
        }
    }
}

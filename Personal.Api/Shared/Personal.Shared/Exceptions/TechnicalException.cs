namespace Personal.Shared.Exceptions
{
    public class TechnicalException : Exception
    {
        public string Code { get; private set; }

        private TechnicalException(string code, string msg, Exception inner = null) : base(msg, inner)
        {
            Code = code;
        }

        public static TechnicalException WithCode(string code, Exception inner = null)
        {
            return new TechnicalException(code, string.Empty, inner);
        }

        public static TechnicalException WithMessage(string msg, Exception inner = null)
        {
            return new TechnicalException(string.Empty, msg, inner);
        }
    }
}

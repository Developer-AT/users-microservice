export enum ServiceType {
    AUTH = 'auth',
    BOOK = 'book',
    USER = 'user',
}

export enum UserRole {
    GOLD = 'gold',
    SILVER = 'silver',
    BRONZE = 'bronze',
}

export enum ClientType {
    USER = 'user',
}

export enum AuthStrategy {
    BEARER = 'Bearer',
}

export enum HttpStatusMessage {
    CONTINUE = 'Countinue',
    SWITCHING_PROTOCOLS = 'Switching Protocol',
    PROCESSING = 'Processing',
    EARLYHINTS = 'Earlyhints',
    OK = 'OK',
    CREATED = 'Created',
    ACCEPTED = 'Accepted',
    NON_AUTHORITATIVE_INFORMATION = 'Non Authoritative Information',
    NO_CONTENT = 'No Content',
    RESET_CONTENT = 'Reset Content',
    PARTIAL_CONTENT = 'Partial Content',
    AMBIGUOUS = 'Ambiguous',
    MOVED_PERMANENTLY = 'Moved Permanently',
    FOUND = 'Found',
    SEE_OTHER = 'See Other',
    NOT_MODIFIED = 'Not Modified',
    TEMPORARY_REDIRECT = 'Temporary Redirect',
    PERMANENT_REDIRECT = 'Permanent Redirect',
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unauthorized',
    PAYMENT_REQUIRED = 'Payment Required',
    FORBIDDEN = 'Forbidden',
    NOT_FOUND = 'Not Found',
    METHOD_NOT_ALLOWED = 'Method Not Allowed',
    NOT_ACCEPTABLE = 'Not Acceptable',
    PROXY_AUTHENTICATION_REQUIRED = 'Proxy Authentication Required',
    REQUEST_TIMEOUT = 'Request Timeout',
    CONFLICT = 'Conflict',
    GONE = 'Gone',
    LENGTH_REQUIRED = 'Length Required',
    PRECONDITION_FAILED = 'Precondition Failed',
    PAYLOAD_TOO_LARGE = 'Payload Too Large',
    URI_TOO_LONG = 'URI Too Long',
    UNSUPPORTED_MEDIA_TYPE = 'Unsupported Media Type',
    REQUESTED_RANGE_NOT_SATISFIABLE = 'Requested Range Not Satisfiable',
    EXPECTATION_FAILED = 'Expectation Failed',
    I_AM_A_TEAPOT = 'I Am A Teapot',
    MISDIRECTED = 'Misdirected',
    UNPROCESSABLE_ENTITY = 'Unprocessable Entity',
    FAILED_DEPENDENCY = 'Failed Dependency',
    PRECONDITION_REQUIRED = 'Precondition Required',
    TOO_MANY_REQUESTS = 'Too Many Requests',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    NOT_IMPLEMENTED = 'Not Implemented',
    BAD_GATEWAY = 'Bad Gateway',
    SERVICE_UNAVAILABLE = 'Service Unavailable',
    GATEWAY_TIMEOUT = 'Gateway Timeout',
    HTTP_VERSION_NOT_SUPPORTED = 'Http Version Not Supported',
}

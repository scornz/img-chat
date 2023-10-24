from flask import Response

from werkzeug.exceptions import (
    NotFound,
    BadRequest,
    Unauthorized,
    Forbidden,
    Conflict,
    TooManyRequests,
    InternalServerError,
)
from typing import Optional, Union


class HttpNotFound(NotFound):
    def __init__(
        self,
        exception: Optional[Union[Exception, str]] = None,
        response: Optional["Response"] = None,
    ) -> None:
        super().__init__(str(exception), response)


class HttpBadRequest(BadRequest):
    def __init__(
        self,
        exception: Optional[Union[Exception, str]] = None,
        response: Optional["Response"] = None,
    ) -> None:
        super().__init__(str(exception), response)


class HttpUnauthorized(Unauthorized):
    def __init__(
        self,
        exception: Optional[Union[Exception, str]] = None,
        response: Optional["Response"] = None,
    ) -> None:
        super().__init__(str(exception), response)


class HttpForbidden(Forbidden):
    def __init__(
        self,
        exception: Optional[Union[Exception, str]] = None,
        response: Optional["Response"] = None,
    ) -> None:
        super().__init__(str(exception), response)


class HttpConflict(Conflict):
    def __init__(
        self,
        exception: Optional[Union[Exception, str]] = None,
        response: Optional["Response"] = None,
    ) -> None:
        super().__init__(str(exception), response)


class HttpTooManyRequests(TooManyRequests):
    def __init__(
        self,
        exception: Optional[Union[Exception, str]] = None,
        response: Optional["Response"] = None,
    ) -> None:
        super().__init__(str(exception), response)


class HttpInternalServerError(InternalServerError):
    def __init__(
        self,
        exception: Optional[Union[Exception, str]] = None,
        response: Optional["Response"] = None,
    ) -> None:
        super().__init__(str(exception), response)

from datetime import datetime
from typing import Set, Type

from .http import (
    HttpBadRequest,
    HttpConflict,
    HttpForbidden,
    HttpInternalServerError,
    HttpNotFound,
    HttpTooManyRequests,
    HttpUnauthorized,
)
from werkzeug.exceptions import InternalServerError, HTTPException


# class DefaultException(Exception):
#     """
#     Default template exception
#     """

#     def __init__(self, msg: str):
#         message = f"Test: {msg}."
#         super().__init__(message)


_bad_request: Set[Type[Exception]] = set([])
_conflict: Set[Type[Exception]] = set([])
_not_found: Set[Type[Exception]] = set([])
_unauthorized: Set[Type[Exception]] = set([])
_forbidden: Set[Type[Exception]] = set([])
_too_many_requests: Set[Type[Exception]] = set([])

_server: Set[Type[Exception]] = set([])
_unknown: Set[Type[Exception]] = set([])


def handle_exception(e: Exception):
    """Given an exception that is defined in this file, provide the correct
    HTTP response. This should correlate all custom exceptions to their respective
    HTTP error. These can be changed at any time, and are defined immediatley above
    this function."""

    # Allow HTTPExceptions to go through
    if isinstance(e, HTTPException):
        return e

    et = type(e)
    if et in _bad_request:
        return HttpBadRequest(e)
    elif et in _conflict:
        return HttpConflict(e)
    elif et in _not_found:
        return HttpNotFound(e)
    elif et in _unauthorized:
        return HttpUnauthorized(e)
    elif et in _forbidden:
        return HttpForbidden(e)
    elif et in _too_many_requests:
        return HttpTooManyRequests(e)
    elif et in _server:
        return HttpInternalServerError(e)
    else:
        raise e

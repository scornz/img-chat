"""
Entirely implemented according to mongo-types specs
"""

import types
from typing import Generic, Type, TypeVar
from mongoengine import Document
from mongoengine.queryset.queryset import QuerySet


def no_op(self, _):
    return self


QuerySet.__class_getitem__ = types.MethodType(no_op, QuerySet)


U = TypeVar("U", bound=Document)


class QuerySetManager(Generic[U]):
    """Allows for typing overlay of objects."""

    def __get__(self, instance: object, cls: Type[U]) -> QuerySet[U]:
        return QuerySet(cls, cls._get_collection())

from enum import Enum
from bson import ObjectId
from typing import Optional, Union, cast, List, overload


class MongoEnum(str, Enum):
    """An enum that is subclassed as a string, making it easier for equality
    checks with values taken directly from MongoDB"""

    @classmethod
    def has_value(cls, value: str):
        return value in cls._value2member_map_


class MongoId(str):
    """A string representation of a BSON object ID. Strings are used in JSON over
    ObjectIDs, but do not verify that they are actually valid. A MongoId keeps
    that string representation, and allows for ObjectIDs and strings to be kept
    as one in the same."""

    @property
    def oid(self):
        return ObjectId(self)

    def __new__(cls, uid: Union[ObjectId, str, "MongoId"]):
        if type(uid) is str:
            if not ObjectId.is_valid(uid):
                raise Exception()
            return super().__new__(cls, uid)
        elif type(uid) is ObjectId:
            return super().__new__(cls, str(uid))
        else:
            # Just return ourselves if we are MongoId
            return cast("MongoId", uid)

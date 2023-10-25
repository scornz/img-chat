from enum import Enum


class MongoEnum(str, Enum):
    """An enum that is subclassed as a string, making it easier for equality
    checks with values taken directly from MongoDB"""

    @classmethod
    def has_value(cls, value: str):
        return value in cls._value2member_map_

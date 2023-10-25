# Document
from mongoengine.document import DynamicDocument
from mongoengine.fields import (
    DateTimeField,
    IntField,
)

# External
from datetime import datetime
from bson.objectid import ObjectId
from utils.exceptions import ChatNotFoundException
from utils.mongo import MongoId
from utils.annotate import QuerySetManager


class Chat(DynamicDocument):
    """Represents a conversation between a user and AI. Contains overall
    generic information about the chat (such as number of messages) and when
    it was created."""

    # Helpers to ensure static types
    id: ObjectId
    objects = QuerySetManager["Chat"]()

    # Time at which this chat was first created
    timestamp = DateTimeField(default=datetime.utcnow)
    # The total number of messages sent in this chat
    num_messages = IntField(default=0)

    meta = {
        "collection": "chats",
        "auto_create_index": False,
        "indexes": [],
    }


def query_chat_by_id(chat_id: MongoId):
    """Return the chat with the given ID."""
    query = Chat.objects(id=chat_id)
    if not query:
        raise ChatNotFoundException(chat_id)

    return query

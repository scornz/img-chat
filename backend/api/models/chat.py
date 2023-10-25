# Document
from mongoengine.document import DynamicDocument
from mongoengine.fields import (
    DateTimeField,
    IntField,
)

# External
from datetime import datetime
from bson.objectid import ObjectId
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

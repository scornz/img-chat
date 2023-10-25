# Document
from mongoengine.document import DynamicDocument
from mongoengine.fields import (
    DateTimeField,
    StringField,
    ObjectIdField,
    EnumField,
)

# External
from datetime import datetime
from bson.objectid import ObjectId
from utils.mongo import MongoEnum, MongoId
from utils.annotate import QuerySetManager


class MessageSenderType(MongoEnum):
    USER = "user"
    AI = "ai"


class MessageType(MongoEnum):
    TEXT = "text"
    IMAGE = "image"


class Message(DynamicDocument):
    """Represents a message sent by an AI or by the user. This message will
    contain either text or an image, depending on the message. Each message
    will be connected to a chat ID, which is linked to a session.
    """

    # Helpers to ensure static types
    id: ObjectId
    objects = QuerySetManager["Message"]()

    # The chat that this message is a part of
    chat_id = ObjectIdField(required=True)
    # The type of the message (either an image or text)
    msg_type = EnumField(MessageType, db_field="type", required=True)
    # The type of the message (either an image or text)
    sender = EnumField(MessageSenderType, required=True)
    # The content of the message (this will not necessarily have text, if the
    # sent message is only an image and nothing else)
    text = StringField(default="")
    # Time at which this message was sent/received
    timestamp = DateTimeField(default=datetime.utcnow)
    # The image contained within this message (is not required if this is not a image message)
    image_id = ObjectIdField()

    meta = {
        "collection": "messages",
        "auto_create_index": False,
        "indexes": [
            # All messages in a specific chat
            {"fields": ["chat_id", "-id"], "name": "new"},
        ],
    }


def query_messages_by_chat(chat_id: MongoId):
    """Return the entire series of sent/received messages for a given chat."""
    query = Message.objects(chat_id=chat_id)
    return query

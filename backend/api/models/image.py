# Document
from mongoengine.document import DynamicDocument
from mongoengine.fields import (
    DateTimeField,
    StringField,
)

# External
from datetime import datetime
from bson.objectid import ObjectId
from utils.annotate import QuerySetManager


class Image(DynamicDocument):
    """Represents a generated image by AI that was sent to the user. It is
    usually associated with a message (unless something goes wrong)"""

    # Helpers to ensure static types
    id: ObjectId
    objects = QuerySetManager["Image"]()

    # The total number of messages sent in this chat
    s3_image = StringField(required=True)
    # Time at which this chat was first created
    timestamp = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "images",
        "auto_create_index": False,
        "indexes": [],
    }

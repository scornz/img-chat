# Document
from mongoengine.document import DynamicDocument
from mongoengine.fields import (
    DateTimeField,
    StringField,
)

# External
from datetime import datetime
from bson.objectid import ObjectId
from utils.exceptions import ImageNotFoundException
from utils.annotate import QuerySetManager
from utils.mongo import MongoId

# Typing
from typing import Collection


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


def query_image_by_id(image_id: MongoId):
    """Return the image with the given ID."""
    query = Image.objects(id=image_id)
    if not query:
        raise ImageNotFoundException(image_id)

    return query


def query_images_by_id(image_ids: Collection[MongoId]):
    """Return the images that have an ID within this set."""
    query = Image.objects(id__in=image_ids)
    return query

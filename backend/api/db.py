import boto3
from botocore.config import Config
from flask_mongoengine import MongoEngine
from os import environ

# Initialize the database
db = MongoEngine()

# All necessary AWS information
# The bucket name
DEFAULT_BUCKET = environ.get("S3_BUCKET_NAME")
# ID of the access key
AWS_ACCESS_KEY_ID = environ.get("AWS_ACCESS_KEY_ID")
# Secret of the access key
AWS_SECRET_ACCESS_KEY = environ.get("AWS_SECRET_ACCESS_KEY")
# Usually us-east-1
AWS_DEFAULT_REGION = environ.get("AWS_DEFAULT_REGION")

"""Centralized access to S3 """
s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)

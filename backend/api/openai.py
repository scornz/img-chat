import openai
from os import environ

# Set OPENAI key as specified in environment variables
openai.api_key = environ["OPENAI_API_KEY"]

# Set org id to Princeton University
openai.organization = "org-Ba5EcVDgOPdpumpTUYwouywa"

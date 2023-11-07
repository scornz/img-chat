from flask import Blueprint, request, jsonify
from api.models.image import Image
from api.models.message import Message, MessageType, MessageSenderType
from api.models.chat import Chat, query_chat_by_id
from api.openai import openai
from api.db import db

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/start_chat', methods=['POST'])
def start_chat():
    """NOTE: This is not yet tested with the db"""
    # Create a new chat
    chat = Chat()
    chat.save()

    return jsonify({'message': 'Chat started successfully', 'chat_id': str(chat.id)}), 200

@generate_bp.route('/generate_image', methods=['POST'])
def generate_image():
    """NOTE: This is not yet tested with the db"""

    # Get the prompt and chat_id from the request body
    data = request.get_json()
    prompt = data.get('prompt')
    chat_id = data.get('chat_id')

    if not prompt or not chat_id:
        return jsonify({'error': 'Prompt and chat_id are required'}), 400

    # Generate the image
    response = openai.Image.create(
        model="dall-e-3",
        prompt=prompt,
        n=1,
        size="1024x1024",
    )
    image_url = response['data'][0]['url']

    # Save the image to the database
    image = Image(s3_image=image_url)
    image.save()

    # Get the chat
    chat = query_chat_by_id(chat_id)

    # Create a new message with the image
    message = Message(
        chat_id=chat.id,
        msg_type=MessageType.IMAGE,
        sender=MessageSenderType.AI,
        image_id=image.id
    )
    message.save()

    # Update the number of messages in the chat
    chat.num_messages += 1
    chat.save()

    return jsonify({'message': 'Image generated successfully', 'image_url': image_url}), 200

@generate_bp.route('/test_generate_image', methods=['POST'])
def test_generate_image():
    """This is a test route while the chat_id and other db logic is still untested.
    It doesn't save anything to db, and just returns the image_url."""

    # Get the prompt from the request body
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    # Generate the image
    response = openai.Image.create(
        model="dall-e-3",
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    image_url = response['data'][0]['url']

    return jsonify({'message': 'Image generated successfully', 'image_url': image_url}), 200

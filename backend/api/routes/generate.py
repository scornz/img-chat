from flask import Blueprint, request, jsonify
from api.models.image import Image
from api.models.message import Message, MessageType, MessageSenderType
from api.models.chat import Chat, query_chat_by_id
from api.openai import client
from api.db import db
import json

generate_bp = Blueprint('generate', __name__)

STARTING_PROMPT = "You are an artist that will be creating an image based on the prompt that the user will input. In order to create your work, you should ask a clarifying question about the user-inputted initial prompt to design a new prompt. After a response from the patron, you should acknowledge their answer and ask another clarifying question about their answer or about the original prompt as if it were a conversation. Only ask one question at a time and do not stop asking more clarifying questions."
FINAL_PROMPT = "Respond with a refined prompt to input to DALL-E for image generation based on the user's previous answers. Start your prompt with 'Please create an image of...'"
NUM_QUESTIONS_CUI = 3

@generate_bp.route('/start_chat', methods=['POST'])
def start_chat():
    """NOTE: This is not yet tested with the db"""
    # Create a new chat
    print("Please work")
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
    response = client.images.generate(
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
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    image_url = response.data[0].url

    return jsonify({'message': 'Image generated successfully', 'image_url': image_url}), 200

@generate_bp.route('/conversation', methods=['POST'])
def continue_conversation():
    
    data = request.get_json()
    user_message = data.get('message')
    conversation_history = data.get('history')
    
    if not user_message:
        return jsonify({'error': 'Message is required'}), 400

    # Read in conversation history from client if it exists
    conversation_list = []
    if not conversation_history:
        conversation_list.append({"role": "system", "content": STARTING_PROMPT})
    else:
        conversation_list = json.loads(conversation_history)
    conversation_list.append({"role": "user", "content": user_message})
    
    if len(conversation_list) == (NUM_QUESTIONS_CUI + 1) * 2:
        conversation_list.append({"role": "system", "content": FINAL_PROMPT})
        
    chat_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=conversation_list
    )
    print(chat_response.choices[0].message.content)
    conversation_list.append({"role": "assistant", "content": chat_response.choices[0].message.content})
    
    print("length2", len(conversation_list))
    # Check if image needs to be created, checks length of chat history to see if NUM_QUESTIONS_CUI have been answered
    if len(conversation_list) == (NUM_QUESTIONS_CUI + 1) * 2 + 2:
        print("Creating photo")
        response = client.images.generate(
            model="dall-e-3",
            prompt=chat_response.choices[0].message.content,
            n=1,
            size="1024x1024"
        )
            
        image_url = response.data[0].url
        return jsonify({'message': 'Image generated successfully', 'image_url': image_url}), 200
    
    else:
        return jsonify({'message': chat_response.choices[0].message.content, 'updated_history': json.dumps(conversation_list)})

import { WeekData } from "../types";

export const week5Data: WeekData = {
  title: "Fine-tuning",
  exercises: [
    {
      title: "Prepare Training Data",
      description: "Format data for fine-tuning a custom model",
      category: "fine-tuning",
      initialCode: `import json
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def prepare_training_data():
    """Prepare data in the correct format for fine-tuning"""
    training_examples = [
        {
            "messages": [
                {"role": "system", "content": "You are a helpful customer service assistant."},
                {"role": "user", "content": "I want to return my order"},
                {"role": "assistant", "content": "I'd be happy to help you with your return. Can you please provide your order number?"}
            ]
        },
        {
            "messages": [
                {"role": "system", "content": "You are a helpful customer service assistant."},
                {"role": "user", "content": "Where is my package?"},
                {"role": "assistant", "content": "Let me help you track your package. Please provide your tracking number and I'll look it up for you."}
            ]
        }
    ]
    
    # Save to JSONL format
    with open('training_data.jsonl', 'w') as f:
        for example in training_examples:
            f.write(json.dumps(example) + '\\n')
    
    return "Training data prepared successfully!"

def upload_training_file():
    """Upload training file to OpenAI"""
    try:
        response = client.files.create(
            file=open('training_data.jsonl', 'rb'),
            purpose='fine-tune'
        )
        return f"File uploaded with ID: {response.id}"
    except Exception as e:
        return f"Error uploading file: {e}"

# Prepare and upload training data
print(prepare_training_data())
print(upload_training_file())`,
    },
  ],
};

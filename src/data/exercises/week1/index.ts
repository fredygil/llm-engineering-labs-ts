import { WeekData } from "../types";

export const week1Data: WeekData = {
  title: "Introduction to LLMs",
  exercises: [
    {
      title: "First API Call",
      description:
        "Make your first call to the OpenAI API and understand the basic structure",
      category: "basic-api",
      initialCode: `import openai
from openai import OpenAI
import os

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Make a simple completion request
def simple_completion():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "Hello! Can you introduce yourself?"}
        ],
        max_tokens=100
    )
    
    return response.choices[0].message.content

# Execute the function
result = simple_completion()
print(result)`,
    },
    {
      title: "Understanding Tokens",
      description:
        "Learn about tokenization and how it affects API costs and limits",
      category: "tokenization",
      initialCode: `import tiktoken

def count_tokens(text, model="gpt-3.5-turbo"):
    """Count the number of tokens in a text string."""
    encoding = tiktoken.encoding_for_model(model)
    tokens = encoding.encode(text)
    return len(tokens)

# Test with different texts
texts = [
    "Hello world!",
    "This is a longer sentence to demonstrate tokenization.",
    "The quick brown fox jumps over the lazy dog."
]

for text in texts:
    token_count = count_tokens(text)
    print(f"Text: '{text}'")
    print(f"Token count: {token_count}")
    print("---")`,
    },
  ],
};


export interface Exercise {
  title: string;
  description: string;
  initialCode: string;
  category: string;
}

export interface WeekData {
  title: string;
  exercises: Exercise[];
}

export const exerciseData: Record<number, WeekData> = {
  1: {
    title: "Introduction to LLMs",
    exercises: [
      {
        title: "First API Call",
        description: "Make your first call to the OpenAI API and understand the basic structure",
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
print(result)`
      },
      {
        title: "Understanding Tokens",
        description: "Learn about tokenization and how it affects API costs and limits",
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
    print("---")`
      }
    ]
  },
  2: {
    title: "Prompt Engineering",
    exercises: [
      {
        title: "Zero-shot vs Few-shot",
        description: "Compare different prompting strategies for better results",
        category: "prompt-engineering",
        initialCode: `from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def zero_shot_example():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "Classify the sentiment of this text: 'I love this product!'"}
        ]
    )
    return response.choices[0].message.content

def few_shot_example():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": """
            Classify the sentiment as positive, negative, or neutral:
            
            Text: "This movie was amazing!"
            Sentiment: positive
            
            Text: "I didn't like the food."
            Sentiment: negative
            
            Text: "The weather is okay."
            Sentiment: neutral
            
            Text: "I love this product!"
            Sentiment:
            """}
        ]
    )
    return response.choices[0].message.content

# Compare both approaches
print("Zero-shot result:", zero_shot_example())
print("Few-shot result:", few_shot_example())`
      }
    ]
  },
  3: {
    title: "Function Calling",
    exercises: [
      {
        title: "Weather Function",
        description: "Implement function calling to get weather information",
        category: "function-calling",
        initialCode: `from openai import OpenAI
import json
import os

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def get_weather(location):
    """Mock weather function"""
    return f"The weather in {location} is sunny and 75°F"

def function_calling_example():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "What's the weather like in New York?"}
        ],
        functions=[
            {
                "name": "get_weather",
                "description": "Get the current weather for a location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city name"
                        }
                    },
                    "required": ["location"]
                }
            }
        ],
        function_call="auto"
    )
    
    message = response.choices[0].message
    
    if message.function_call:
        function_name = message.function_call.name
        arguments = json.loads(message.function_call.arguments)
        
        if function_name == "get_weather":
            weather_result = get_weather(arguments["location"])
            return weather_result
    
    return message.content

result = function_calling_example()
print(result)`
      }
    ]
  },
  4: {
    title: "Embeddings and Vector Search",
    exercises: [
      {
        title: "Text Embeddings",
        description: "Generate and work with text embeddings for semantic search",
        category: "embeddings",
        initialCode: `from openai import OpenAI
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def get_embedding(text, model="text-embedding-ada-002"):
    """Get embedding for a text"""
    response = client.embeddings.create(
        input=text,
        model=model
    )
    return response.data[0].embedding

def semantic_search(query, documents):
    """Find most similar document to query"""
    # Get embeddings
    query_embedding = get_embedding(query)
    doc_embeddings = [get_embedding(doc) for doc in documents]
    
    # Calculate similarities
    similarities = []
    for doc_emb in doc_embeddings:
        similarity = cosine_similarity([query_embedding], [doc_emb])[0][0]
        similarities.append(similarity)
    
    # Find best match
    best_idx = np.argmax(similarities)
    return documents[best_idx], similarities[best_idx]

# Example usage
documents = [
    "The cat sat on the mat",
    "Python is a programming language",
    "Machine learning is fascinating",
    "I love cooking pasta"
]

query = "What is a good programming language?"
best_doc, score = semantic_search(query, documents)

print(f"Query: {query}")
print(f"Best match: {best_doc}")
print(f"Similarity score: {score:.3f}")`
      }
    ]
  },
  5: {
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
print(upload_training_file())`
      }
    ]
  },
  6: {
    title: "Agents and Tool Use",
    exercises: [
      {
        title: "Simple Agent",
        description: "Build a basic agent that can use multiple tools",
        category: "agents",
        initialCode: `from openai import OpenAI
import json
import os

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class SimpleAgent:
    def __init__(self):
        self.tools = {
            "calculator": self.calculator,
            "weather": self.get_weather,
            "search": self.web_search
        }
    
    def calculator(self, expression):
        """Simple calculator tool"""
        try:
            result = eval(expression)  # Note: Use with caution in production
            return f"Calculation result: {result}"
        except:
            return "Error in calculation"
    
    def get_weather(self, location):
        """Mock weather tool"""
        return f"Weather in {location}: Sunny, 72°F"
    
    def web_search(self, query):
        """Mock search tool"""
        return f"Search results for '{query}': [Mock search results]"
    
    def process_request(self, user_input):
        """Process user request and decide which tool to use"""
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": """You are a helpful assistant with access to tools.
                Available tools: calculator, weather, search
                Respond with the tool name and parameters in JSON format when needed."""},
                {"role": "user", "content": user_input}
            ]
        )
        
        # Simple tool detection (in practice, use function calling)
        content = response.choices[0].message.content
        
        if "calculator" in content.lower():
            return self.calculator("2 + 2")
        elif "weather" in content.lower():
            return self.get_weather("New York")
        elif "search" in content.lower():
            return self.web_search("LLM agents")
        else:
            return content

# Example usage
agent = SimpleAgent()
result = agent.process_request("What's 15 multiplied by 8?")
print(result)`
      }
    ]
  },
  7: {
    title: "RAG (Retrieval Augmented Generation)",
    exercises: [
      {
        title: "Document QA System",
        description: "Build a question-answering system using RAG",
        category: "rag",
        initialCode: `from openai import OpenAI
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class SimpleRAG:
    def __init__(self):
        self.documents = [
            "LLMs are large language models trained on vast amounts of text data.",
            "GPT-3 and GPT-4 are examples of powerful language models created by OpenAI.",
            "Fine-tuning allows you to customize a model for specific tasks.",
            "Embeddings convert text into numerical vectors for semantic search.",
            "RAG combines retrieval and generation for better question answering."
        ]
        self.vectorizer = TfidfVectorizer()
        self.doc_vectors = self.vectorizer.fit_transform(self.documents)
    
    def retrieve_relevant_docs(self, query, top_k=2):
        """Retrieve most relevant documents for the query"""
        query_vector = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vector, self.doc_vectors).flatten()
        
        # Get top_k most similar documents
        top_indices = np.argsort(similarities)[-top_k:][::-1]
        relevant_docs = [self.documents[i] for i in top_indices]
        
        return relevant_docs
    
    def generate_answer(self, query, context_docs):
        """Generate answer using retrieved context"""
        context = "\\n".join(context_docs)
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"""Answer the question based on the following context:
                
                Context:
                {context}
                
                If the answer cannot be found in the context, say so."""},
                {"role": "user", "content": query}
            ]
        )
        
        return response.choices[0].message.content
    
    def answer_question(self, query):
        """Complete RAG pipeline"""
        # Retrieve relevant documents
        relevant_docs = self.retrieve_relevant_docs(query)
        
        # Generate answer
        answer = self.generate_answer(query, relevant_docs)
        
        return {
            "question": query,
            "relevant_docs": relevant_docs,
            "answer": answer
        }

# Example usage
rag_system = SimpleRAG()
result = rag_system.answer_question("What are LLMs?")

print(f"Question: {result['question']}")
print(f"Relevant docs: {result['relevant_docs']}")
print(f"Answer: {result['answer']}")`
      }
    ]
  },
  8: {
    title: "Advanced Applications",
    exercises: [
      {
        title: "Multi-Modal Processing",
        description: "Work with text and images using GPT-4V",
        category: "multimodal",
        initialCode: `from openai import OpenAI
import base64
import os

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def encode_image(image_path):
    """Encode image to base64"""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def analyze_image(image_path, prompt):
    """Analyze image with GPT-4V"""
    base64_image = encode_image(image_path)
    
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        max_tokens=300
    )
    
    return response.choices[0].message.content

def text_to_image_description():
    """Generate detailed image descriptions"""
    descriptions = [
        "A serene lake surrounded by mountains at sunset",
        "A bustling city street with neon lights at night",
        "A cozy coffee shop interior with warm lighting"
    ]
    
    enhanced_descriptions = []
    
    for desc in descriptions:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert at creating detailed, vivid image descriptions for AI image generation."},
                {"role": "user", "content": f"Enhance this image description with more detail: {desc}"}
            ]
        )
        enhanced_descriptions.append(response.choices[0].message.content)
    
    return enhanced_descriptions

# Example usage (image analysis would require an actual image file)
print("Enhanced image descriptions:")
enhanced_descs = text_to_image_description()
for i, desc in enumerate(enhanced_descs, 1):
    print(f"{i}. {desc}")
    print("---")

# Note: For image analysis, you would need to provide an actual image file
# result = analyze_image("path/to/your/image.jpg", "What do you see in this image?")`
      }
    ]
  }
};

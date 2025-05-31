import { WeekData } from "../types";

export const week4Data: WeekData = {
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
print(f"Similarity score: {score:.3f}")`,
    },
  ],
};

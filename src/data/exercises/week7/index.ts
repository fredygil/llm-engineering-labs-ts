import { WeekData } from "../types";

export const week7Data: WeekData = {
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
print(f"Answer: {result['answer']}")`,
    },
  ],
};

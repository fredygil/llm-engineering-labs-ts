import { WeekData } from "../types";

export const week2Data: WeekData = {
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
print("Few-shot result:", few_shot_example())`,
    },
  ],
};

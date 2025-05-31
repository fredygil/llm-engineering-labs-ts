import { WeekData } from "../types";

export const week8Data: WeekData = {
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
# result = analyze_image("path/to/your/image.jpg", "What do you see in this image?")`,
    },
  ],
};

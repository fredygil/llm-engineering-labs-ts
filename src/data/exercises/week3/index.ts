import { WeekData } from "../types";

export const week3Data: WeekData = {
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
print(result)`,
    },
  ],
};

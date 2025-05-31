import { WeekData } from "../types";

export const week6Data: WeekData = {
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
print(result)`,
    },
  ],
};

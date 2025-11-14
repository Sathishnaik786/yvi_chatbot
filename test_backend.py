import requests
import os

# Try to load dotenv, but continue even if it's not available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Get the backend URL
backend_url = "http://localhost:5000"

# Test the health endpoint
try:
    response = requests.get(f"{backend_url}/health", timeout=10)
    print(f"Health check response: {response.status_code}")
    print(f"Response data: {response.json()}")
except Exception as e:
    print(f"Health check failed: {e}")

# Test the chat endpoint
try:
    test_message = "Hello, what services does YVI Technologies offer?"
    response = requests.post(
        f"{backend_url}/chat",
        json={"message": test_message},
        timeout=30
    )
    print(f"\nChat response: {response.status_code}")
    if response.status_code == 200:
        print(f"Reply: {response.json().get('reply', 'No reply found')}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Chat test failed: {e}")
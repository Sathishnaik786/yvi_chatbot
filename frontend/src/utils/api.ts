import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export interface ChatRequest {
  message: string;
  sessionId?: string;
  settings?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  };
}

export interface ChatResponse {
  reply: string;
  source?: string;
}

export const sendMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await axios.post<ChatResponse>(`${API_BASE_URL}/chat`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      }
      if (!error.response) {
        throw new Error('Network error. Please check your connection and ensure the backend server is running.');
      }
      throw new Error(error.response.data?.error || 'Failed to send message. Please try again.');
    }
    throw error;
  }
};

export const deleteChatSession = async (sessionId: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/api/chat-sessions/${sessionId}`, {
      timeout: 10000,
    });
    return true;
  } catch (error) {
    console.error('Error deleting chat session:', error);
    return false;
  }
};
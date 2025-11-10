import type { ChatSession } from '@/hooks/useChat';
import type { Favorite } from '@/hooks/useFavorites';
import type { ConversationTemplate } from '@/hooks/useTemplates';
import type { Message } from '@/hooks/useChat';

export interface ShareData {
  type: 'conversation' | 'favorites' | 'template';
  version: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  createdAt: number;
}

type ConversationData = {
  title?: string;
  messages?: Message[];
  messageCount?: number;
};

type FavoritesData = Array<{
  messageContent: string;
  category: string;
  tags: string[];
  note: string;
}>;

type TemplateData = {
  name?: string;
  description?: string;
  icon?: string;
  category?: string;
  systemPrompt?: string;
  starterPrompts?: string[];
  settings?: Record<string, unknown>;
};

export const generateShareCode = (data: ShareData): string => {
  const jsonString = JSON.stringify(data);
  const base64 = btoa(jsonString);
  return base64;
};

export const parseShareCode = (code: string): ShareData | null => {
  try {
    const jsonString = atob(code);
    const data = JSON.parse(jsonString);
    
    // Validate structure
    if (!data.type || !data.version || !data.data) {
      return null;
    }
    
    return data as ShareData;
  } catch (e) {
    console.error('Failed to parse share code:', e);
    return null;
  }
};

export const shareConversation = (session: ChatSession): string => {
  const shareData: ShareData = {
    type: 'conversation',
    version: '1.0',
    data: {
      title: session.title,
      messages: session.messages,
      messageCount: session.messages.length,
    },
    createdAt: Date.now(),
  };
  
  return generateShareCode(shareData);
};

export const shareFavorites = (favorites: Favorite[]): string => {
  const shareData: ShareData = {
    type: 'favorites',
    version: '1.0',
    data: favorites.map(fav => ({
      messageContent: fav.messageContent,
      category: fav.category,
      tags: fav.tags,
      note: fav.note,
    })),
    createdAt: Date.now(),
  };
  
  return generateShareCode(shareData);
};

export const shareTemplate = (template: ConversationTemplate): string => {
  const shareData: ShareData = {
    type: 'template',
    version: '1.0',
    data: {
      name: template.name,
      description: template.description,
      icon: template.icon,
      category: template.category,
      systemPrompt: template.systemPrompt,
      starterPrompts: template.starterPrompts,
      settings: template.settings,
    },
    createdAt: Date.now(),
  };
  
  return generateShareCode(shareData);
};

export const shareMessage = (message: Message): string => {
  const shareData: ShareData = {
    type: 'conversation',
    version: '1.0',
    data: {
      title: 'Shared Message',
      messages: [message],
      messageCount: 1,
    },
    createdAt: Date.now(),
  };
  
  return generateShareCode(shareData);
};

export const generateShareableLink = (code: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/?share=${encodeURIComponent(code)}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    console.error('Failed to copy to clipboard:', e);
    return false;
  }
};

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from '@/database/db';
import { Timestamp } from 'firebase/firestore';

interface ChatEntry {
  user: string;
  ai: string;
  uid: string;
  date: number; 
  id: string;
}


interface ChatState {
  chatHistory: ChatEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chatHistory: [],
  loading: false,
  error: null,
};

export const fetchChatHistory = createAsyncThunk<ChatEntry[], string, { rejectValue: string }>(
  'chat/fetchChatHistory',
  async (uid, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'chats'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          date: data.date instanceof Timestamp 
            ? data.date.toMillis() 
            : new Date(data.date).getTime(), 
        };
      }) as ChatEntry[];
    } catch (error: any) {
      console.log("------------------------------");
      console.log(JSON.stringify(error.message));
      console.log("------------------------------");
      return rejectWithValue(error.message);
    }
  }
);

interface SendMessagePayload {
  prompt: string;
  chatHistory: ChatEntry[];
  uid: string;
}

export const sendMessage = createAsyncThunk<ChatEntry, SendMessagePayload, { rejectValue: string }>(
  'chat/sendMessage',
  async ({ prompt, chatHistory, uid }, { rejectWithValue }) => {
    try {
      const genAI = new GoogleGenerativeAI(`${process.env.NEXT_PUBLIC_API_AI}`);
      const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const chat = model.startChat({
        history: chatHistory.map((chat) => ({
          role: 'user',
          parts: [{ text: chat.user }],
        })),
      });

      const result = await chat.sendMessage(prompt);
      const aiResponse = await result.response.text();
      const newChat: ChatEntry = {
        user: prompt,
        ai: aiResponse,
        uid,
        date: Timestamp.now().toMillis(), 
        id: '',
      };
      const docRef = await addDoc(collection(db, 'chats'), newChat);
      newChat.id = docRef.id;
      return newChat;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action: PayloadAction<ChatEntry[]>) => {
        state.loading = false;
        state.chatHistory = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch chat history';
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<ChatEntry>) => {
        state.loading = false;
        state.chatHistory.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send message';
      });
  },
});

export default chatSlice.reducer;
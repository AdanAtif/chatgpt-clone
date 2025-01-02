import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/database/db';

// Define types for Conversation and initial state
interface Conversation {
  id: string;
  name: string;
}

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchConversations = createAsyncThunk<Conversation[], void, { rejectValue: string }>(
  'conversations/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'conversations'));
      const conversations: Conversation[] = [];
      querySnapshot.forEach((doc) => {
        conversations.push({ id: doc.id, name: doc.data().name });
      });
      return conversations;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addConversation = createAsyncThunk<Conversation, string, { rejectValue: string }>(
  'conversations/addConversation',
  async (name, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'conversations'), {
        name,
        createdAt: new Date(),
      });
      return { id: docRef.id, name };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteConversation = createAsyncThunk<string, string, { rejectValue: string }>(
  'conversations/deleteConversation',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'conversations', id));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch conversations';
      })
      .addCase(addConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addConversation.fulfilled, (state, action: PayloadAction<Conversation>) => {
        state.loading = false;
        state.conversations.push(action.payload);
      })
      .addCase(addConversation.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add conversation';
      })
      .addCase(deleteConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConversation.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.conversations = state.conversations.filter((conv) => conv.id !== action.payload);
      })
      .addCase(deleteConversation.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete conversation';
      });
  },
});

export default conversationSlice.reducer;
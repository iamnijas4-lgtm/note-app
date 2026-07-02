import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import ApiUrls from "@/config/apiUrls";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
       const res = await api.get(ApiUrls.NOTES.GET_ALL);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (data: { title: string; content: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(ApiUrls.NOTES.CREATE, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Create failed");
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (
    data: { id: string; title: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(ApiUrls.NOTES.UPDATE(data.id), {
        title: data.title,
        content: data.content,
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(ApiUrls.NOTES.DELETE(id));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })

      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.unshift(action.payload);
      })

      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        );
      })

      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("notes/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("notes/") && action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default noteSlice.reducer;
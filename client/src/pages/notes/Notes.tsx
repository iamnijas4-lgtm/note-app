import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Topbar from "@/components/layout/Topbar";
import NoteCard from "@/components/notes/NoteCard";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/input";
import { logout } from "@/features/auth/authSlice";
import { createNote, deleteNote, fetchNotes, updateNote } from "@/features/notes/noteSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Notes() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { notes, loading, error } = useAppSelector((state) => state.notes);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) return;

    if (editId) {
      await dispatch(
        updateNote({
          id: editId,
          title: form.title,
          content: form.content,
        })
      );

      setEditId(null);
    } else {
      await dispatch(createNote(form));
    }

    setForm({
      title: "",
      content: "",
    });
  };

  const editHandler = (note: { _id: string; title: string; content: string }) => {
    setEditId(note._id);
    setForm({
      title: note.title,
      content: note.content,
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <main className="dashboard">
      <Topbar onLogout={logoutHandler} />

      <section className="dashboard-grid">
        <aside className="create-card">
          <h1 className="section-title">
            {editId ? "Update note" : "Create note"}
          </h1>

          <p className="section-desc">
            Write ideas, plans, tasks, study notes, or private thoughts.
          </p>

          <form className="form" onSubmit={submitHandler}>
            <Input
              label="Title"
              placeholder="Note title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Textarea
              label="Content"
              placeholder="Write your note..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />

            <Button disabled={loading}>
              {loading
                ? "Saving..."
                : editId
                ? "Update note"
                : "Create note"}
            </Button>

            {editId && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setEditId(null);
                  setForm({ title: "", content: "" });
                }}
              >
                Cancel edit
              </Button>
            )}

            <Alert type="error" message={error} />
          </form>
        </aside>

        <section className="notes-section">
          <h2 className="section-title">My Notes</h2>
          <p className="section-desc">
            {notes.length} saved {notes.length === 1 ? "note" : "notes"}
          </p>

          {notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet</h3>
              <p>Create your first premium note from the left panel.</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={() => editHandler(note)}
                  onDelete={() => dispatch(deleteNote(note._id))}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
import Button from "../ui/Button";

interface NoteCardProps {
  note: {
    _id: string;
    title: string;
    content: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <article className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>

      <div className="note-actions">
        <Button variant="ghost" onClick={onEdit}>
          Edit
        </Button>

        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
}
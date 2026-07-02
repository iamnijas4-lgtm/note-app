import Button from "../ui/Button";

interface TopbarProps {
  onLogout: () => void;
}

export default function Topbar({ onLogout }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="logo">
        <div className="logo-mark">N</div>

        <div>
          <div className="logo-title">NoteSpace</div>
          <div className="logo-subtitle">Premium private notes</div>
        </div>
      </div>

      <Button variant="ghost" onClick={onLogout}>
        Logout
      </Button>
    </header>
  );
}
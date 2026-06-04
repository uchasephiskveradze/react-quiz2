import { Plus } from 'lucide-react';

type FloatingAddButtonProps = {
  onClick: () => void;
};

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      type="button"
      className="add-btn"
      onClick={onClick}
      aria-label="Add new note"
    >
      <Plus size={32} aria-hidden />
    </button>
  );
}

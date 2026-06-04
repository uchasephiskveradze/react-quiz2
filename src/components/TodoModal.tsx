import { useEffect, useId, useRef } from 'react';

type TodoModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (value: string) => void;
};

export function TodoModal({
  isOpen,
  isEditing,
  value,
  onChange,
  onClose,
  onSubmit,
}: TodoModalProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId}>{isEditing ? 'EDIT NOTE' : 'NEW NOTE'}</h2>
        <label htmlFor="todo-input" className="visually-hidden">
          {isEditing ? 'Edit note text' : 'New note text'}
        </label>
        <input
          ref={inputRef}
          id="todo-input"
          className="modal-input"
          type="text"
          placeholder="Input your note..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <div className="modal-spacer" aria-hidden />
        <div className="modal-actions">
          <button type="button" className="btn btn-modal-cancel" onClick={onClose}>
            CANCEL
          </button>
          <button
            type="button"
            className="btn btn-modal-apply"
            onClick={handleSubmit}
            disabled={!value.trim()}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
}

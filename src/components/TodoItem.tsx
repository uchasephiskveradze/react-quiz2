import { Edit2, Trash2 } from 'lucide-react';
import type { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const checkboxId = `todo-${todo.id}`;

  return (
    <li className="todo-item">
      <input
        id={checkboxId}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.task}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <label htmlFor={checkboxId} className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.task}
      </label>
      <div className="actions">
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => onEdit(todo)}
          aria-label={`Edit "${todo.task}"`}
        >
          <Edit2 size={18} aria-hidden />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete "${todo.task}"`}
        >
          <Trash2 size={18} aria-hidden />
        </button>
      </div>
    </li>
  );
}

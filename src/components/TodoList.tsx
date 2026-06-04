import emptyDark from '../assets/empty_dark.png';
import emptyLight from '../assets/empty_light.png';
import type { Todo } from '../types';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  totalCount: number;
  isDarkMode: boolean;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export function TodoList({
  todos,
  totalCount,
  isDarkMode,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-state" role="status">
        {totalCount === 0 ? (
          <>
            <img
              src={isDarkMode ? emptyDark : emptyLight}
              alt=""
              className="empty-state-image"
            />
            <p className="empty-state-label">Empty...</p>
          </>
        ) : (
          <>
            <p>No results found...</p>
            <p className="empty-state-hint">Try clearing search or setting filter to ALL.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-live="polite">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

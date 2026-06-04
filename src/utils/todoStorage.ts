import { STORAGE_KEYS } from '../constants';
import type { Todo } from '../types';

export function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeTodo(value: unknown): Todo | null {
  if (typeof value !== 'object' || value === null) return null;

  const record = value as Record<string, unknown>;
  const task =
    typeof record.task === 'string'
      ? record.task
      : typeof record.text === 'string'
        ? record.text
        : typeof record.title === 'string'
          ? record.title
          : null;

  if (!task?.trim()) return null;

  const id =
    typeof record.id === 'string'
      ? record.id
      : record.id != null
        ? String(record.id)
        : createId();

  return {
    id,
    task: task.trim(),
    completed: Boolean(record.completed),
  };
}

export function loadTodos(): Todo[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TODOS);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    const seen = new Set<string>();
    const todos: Todo[] = [];

    for (const item of parsed) {
      const todo = normalizeTodo(item);
      if (!todo) continue;

      if (seen.has(todo.id)) {
        todos.push({ ...todo, id: createId() });
      } else {
        seen.add(todo.id);
        todos.push(todo);
      }
    }

    return todos;
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
}

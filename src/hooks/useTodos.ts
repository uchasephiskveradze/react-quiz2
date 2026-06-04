import { useCallback, useMemo, useState } from 'react';
import { createId, loadTodos, saveTodos } from '../utils/todoStorage';
import type { Todo } from '../types';

export type TodoFilter = 'all' | 'complete' | 'incomplete';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<TodoFilter>('all');

  const updateTodos = useCallback((updater: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => {
      const next = updater(prev);
      saveTodos(next);
      return next;
    });
  }, []);

  const filteredTodos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return todos.filter((todo) => {
      const matchesSearch =
        query === '' || todo.task.toLowerCase().includes(query);
      const matchesFilter =
        filter === 'all' ||
        (filter === 'complete' && todo.completed) ||
        (filter === 'incomplete' && !todo.completed);
      return matchesSearch && matchesFilter;
    });
  }, [todos, searchQuery, filter]);

  const addTodo = useCallback(
    (task: string) => {
      const trimmed = task.trim();
      if (!trimmed) return false;

      updateTodos((prev) => [
        ...prev,
        { id: createId(), task: trimmed, completed: false },
      ]);
      setSearchQuery('');
      setFilter('all');
      return true;
    },
    [updateTodos],
  );

  const updateTodo = useCallback(
    (id: string, task: string) => {
      const trimmed = task.trim();
      if (!trimmed) return false;

      updateTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, task: trimmed } : t)),
      );
      return true;
    },
    [updateTodos],
  );

  const deleteTodo = useCallback(
    (id: string) => updateTodos((prev) => prev.filter((t) => t.id !== id)),
    [updateTodos],
  );

  const toggleTodo = useCallback(
    (id: string) =>
      updateTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      ),
    [updateTodos],
  );

  return {
    todos,
    filteredTodos,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
}

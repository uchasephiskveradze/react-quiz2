import { useCallback, useState } from 'react';
import type { Todo } from '../types';

export function useTodoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const openAdd = useCallback(() => {
    setEditingId(null);
    setValue('');
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((todo: Todo) => {
    setEditingId(todo.id);
    setValue(todo.task);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingId(null);
    setValue('');
  }, []);

  return {
    isOpen,
    value,
    setValue,
    editingId,
    isEditing: editingId !== null,
    openAdd,
    openEdit,
    close,
  };
}

import { FloatingAddButton } from './components/FloatingAddButton';
import { SearchControls } from './components/SearchControls';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { useTheme } from './hooks/useTheme';
import { useTodoModal } from './hooks/useTodoModal';
import { useTodos } from './hooks/useTodos';
import './App.css';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const modal = useTodoModal();
  const {
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
  } = useTodos();

  const handleSubmit = (text: string) => {
    const success =
      modal.isEditing && modal.editingId
        ? updateTodo(modal.editingId, text)
        : addTodo(text);

    if (success) modal.close();
  };

  return (
    <main className="container">
      <header className="header">
        <h1>Todo List</h1>
      </header>

      <SearchControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <TodoList
        todos={filteredTodos}
        totalCount={todos.length}
        isDarkMode={isDarkMode}
        onToggle={toggleTodo}
        onEdit={modal.openEdit}
        onDelete={deleteTodo}
      />

      <FloatingAddButton onClick={modal.openAdd} />

      <TodoModal
        isOpen={modal.isOpen}
        isEditing={modal.isEditing}
        value={modal.value}
        onChange={modal.setValue}
        onClose={modal.close}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

export default App;

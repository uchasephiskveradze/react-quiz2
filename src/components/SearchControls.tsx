import { Moon, Search, Sun } from 'lucide-react';
import type { TodoFilter } from '../hooks/useTodos';
import { FilterDropdown } from './FilterDropdown';

type SearchControlsProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export function SearchControls({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  isDarkMode,
  onToggleTheme,
}: SearchControlsProps) {
  return (
    <div className="controls">
      <div className="search-wrapper">
        <label htmlFor="todo-search" className="visually-hidden">
          Search todos
        </label>
        <input
          id="todo-search"
          type="text"
          className="search-input"
          placeholder="Note"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className="search-icon" size={20} strokeWidth={2} aria-hidden />
      </div>

      <FilterDropdown value={filter} onChange={onFilterChange} />

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>
    </div>
  );
}

# Todo List — React Homework

A Todo application built with **React**, **TypeScript**, and **Vite**, styled after the [Simple ToDo List Figma design](https://www.figma.com/file/qsm2Vzdbt5ww1Waw3FX1hd/Simple-ToDo-List-Design-(Community)).

## Design colors

| Color   | Hex       | Usage              |
|---------|-----------|--------------------|
| Primary | `#6C63FF` | Buttons, borders   |
| Light   | `#F7F7F7` | Light background   |
| Dark    | `#252525` | Dark background    |

## Features

- Add, edit, and delete todos
- Modal popup for new/edit notes
- Mark tasks complete (checkbox)
- Search by note text
- Filter: All / Complete / Incomplete
- Dark mode (saved in browser)
- Responsive layout
- Empty state illustration (light & dark)
- Data persists in `localStorage`

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Production build

```bash
npm run build
npm run preview
```

The built site is in the `dist/` folder (upload this folder if your teacher asks for a deployable build).

## Project structure

```
src/
  components/       UI (modal, list, search, filter, …)
  hooks/            useTodos, useTheme, useTodoModal
  utils/            localStorage helpers
  assets/           empty_light.png, empty_dark.png
  constants.ts      storage keys & design tokens
  types.ts          TypeScript types
  App.tsx           main layout
```

## Homework requirements

| Requirement              | Done |
|--------------------------|------|
| Add (modal)              | Yes  |
| Delete                   | Yes  |
| Edit                     | Yes  |
| Search (bonus)           | Yes  |
| Dark mode (bonus)        | Yes  |
| Responsive (bonus)       | Yes  |

## Tech stack

- React 19
- TypeScript
- Vite
- Lucide React (icons)
- Plain CSS (no UI framework)

# Project Context: Folio 2026

## Overview
Folio 2026 is an interactive, highly immersive portfolio website built with modern web technologies. It leverages a unique "Desktop/OS" design pattern, mimicking a computer's operating system interface. Users navigate the portfolio not by traditional scrolling or routing, but by interacting with a simulated file tree and managing draggable, overlapping application "Windows."

## Technology Stack
- **Framework**: React 19 / Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`, and custom PostCSS configurations.
- **Animations & 3D**: 
  - `framer-motion` & `motion` for fluid component transitions.
  - `three`, `@react-three/fiber`, and `@react-three/postprocessing` for 3D web experiences and WebGL backgrounds.
- **State Management**: `zustand`
- **UI Components**: Radix UI primitives (`@radix-ui/react-accordion`, `scroll-area`, `slot`) for accessible component foundations. `lucide-react` and `tech-stack-icons` for iconography.

## Theme & Architecture

### The "Desktop OS" Metaphor
The central metaphor of the application is a graphical user interface (GUI) operating system. The main application is a Single Page Application (SPA) where the "routes" are actually dynamically managed components within simulated desktop windows.

- **Desktop (`Desktop.tsx`)**: Acts as the main container and canvas, rendering the background (likely 3D or dynamic given the Three.js dependencies).
- **File Tree Navigator (`FileTreeNav.tsx`)**: Serves as the primary navigation menu. Clicking an item dispatches an action to open the corresponding "Window."
- **Window Management**: The `page.tsx` maintains an array of `WindowState` objects (e.g., `id`, `isOpen`, `zIndex`, `title`, `defaultPosition`). It handles operations like:
  - Opening/closing windows.
  - Focusing (bringing a window to the front by updating its `zIndex`).
  - Managing draggable positions.

### Key Content Modules (The "Applications")
Instead of separate pages, portfolio sections are modeled as executable files or text documents:
- **`WELCOME.exe`** (Hero Section)
- **`ABOUT_ME.txt`** (About Section)
- **`EXPERIENCE.log`** (Experience Section)
- **`PROJECTS_DB`** (Projects Section - currently uses an animated horizontal scroll effect)
- **`CONTACT.msg`** (Contact Section)
- **`SKILLS.txt`** (Skills Section)

## Important Routes / File Structure
Because of the OS design, there is effectively only **one primary route**:
- `/` (Home): Served by `src/app/page.tsx`. This initializes the desktop state and renders all section windows.

The project relies heavily on its component architecture to separate concerns:
- `src/components/layout/`: Core OS structural components (Desktop, FileTreeNav).
- `src/components/ui/`: Reusable interface elements, primarily the `Window` component which wraps content.
- `src/components/sections/`: The actual content blocks (About, Experience, Projects, etc.) that are passed as `children` to the Window components.
- `src/components/backgrounds/`: Likely contains the WebGL/Three.js background effects.

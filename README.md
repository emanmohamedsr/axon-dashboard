# <img src="public/axon.png" alt="Axon" width="60" style="vertical-align: middle;"/> Axon

[![Live Demo](https://vercel.com/button)](https://axon-dashboard-wpvz.vercel.app/)

![Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

**Axon** is a futuristic, high-performance productivity dashboard designed to act as a central intelligence node for team management.  
It fuses traditional ERP modules (Team, Calendar, Tasks) with **EVE**, an advanced AI assistant powered by **Google Gemini**, all wrapped in a _Cyberpunk / Neural_ aesthetic.

---

**Contents**

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Gallery & Theme Showcase](#gallery--theme-showcase)
- [Installation](#installation)

---

## Key Features

### AI & Intelligence (EVE)

- Generative AI chatbot powered by **Google Gemini**
- Integrated via **Vercel AI SDK (v6)**
- Real-time streaming with manual backend piping

### Geospatial Team Visualization

- Interactive global map using **Leaflet & React-Leaflet**
- Automatic timezone detection with `tz-lookup`
- Real-time local clocks per team member
- Location search via **OpenStreetMap (Nominatim)**
- Debounced queries using **TanStack Query**
- Dark-mode optimized map tiles (NatGeo style)

### Analytics & Data Visualization

Built with **Recharts**:

- Task Priority & Status (Stacked Bar / Radial)
- Team Distribution by Region
- Member Status Overview
- Calendar Event Duration Histograms

### Task & Project Management

- Fully interactive **Kanban Board** using `@dnd-kit`
- Advanced task table with **TanStack Table**
- Sorting, filtering & pagination
- Global state management via **Zustand**

### Calendar & Scheduling

- **FullCalendar** (Month / Week / Day views)
- Custom event creation forms
- Date & time pickers with color selection
- Schema validation with **Zod**
- Managed via **React Hook Form**

### System & UI Architecture

- Terminal-style Error Boundaries
- Glitch-effect 404 pages
- Component system built with **shadcn/ui** (Radix-based, fully customizable)
- Toast notifications using **Sonner**

---

## Tech Stack

### Core Framework & State

| Tech           | Description                            |
| -------------- | -------------------------------------- |
| React 19       | Concurrent rendering & modern features |
| Vite           | Lightning-fast dev tooling             |
| TypeScript     | Type safety & scalability              |
| Zustand        | Lightweight global state               |
| TanStack Query | Server state & caching                 |

### UI & Styling

| Tech                      | Description                                 |
| :------------------------ | :------------------------------------------ |
| **Tailwind CSS**          | Utility-first styling                       |
| **shadcn/ui**             | Reusable component system built on Radix UI |
| **Lucide React**          | Modern icon set                             |
| **clsx / tailwind-merge** | Conditional & merged class handling         |

### Complex Modules

| Module      | Libraries                         |
| ----------- | --------------------------------- |
| Maps        | leaflet, react-leaflet, tz-lookup |
| Calendar    | @fullcalendar/react               |
| Drag & Drop | @dnd-kit                          |
| Charts      | recharts                          |
| UI System   | shadcn/ui                         |

### AI & Backend

| Tech              | Description          |
| ----------------- | -------------------- |
| Vercel AI SDK     | AI streaming & hooks |
| Google Gemini     | LLM engine           |
| Node.js + Express | AI streaming server  |
| Axios             | API communication    |

---

## Project Structure

```
server/
src/
├── features/
│   ├── calendar/
│   ├── connectionsMap/
│   ├── chat/
│   ├── tasks/
│   └── team/
├── lib/
├── pages/
├── routes/
├── shared/
└── main.tsx
```

Feature-based architecture ensures scalability and clean separation of concerns.

---

## Gallery & Theme Showcase

### 1. Dashboard Command Center

|       **Dark Mode (Axon Theme)**       |                **Light Mode**                 |
| :------------------------------------: | :-------------------------------------------: |
| ![Dashboard v1 Dark](public/home1.jpg) | ![Dashboard v1 Light](public/home1-light.jpg) |
| ![Dashboard v2 Dark](public/home2.jpg) | ![Dashboard v2 Light](public/home2-light.jpg) |

### 2. EVE: AI Neural Interface

|             **Dark Mode**             |                **Light Mode**                |
| :-----------------------------------: | :------------------------------------------: |
|  ![EVE Landing Dark](public/eve.jpg)  |  ![EVE Landing Light](public/eve-light.jpg)  |
| ![EVE Chat Dark](public/eve-chat.jpg) | ![EVE Chat Light](public/eve-chat-light.jpg) |

### 3. Geospatial Connections

|                **Dark Mode**                |                **Light Mode**                 |
| :-----------------------------------------: | :-------------------------------------------: |
|   ![Map Dark](public/connection-map.jpg)    | ![Map Light](public/connection-map-light.jpg) |
| ![Map Marker Detail](public/map-marker.jpg) |                                               |

### 4. Task Management System

|                   **Dark Mode**                   |                      **Light Mode**                      |
| :-----------------------------------------------: | :------------------------------------------------------: |
| ![Kanban View Dark](public/tasks-kanban-view.jpg) | ![Kanban View Light](public/tasks-kanban-view-light.jpg) |
|  ![Table View Dark](public/tasks-table-view.jpg)  |  ![Table View Light](public/tasks-table-view-light.jpg)  |
|  ![Kanban Board Detail](public/tasks-kanban.jpg)  |                                                          |
|    ![Task Creation Form](public/task-from.jpg)    |     ![Task Alert Light](public/task-alert-light.jpg)     |

### 5. Calendar

|                **Dark Mode**                 |                   **Light Mode**                    |
| :------------------------------------------: | :-------------------------------------------------: |
| ![Calendar System Dark](public/calendar.jpg) | ![Calendar System Light](public/calendar-light.jpg) |
|                                              |   ![Edit Event Modal](public/editEvent-view.jpg)    |

### 6. Team

|              **Dark Mode**              |                 **Light Mode**                 |
| :-------------------------------------: | :--------------------------------------------: |
| ![Team Directory Dark](public/team.jpg) | ![Team Directory Light](public/team-light.jpg) |
|  ![Team Alert](public/team-alert.jpg)   |   ![Team Member Form](public/team-form.jpg)    |

---

## Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/emanmohamedsr/axon-dashboard
cd axon-dashboard
```

### 2️⃣ Backend Setup (AI Service)

```bash
cd server
pnpm install
```

Create `.env` file:

```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

Run server:

```bash
node index.js
```

Server runs on **http://localhost:3001**

### 3️⃣ Frontend Setup

```bash
pnpm install
pnpm dev
```

Client runs on **http://localhost:5173**

---

## Author

**Eman Soliman**  
Frontend Developer

Built with passion, React, and a touch of the future

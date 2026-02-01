# Unipilot Architecture 🏛️

## 📂 Folder Structure

- **`app/`**: **Routing Layer Only.**
  - Contains the file-based router.
  - Pages here should be thin wrappers around screens/features.
  - `_layout.tsx` handles global providers (Auth, Theme).

- **`src/features/`**: **Business Logic & UI.**
  - `auth/`: Login, Sign Up, Session logic.
  - `calendar/`: Calendar UI, Schedule hooks.
  - Each feature folder should be self-contained.

- **`src/services/`**: **External Integrations.**
  - `supabase.ts`: Database & Auth client.
  - `gemini.ts`: AI Model interaction (Syllabus parsing).
  - `imageService.ts`: Image picker & manipulation.

- **`src/components/`**: **Shared UI Components.**
  - Buttons, Inputs, Layout containers.

## 🛠️ Key Libraries

- **Supabase**: Backend-as-a-Service (Auth + DB).
- **Apollo Client / React Query**: (Plan to use TanStack Query in V2, currently using custom hooks).
- **Gemini AI**: Used via custom service `gemini.ts` for parsing images.
- **Moti**: For performant animations (based on Reanimated).

## 🧠 Data Flow

1.  **Syllabus Parsing**:
    - User uploads image -> `imageService` (Base64) -> `gemini.ts` (JSON) -> `supabase` (DB Insert).
2.  **Schedule Display**:
    - `useSchedule` hook fetches from `supabase` -> Renders `CalendarScreen`.

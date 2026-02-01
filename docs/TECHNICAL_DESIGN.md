# Technical Design Document: Unipilot MVP

## Architectural Vision

The "Guardian of Stability" architecture. We prioritize robustness over speed. Every decision aims to minimize technical debt and ensure a crash-free experience on Expo Go.

## 1. Core Tech Stack

### Recommended Approach: Expo + Supabase + Gemini

| Layer             | Choice                 | Rationale                                                                                |
| ----------------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| **Frontend**      | Expo SDK 54 (SDK 54)   | Stable base, excellent developer experience via Expo Go, and built-in mobile primitives. |
| **Styling**       | NativeWind (Tailwind)  | Industry standard for mobile styling; keeps components predictable and clean.            |
| **Backend**       | Supabase               | Postgres database, Auth, and Edge Functions (for secure AI calls).                       |
| **AI Reasoning**  | Gemini 2.0 Pro / Flash | Large context (1M tokens) for syllabus parsing and cost-effective Flash for daily notes. |
| **Transcription** | Whisper-base           | High-accuracy audio transcription for lecture recording.                                 |

### Stability Constraints (The Constitution)

- **Lazy Loading**: All external services (Gemini, Supabase) are initialized at runtime, never at import time.
- **Empty Keys**: App must render a "Configuration Required" UI instead of crashing if keys are missing.
- **Native-First**: No Web DOM/HTML tags. Use `<View>`, `<Text>`, and Native primitives only.
- **Reanimated & Worklets**: Stict adherence to `react-native-worklets@0.5.1` for Expo SDK 54 compatibility.

---

## 2. Component Design

### Feature 1: Smart Calendar (Syllabus Parser)

**Complexity:** Medium (Reasoning heavy)

- **Input:** Image or PDF file of a university syllabus.
- **Engine:** Gemini 2.0 Pro via Supabase Edge Function.
- **Logic:**
  1. User uploads file to Supabase Storage.
  2. Edge Function triggers Gemini with a strict JSON-output prompt.
  3. Gemini returns structured lesson schedule.
  4. App writes to `lessons` table in Postgres.

### Feature 2: AI Lesson Notes (Transcription)

**Complexity:** High (Real-time and state heavy)

- **Input:** Live audio stream/recording via `expo-av`.
- **Engine:** Whisper (via Groq or internal Edge Function).
- **Organization:**
  - Summary and organization handled by Gemini 2.0 Flash.
  - Notes saved as Markdown in `lecture_notes` table.

---

## 3. Data Schema (Supabase/Postgres)

```sql
-- Users (Managed by Supabase Auth)

-- Lessons/Calendar
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  subject TEXT,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lecture Notes
CREATE TABLE lecture_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  raw_transcript TEXT,
  summary TEXT,
  organized_notes JSONB, -- AI-structured sections
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 4. AI Strategy & Prompts

### Calendar Parser Prompt (Syllabus to JSON)

```text
SYSTEM: You are the Unipilot Schedule Architect.
TASK: Extract lesson schedule from the provided document.
REQUIREMENTS:
1. Output ONLY valid JSON.
2. Structure: [{ "title": string, "subject": string, "day": string, "start": "HH:MM", "end": "HH:MM" }]
3. If data is missing, make a best guess based on academic context.
```

### Note Organizer Prompt (Transcript to Summary)

```text
SYSTEM: You are the Unipilot Academic Strategist.
TASK: Summarize this raw lecture transcript into Minimalist, Premium notes.
REQUIREMENTS:
- Use bullet points for key concepts.
- Highlight (bold) exam-critical terminology.
- Provide a 3-sentence executive summary at the top.
```

---

## 5. Implementation Roadmap

### Phase A: The Stable Base (1-2 Weeks)

- [ ] Initialize Expo SDK 54 project.
- [ ] Configure Supabase Auth and Database RLS.
- [ ] Implement the "Clean Base" error handling (Missing Keys UI).

### Phase B: Smart Calendar (2-3 Weeks)

- [ ] Create Image/PDF upload UI.
- [ ] Develop Supabase Edge Function for syllabus parsing.
- [ ] Build the "Addicting" Calendar View (smooth scroll, liquid glass styles).

### Phase C: AI Lesson Notes (2-3 Weeks)

- [ ] Implement audio recording with `expo-av`.
- [ ] Connect transcription engine.
- [ ] Integrate Gemini Flash for note summarization.

---

## 6. Definition of Done

- [ ] App launches to Home Screen in Expo Go without errors.
- [ ] One full "Syllabus → Calendar" loop works end-to-end.
- [ ] Transcription produces readable, organized notes.
- [ ] UI reflects "Minimalist, Academic, Premium" vibe (no generic styles).

---

_Status: Ready for Phase 4 (Agent Instructions)_

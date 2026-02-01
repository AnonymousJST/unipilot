# Product Requirements Document: Unipilot MVP

## Product Overview

**App Name:** Unipilot
**Tagline:** Your AI-Powered Academic Co-Pilot.
**Launch Goal:** App Store release before the next semester starts.
**Target Launch:** ~6-8 weeks.

## Who It's For

### Primary User: The "Academic Overwhelmed"

Students who struggle to keep up with fragmented university schedules and lecture density. They are tech-savvy but value speed and accuracy over complex configurations.

**Their Current Pain:**

- Manual data entry for calendars (PDFs/Images are hard to parse).
- Lecture fatigue — missing details while taking manual notes.
- Disorganized materials across multiple apps/folders.

**What They Need:**

- Automatic schedule organization.
- Passive, high-quality note taking.
- Minimalist interface that doesn't distract from study.

### Example User Story

"Alex enters a new semester. Instead of manually typing 15 class times into a calendar, he uploads a screenshot of his uni syllabus. Unipilot immediately populates his schedule. In class, he records the lecture; Unipilot transcribes it into categorized, clean notes. Alex leaves class with a full study guide ready to go."

## The Problem We're Solving

University life is administratively heavy. Students spend too much time organizing and not enough time learning.

**Why Existing Solutions Fall Short:**

- **Google Calendar/iCal**: Requires tedious manual entry.
- **Notion/Evernote**: High friction for setup and organizing lecture transcripts.
- **Unistudents (Local)**: Lacks the automated AI intelligence for schedule parsing and live transcription.

## User Journey

1. **Discovery & Setup**
   - User downloads Unipilot from App Store.
   - User uploads their university calendar (Image/PDF).
   - AI parses the data and "Aha!" moment: The calendar is fully populated instantly.

2. **Daily Usage**
   - User opens the app to see their next class.
   - During the lecture, user starts "Live Note" mode.
   - Phone listens, transcribes, and summarizes.

3. **Post-Lecture Success**
   - User receives organized, subject-specific notes.
   - User feels organized and ready for the next lesson.

## MVP Features

### Must Have for Launch (P0)

#### 1. Smart Calendar (AI Parser)

- **What:** Automatic population of app schedule from uploaded silhouettes/PDFs.
- **User Story:** As a student, I want to upload a syllubus file so that my calendar is built for me without typing.
- **Success Criteria:**
  - [ ] Accurate date/time extraction from images/PDFs.
  - [ ] Automatic class category assignment.

#### 2. AI Lesson Notes (Transcription & Organization)

- **What:** Live audio recording, transcription, and organized note generation.
- **User Story:** As a student, I want the AI to record and summarize my lectures so that I don't miss details.
- **Success Criteria:**
  - [ ] Low-latency transcription.
  - [ ] Clear, bulleted summaries organized by subject.

#### 3. Minimalist Premium UI

- **What:** A high-end, academic-focused aesthetic with zero distractions.
- **Priority:** Critical for brand identity.

### NOT in MVP (Saving for V2)

- **Tutor AI**: MCQs, flashcards, and Socratic questioning.
- **Social Features**: Group study or calendar sharing.
- **Advanced Gamification**: Study streaks and badges.

## How We'll Know It's Working

### Launch Success Metrics (First 30 Days)

| Metric                     | Target         | Measure          |
| -------------------------- | -------------- | ---------------- |
| Successful Calendar Parses | > 80% accuracy | AI feedback logs |
| Daily Active Users (DAU)   | 100+           | Analytics        |
| User Retension             | 40% Week 1     | Analytics        |

## Look & Feel

**Design Vibe:** Minimalist, Academic, Premium.

**Visual Principles:**

1. **Focus First**: Large typography, clean white space.
2. **Contextual Depth**: "Liquid Glass" effects for calendar items.
3. **Calm Palette**: Soothing colors to reduce study anxiety.

## Technical Considerations

**Platform:** Mobile App (React Native/Expo).
**Reasoning Engine:** Gemini Pro (for complex parsing) & Whisper/Flash (for transcription).
**Backend:** Supabase for Auth and Database.

## Budget & Constraints

**Budget:** Strictly free tiers for MVP.
**Timeline:** Launch before next semester.
**Quality:** Zero-bug policy for core features.

---

_Document Status: Final Draft — Ready for Technical Design_

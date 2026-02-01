# System Architecture Diagrams 📐

## 1. Syllabus Parsing Flow (Sequence)

How a syllabus image turns into a schedule.

```mermaid
sequenceDiagram
    participant U as User
    participant App as Unipilot App
    participant G as Gemini (AI)
    participant S as Supabase (DB)

    U->>App: 1. Uploads Syllabus Image
    App->>App: 2. Converts Image to Base64
    App->>G: 3. Sends Image + Strict JSON Prompt
    Note over App,G: Uses model: "gemini-3-flash-preview"
    G-->>App: 4. Returns JSON Schedule
    App->>S: 5. Inserts Events into 'schedules' table
    S-->>App: 6. Confirmation
    App-->>U: 7. Updates Calendar UI
```

## 2. Authentication & Data Security

How we ensure data belongs to the right user.

```mermaid
graph TD
    A[User Opens App] --> B{Has Session?}
    B -- Yes --> C[Redirect to /index (Home)]
    B -- No --> D[Redirect to /(auth)/sign-in]

    D --> E[Login with Email/Pass]
    E --> F[Supabase Auth]
    F -- Token --> A

    C --> G[Fetch Schedule]
    G --> H{RLS Policy Check}
    H -- "auth.uid() == user_id" --> I[Return Data]
    H -- "Mismatch" --> J[Access Denied]
```

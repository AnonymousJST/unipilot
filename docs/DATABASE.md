# Database Schema 🗄️

We use **Supabase** (PostgreSQL).
If setting up a new environment, you must replicate this schema.

## Tables

### 1. `profiles`

Extends the default `auth.users` table.

- `id` (uuid, PK, references auth.users.id)
- `full_name` (text, nullable)
- `avatar_url` (text, nullable)
- `updated_at` (timestamptz)

### 2. `schedules`

Stores parsed class events.

- `id` (uuid, PK, default: `gen_random_uuid()`)
- `user_id` (uuid, references profiles.id)
- `subject` (text)
- `day` (text) - e.g., "Monday"
- `start_time` (text) - Format "HH:MM"
- `end_time` (text) - Format "HH:MM"
- `location` (text, nullable)
- `created_at` (timestamptz, default: `now()`)

## 🔒 Security (RLS)

**Enable RLS on all tables.**

### Policies:

- **Profiles**:
  - `SELECT`: Users can see their own profile.
  - `UPDATE`: Users can update their own profile.
  - `INSERT`: Handled via Trigger (usually) or Service Role.

- **Schedules**:
  - `SELECT`: `auth.uid() = user_id` (Users see only their own classes).
  - `INSERT`: `auth.uid() = user_id` (Users can only add to their schedule).
  - `UPDATE`: `auth.uid() = user_id`.
  - `DELETE`: `auth.uid() = user_id`.

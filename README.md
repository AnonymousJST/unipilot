# Unipilot 🎓

**The AI Student Assistant.**

Built with **Expo SDK 54**, **Supabase**, and **Gemini 3.0 Flash**.

## 🚀 Features

- **Smart Calendar**: Upload syllabus screenshots -> AI parses them -> Auto-populates schedule.
- **Guardian Auth**: Secure email-based authentication (Supabase).
- **Smooth UI**: Powered by `nativewind` (Tailwind) and `moti` (Animations).

## 🛠️ Tech Stack

- **Framework**: React Native (Expo Router)
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: Google Gemini Vision (gemini-3-flash-preview)
- **Styling**: NativeWind v4
- **Animations**: Moti + Reanimated

## ⚡ How to Run Locally

### 1. Prerequisites

- Node.js (LTS)
- Expo Go app on your phone (iOS/Android)

### 2. Clone & Install

```bash
git clone https://github.com/AnonymousJST/unipilot.git
cd unipilot
npm install
```

### 3. Configure Environment Secrets 🔑 (Important!)

Create a file named `.env` in the root folder.
Add your keys (ask the project owner for these if you don't have them):

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
EXPO_PUBLIC_GEMINI_API_KEY=your-gemini-key
```

### 4. Start the App

```bash
npx expo start -c
```

Scan the QR code with your phone.

## 📱 Troubleshooting

- **Black Screen?** Force close the app and restart `npx expo start -c`.
- **Crash on Upload?** Ensure your Gemini API Key works for `gemini-3-flash-preview`.

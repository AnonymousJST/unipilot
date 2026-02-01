# Contributing to Unipilot 🤝

Welcome to the team! Before you commit code, please read our "Constitution." We value **Stability** over Speed.

## 📜 Core Rules

1.  **Stability First**: The app must never crash on launch. Always check for missing keys/configs.
2.  **No "Frankenstein" Code**: Do not paste React Web code (DOM elements like `div`, `span`) into this React Native project.
3.  **Strict Dependencies**:
    - Styling: **NativeWind** (Tailwind) only. No inline styles unless for animations.
    - Navigation: **Expo Router** (File-based routing in `app/`).
    - Animations: **Moti** & **Reanimated**.

## 🏗️ Workflow

1.  **Branching**: Use specific feature branches (e.g., `feature/calendar-parsing`, `fix/login-error`).
2.  **Linting**: Pay attention to TypeScript errors. Do not use `any` unless absolutely necessary.
3.  **Testing**:
    - Run `npx expo start -c` after installing any new package.
    - Verify on both iOS/Android simulators if possible.

## 🚨 Troubleshooting

- **Peer Dependency Warnings**: Do NOT ignore them. If you see a mismatch (especially with Reanimated or Expo), resolve it immediately.
- **Cache Issues**: If the app behaves weirdly, run `npx expo start -c` to clear the Metro cache.

# 🚀 React Native Chat App

A simple and clean chat application built with **React Native**, using a chat API to fetch messages and display them with real-time styling. Inspired by apps like WhatsApp and Messenger, it features:

- TailwindCSS via `nativewind`

---

## 📱 Features

- Fetches paginated messages from [Corider API](https://qa.corider.in/assignment/chat)
- Auto-scroll to latest message on open and after sending
- Keyboard-aware input with attachment options
- Smooth UX for chatting experience
- Menu (three dots) with action options

---

## 🛠️ Technologies Used

- **React Native** (via Expo)
- **TypeScript**
- **NativeWind (Tailwind CSS for React Native)**
- **Axios** – for API requests
- **Moment.js / Dayjs** – for date formatting
- **Expo Icons** – for UI icons
- **Expo Google Fonts** – for custom fonts
- **FlatList** – for rendering chat messages

---

## 🧹 Code Quality

This project uses:

- **ESLint** – for static code analysis and catching issues
- **Prettier** – for consistent code formatting

## 📸 Screenshots

Include images in a folder like `/assets/screenshot/`.

(assets/screenshot.jpg), (assets/profileDp.jpg)
---

## 📹 Screencast

[Click to view the screencast](Demo/demoVideo.mp4)

## 🔧 Installation

```bash
git clone https://github.com/yourusername/react-native-chat-app.git
cd react-native-chat-app
npm install
npx expo start


# 📱 Habit Tracker App — Product Specification

## 🧩 Overview

A powerful, minimalist habit tracker built using **Next.js (React)** and **Supabase**, designed to help users gradually reduce bad habits (like smoking or gutka) and increase good ones (like drinking water or walking). The app works seamlessly on **web and mobile** (as a responsive PWA) and uses the **Cue–Habit–Reward (CHR)** method, one-tap logging, and streak tracking to drive long-term behavior change.

---

## ⚙️ Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Auth**: Supabase Auth (email or passwordless magic links)
- **PWA Support**: Next PWA plugin for mobile installation
- **Charts**: Recharts or Chart.js for progress graphs
- **State**: Zustand or React Context

---

## 🌟 Core Features

### ✅ Tap-to-Track Habits
- Each habit shown with a `+` button to log instantly.
- Tap `+` for:
  - Smoking a cigarette
  - Drinking a glass of water
  - Walking session
  - Sugar/gutka consumption

### ✏️ Input Custom Quantity
- Users can optionally long-press or tap 🖊️ to enter units manually.
- E.g., drank 2 glasses at once or smoked 2 cigarettes.

### 🧠 Cue–Habit–Reward (CHR) System
- Each habit stores:
  - **Cue**: What triggers the habit (e.g., stress)
  - **Habit**: The behavior (e.g., smoke)
  - **Reward**: What the user gets from it (e.g., calmness)
- Shown as reminders to create mindfulness around actions.

### 📅 Daily Dashboard
- Clean daily view showing:
  - Habit name
  - Count so far today
  - Daily goal
  - CHR summary
  - Current streak
- All updates live as user taps or edits.

### 🔥 Streak System
- Tracks streaks for every habit.
  - “3 days no gutka”
  - “5 days of drinking 3L+ water”
- Visual progress boosts motivation.

### 📈 Weekly/Monthly Trends
- Trend charts for each habit:
  - Compare week over week
  - See reduction or growth patterns

### 🎯 Daily Goals per Habit
- Goal type:
  - `Max` for bad habits (e.g., max 2 cigarettes)
  - `Min` for good habits (e.g., min 3L water)
- App shows progress bar toward goal.

### 🔔 Smart Reminders (Optional)
- Optional habit-based notifications (via browser and mobile push):
  - “Log your water”
  - “No smoking yet today — keep going!”
- Can be toggled per habit.

### ☁️ Cloud Sync + Local Fallback
- All data synced with Supabase.
- Works offline using local storage.
- Syncs when user comes back online.

### 🧾 Export Data
- Users can export:
  - CSV or PDF of logs
  - Share with coach, doctor, or keep for self

### 🧩 Customization
- Add/edit/remove habits
- Customize:
  - Name
  - Icon
  - Goal type + target
  - Units
  - Cue, Habit, Reward values

---

## 🧭 UX Flow

1. **Home Dashboard**
   - Habit list
   - Tap `+` to log instantly
   - Tap 🖊️ to enter custom units
   - Streak shown per habit

2. **Add/Edit Habit Screen**
   - Fields:
     - Name
     - Unit (e.g., cigarette, glass)
     - Goal type: min or max
     - Daily goal
     - Cue, Habit, Reward
     - Reminder toggle

3. **Progress Screen**
   - Graphs of each habit over time
   - Filter by week/month

4. **Settings**
   - Export data
   - Change goal units
   - Toggle notifications
   - Sign in / out

---

## 🎨 UI Design Principles

- **Mobile-first design**
  - Responsive using Tailwind CSS
  - Fully installable PWA
- **Clean & focused UI**
  - Minimal distractions
  - Easy 1-tap logging
- **Accessible**
  - High contrast, legible fonts, keyboard navigation
- **Motivating visuals**
  - Emojis/icons per habit
  - 🔥 streaks
  - 🧠 CHR reminders

---

## 📦 Supabase Database Schema (Simplified)

### `habits`
```sql
id (uuid)
user_id (uuid)
name (text)
type (enum: 'positive' | 'negative')
unit (text)
goal_type (enum: 'min' | 'max')
daily_goal (integer)
cue (text)
habit (text)
reward (text)
reminder_enabled (boolean)
created_at (timestamp)
```

### `habit_logs`
```sql
id (uuid)
habit_id (uuid)
user_id (uuid)
date (date)
time (timestamp)
count (integer)
```

### `streaks`
```sql
habit_id (uuid)
user_id (uuid)
current_streak (int)
longest_streak (int)
last_successful_day (date)
```

---

## 🧪 MVP Feature Checklist

- [x] Add / edit / delete habits
- [x] Tap-to-log and custom input
- [x] CHR fields per habit
- [x] Daily dashboard
- [x] Daily reset with history tracking
- [x] Streak calculation
- [x] Progress graph
- [x] Supabase sync
- [x] Export data
- [x] Responsive design + PWA

---

## 🌱 Future Enhancements (Post-MVP)

- AI habit suggestion system (Gemini/OpenAI)
- Social sharing or accountability partner
- Mood journaling per log
- Habit bundles (e.g., morning routine group)
- In-app motivational quotes or rewards
- Weekly recap email/report

---

## 📌 Summary

This app helps users build or break habits using simple daily tracking powered by Cue–Habit–Reward. It’s built with Next.js and Supabase to ensure cloud sync, speed, and scalability. With a clean mobile-first UI and data-rich tracking system, it empowers people to make better decisions daily — one tap at a time.

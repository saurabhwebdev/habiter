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
- [x] Each habit shown with a `+` button to log instantly.
- [x] Tap `+` for:
  - [x] Smoking a cigarette
  - [x] Drinking a glass of water
  - [x] Walking session
  - [x] Sugar/gutka consumption

### ✏️ Input Custom Quantity
- [x] Users can optionally long-press or tap 🖊️ to enter units manually.
- [x] E.g., drank 2 glasses at once or smoked 2 cigarettes.

### 🧠 Cue–Habit–Reward (CHR) System
- [x] Each habit stores:
  - [x] **Cue**: What triggers the habit (e.g., stress)
  - [x] **Habit**: The behavior (e.g., smoke)
  - [x] **Reward**: What the user gets from it (e.g., calmness)
- [x] Shown as reminders to create mindfulness around actions.

### 📅 Daily Dashboard
- [x] Clean daily view showing:
  - [x] Habit name
  - [x] Count so far today
  - [x] Daily goal
  - [x] CHR summary
  - [x] Current streak
- [x] All updates live as user taps or edits.

### 🔥 Streak System
- [x] Tracks streaks for every habit.
  - [x] "3 days no gutka"
  - [x] "5 days of drinking 3L+ water"
- [x] Visual progress boosts motivation.

### 📈 Weekly/Monthly Trends
- [x] Trend charts for each habit:
  - [x] Compare week over week
  - [x] See reduction or growth patterns

### 🎯 Daily Goals per Habit
- [x] Goal type:
  - [x] `Max` for bad habits (e.g., max 2 cigarettes)
  - [x] `Min` for good habits (e.g., min 3L water)
- [x] App shows progress bar toward goal.

### 🔔 Smart Reminders (Optional)
- [ ] Optional habit-based notifications (via browser and mobile push):
  - [ ] "Log your water"
  - [ ] "No smoking yet today — keep going!"
- [ ] Can be toggled per habit.

### ☁️ Cloud Sync + Local Fallback
- [x] All data synced with Supabase.
- [ ] Works offline using local storage.
- [ ] Syncs when user comes back online.

### 🧾 Export Data
- [ ] Users can export:
  - [ ] CSV or PDF of logs
  - [ ] Share with coach, doctor, or keep for self

### 🧩 Customization
- [x] Add/edit/remove habits
- [x] Customize:
  - [x] Name
  - [x] Icon
  - [x] Goal type + target
  - [x] Units
  - [x] Cue, Habit, Reward values

---

## 🧭 UX Flow

1. **Home Dashboard**
   - [x] Habit list
   - [x] Tap `+` to log instantly
   - [x] Tap 🖊️ to enter custom units
   - [x] Streak shown per habit

2. **Add/Edit Habit Screen**
   - [x] Fields:
     - [x] Name
     - [x] Unit (e.g., cigarette, glass)
     - [x] Goal type: min or max
     - [x] Daily goal
     - [x] Cue, Habit, Reward
     - [x] Reminder toggle

3. **Progress Screen**
   - [x] Graphs of each habit over time
   - [x] Filter by week/month

4. **Settings**
   - [ ] Export data
   - [x] Change goal units
   - [ ] Toggle notifications
   - [x] Sign in / out

---

## 🎨 UI Design Principles

- [x] **Mobile-first design**
  - [x] Responsive using Tailwind CSS
  - [ ] Fully installable PWA
- [x] **Clean & focused UI**
  - [x] Minimal distractions
  - [x] Easy 1-tap logging
- [x] **Accessible**
  - [x] High contrast, legible fonts, keyboard navigation
- [x] **Motivating visuals**
  - [x] Emojis/icons per habit
  - [x] 🔥 streaks
  - [x] 🧠 CHR reminders

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
- [ ] Export data
- [x] Responsive design + PWA

---

## 🌱 Future Enhancements (Post-MVP)

- [x] AI habit suggestion system (Gemini/OpenAI) - Implemented with motivational messages
- [ ] Social sharing or accountability partner
- [ ] Mood journaling per log
- [ ] Habit bundles (e.g., morning routine group)
- [x] In-app motivational quotes or rewards - Implemented with Gemini API
- [ ] Weekly recap email/report

---

## 📌 Summary

This app helps users build or break habits using simple daily tracking powered by Cue–Habit–Reward. It's built with Next.js and Supabase to ensure cloud sync, speed, and scalability. With a clean mobile-first UI and data-rich tracking system, it empowers people to make better decisions daily — one tap at a time.

## 🚧 Pending Features

1. **Smart Reminders**
   - Browser and mobile push notifications
   - Configurable reminders per habit

2. **Offline Support**
   - Local storage fallback when offline
   - Data syncing when back online

3. **Data Export**
   - CSV/PDF export functionality
   - Sharing options for coaches/doctors

4. **PWA Installation**
   - Complete PWA configuration
   - App installation on mobile devices

5. **Additional Features**
   - Social sharing/accountability
   - Mood journaling
   - Habit bundles
   - Weekly recap emails

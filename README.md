# 🗓️ **TimeLine — A Lightweight Event Tracker**

A lightweight **React app** for creating, organizing, and tracking personal events.
It includes **search**, **sorting**, **real-time countdowns**, **auto-deletion after expiration**, clean minimal UI, and a responsive layout that works on desktop and mobile.

---

## ✨ Features

### 🔍 Event Management

* Add events with **labels**, **date & time**, and optional **notes**
* Search events instantly by name
* Sort events by:

  * **Date** (Ascending / Descending)

### 🕒 Smart Time Handling

* Live **real-time countdown** (updates automatically every minute)
* Automatic detection of upcoming vs completed events
* Optional **auto-delete** of completed events

### 📱 Responsive & UX Focused

* Clean minimal UI using custom CSS
* Zero-state illustrations and helpful empty screens
* Mobile-friendly layout and interaction behavior
* Switchable **grid / list view** (desktop), list default on mobile

### 🗂️ Data Persistence

* Uses local storage

### 🧩 Components Included

* Event list with grouping (upcoming / completed)
* Add event form
* Event detail modal (click outside to close)
* Switch toggle component
* Zero-state screens with illustrations

---

## 🚀 Getting Started

### **1. Clone the repository**

```sh
git clone https://github.com/yourname/timeline.git
cd timeline
```

### **2. Install dependencies**

Using **bun**:

```sh
bun install
```

Or using npm:

```sh
npm install
```

### **3. Start the dev server**

```sh
bun dev
```

or:

```sh
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## 🛠 Tech Stack

* **React 18**
* **Vite**
* **Bun / Node**
* Custom CSS (no UI libraries)
* **LocalStorage** for persistence
* Responsive design techniques
* Context Providers:

  * `UserProvider` — user data + events
  * `DeviceProvider` — platform detection

---

## 🧩 Key Components

### **📝 Add Event Form**

* Event name
* Date & time
* Optional note
* Toggle: auto-delete after completion

### **📄 Event List**

* Grid & list modes
* Hover delete (desktop)
* Tap “Open” on mobile

---

## 🧹 Auto Deletion Behavior

If `autoDelete` is enabled on an event:

* When its date/time has passed,
* It is automatically removed on the next minute tick.

This keeps your event list clean without manual cleanup.

---

## 🚦 Roadmap / Ideas

* Dark/light theme toggle
* Edit existing events
* Categories / tags
* Export & import events
* Notifications

---

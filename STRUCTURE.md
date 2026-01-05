# Seitenstruktur & Komponenten-Übersicht

## Seiten-Hierarchie

```
/ (Homepage)
├── Hero Section
│   ├── Titel & Beschreibung
│   └── CTA Buttons
├── Info Section (3 Cards)
│   ├── Für wen ist diese Ausbildung?
│   ├── Unser Lernkonzept
│   └── Praktisches Lernen
└── CTA Section
    └── Call-to-Action zum Start

/lerninhalte (Lerninhalte)
└── Modul-Liste
    └── Modul Card (wiederholbar)
        ├── Modul-Header (Nummer, Titel, Beschreibung)
        ├── Video (optional)
        ├── Theorie-Content (Markdown)
        └── Lernziele (Liste)

/aufgaben (Aufgaben)
├── Sidebar (Aufgabenliste)
│   └── Aufgabe-Button (wiederholbar)
│       ├── Titel
│       ├── Schwierigkeit
│       └── Modul-Referenz
└── Hauptbereich
    └── Aufgabe-Detail
        ├── Header (Schwierigkeit, Modul, Titel, Beschreibung)
        ├── Code-Editor (für Code-Aufgaben)
        │   ├── Monaco Editor
        │   ├── Submit Button
        │   ├── Reset Button
        │   └── Feedback
        └── Quiz (für Quiz-Aufgaben)
            ├── Frage
            ├── Antwort-Optionen (Radio)
            ├── Submit Button
            └── Feedback
```

## Komponenten-Hierarchie

### Layout-Komponenten

```
Navigation
├── Logo/Brand
└── Nav Items
    ├── Home
    ├── Lerninhalte
    └── Aufgaben
```

### UI-Komponenten

```
Button
├── Varianten (primary, secondary, outline)
├── Größen (sm, md, lg)
└── Kann als Link oder Button

Card
├── Standard Card
└── Hover-Effekt (optional)

CodeEditor
├── Monaco Editor
├── Code State
├── Submit Handler
├── Reset Funktion
└── Feedback Display
```

## Datenfluss

```
lib/data.ts
├── learningModules[] → /lerninhalte
│   └── LearningModule
│       ├── id
│       ├── title, description
│       ├── videoUrl (optional)
│       ├── content (Markdown)
│       └── learningObjectives[]
│
└── challenges[] → /aufgaben
    └── Challenge
        ├── id, moduleId
        ├── title, description
        ├── type (code | quiz | multiple-choice)
        ├── difficulty
        ├── codeTemplate, language, solution (für Code)
        └── quizQuestion, quizOptions, quizCorrectAnswer (für Quiz)
```

## Styling-System

```
Tailwind CSS
├── Primary Colors (Blue)
│   └── primary-50 bis primary-900
├── Grey Colors
│   └── grey-50 bis grey-900
└── Utility Classes
    ├── Container (container-custom)
    ├── Spacing
    ├── Typography
    └── Responsive Breakpoints
```

## Navigation Flow

```
Homepage
  ↓ (CTA)
Lerninhalte
  ↓ (Theorie lernen)
Aufgaben
  ↓ (Praktisch üben)
[Weitere Module...]
```

## Responsive Design

- **Desktop-first**: Optimiert für Laptop/Desktop
- **Breakpoints**: 
  - `md:` ab 768px
  - `lg:` ab 1024px
- **Grid-Layout**: 1 Spalte (Mobile) → 3 Spalten (Desktop)


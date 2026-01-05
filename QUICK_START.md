# Quick Start Guide

## Installation

1. **Dependencies installieren:**
   ```bash
   npm install
   ```

2. **Development Server starten:**
   ```bash
   npm run dev
   ```

3. **Im Browser öffnen:**
   Öffne [http://localhost:3000](http://localhost:3000)

## Projektstruktur im Überblick

### Seiten
- **Homepage** (`/`) - Einführung und Übersicht
- **Lerninhalte** (`/lerninhalte`) - Theorie-Module mit Videos
- **Aufgaben** (`/aufgaben`) - Praktische Übungen und Quiz

### Wichtige Dateien

**Daten hinzufügen/bearbeiten:**
- `lib/data.ts` - Hier werden Module und Aufgaben definiert

**Styling anpassen:**
- `tailwind.config.js` - Farben und Theme
- `app/globals.css` - Globale Styles

**Komponenten erweitern:**
- `components/ui/` - UI-Komponenten
- `components/layout/` - Layout-Komponenten

## Neue Lerninhalte hinzufügen

### 1. Neues Modul erstellen

In `lib/data.ts` zum Array `learningModules` hinzufügen:

```typescript
{
  id: '3',
  title: 'Dein Modul-Titel',
  description: 'Kurze Beschreibung',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID', // Optional
  content: `
# Dein Modul

Hier kommt der Theorie-Content in Markdown-Format.

## Unterüberschrift

- Liste
- Mit
- Punkten
  `,
  learningObjectives: [
    'Lernziel 1',
    'Lernziel 2',
  ],
  order: 3,
}
```

### 2. Neue Aufgabe erstellen

In `lib/data.ts` zum Array `challenges` hinzufügen:

**Code-Aufgabe:**
```typescript
{
  id: '4',
  moduleId: '3', // ID des zugehörigen Moduls
  title: 'Aufgabe: Variablen',
  description: 'Erstelle eine Variable',
  type: 'code',
  difficulty: 'easy',
  codeTemplate: '// Dein Code hier\n',
  language: 'javascript',
  solution: 'let name = "Test";',
  order: 1,
}
```

**Quiz-Aufgabe:**
```typescript
{
  id: '5',
  moduleId: '3',
  title: 'Quiz: Grundlagen',
  description: 'Teste dein Wissen',
  type: 'multiple-choice',
  difficulty: 'easy',
  quizQuestion: 'Was ist eine Variable?',
  quizOptions: [
    'Option 1',
    'Option 2 (richtig)',
    'Option 3',
    'Option 4',
  ],
  quizCorrectAnswer: 1, // Index der richtigen Antwort
  order: 2,
}
```

## Design anpassen

### Farben ändern

In `tailwind.config.js` die Farben anpassen:

```javascript
colors: {
  primary: {
    // Deine Blautöne
  },
  grey: {
    // Deine Grautöne
  },
}
```

### Komponenten anpassen

Alle UI-Komponenten befinden sich in `components/ui/` und können nach Bedarf angepasst werden.

## Production Build

```bash
npm run build
npm start
```

## Nächste Schritte

- Weitere Module und Aufgaben hinzufügen
- Code-Validierung erweitern (siehe `validateCodeSolution` in `lib/data.ts`)
- Eigene Videos einbinden
- Weitere Features nach Bedarf hinzufügen


# Projektarchitektur - Einstieg mit R

## Übersicht

Diese Dokumentation beschreibt die Struktur und Architektur der Einstieg mit R Lernplattform.

## Projektstruktur

```
ariano/
├── app/                          # Next.js App Router (Pages)
│   ├── layout.tsx               # Root Layout mit Navigation
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Globale Styles (Tailwind)
│   ├── lerninhalte/
│   │   └── page.tsx             # Lerninhalte-Seite
│   └── aufgaben/
│       └── page.tsx             # Aufgaben-Seite
│
├── components/                   # Wiederverwendbare Komponenten
│   ├── layout/
│   │   └── Navigation.tsx       # Hauptnavigation
│   └── ui/                      # UI-Komponenten
│       ├── Button.tsx           # Button-Komponente
│       ├── Card.tsx             # Card-Komponente
│       └── CodeEditor.tsx       # Code-Editor (Monaco)
│
├── lib/                         # Utilities und Daten
│   └── data.ts                  # Datenstrukturen und Beispiel-Daten
│
└── public/                      # Statische Assets (optional)
```

## Komponenten-Architektur

### Layout-Komponenten

**Navigation** (`components/layout/Navigation.tsx`)
- Hauptnavigation der Website
- Zeigt aktive Seite an
- Responsive Design

### UI-Komponenten

**Button** (`components/ui/Button.tsx`)
- Wiederverwendbare Button-Komponente
- Varianten: primary, secondary, outline
- Kann als Link oder Button verwendet werden

**Card** (`components/ui/Card.tsx`)
- Container-Komponente für Inhalte
- Unterstützt Hover-Effekte
- Konsistentes Styling

**CodeEditor** (`components/ui/CodeEditor.tsx`)
- Integrierter Code-Editor basierend auf Monaco Editor
- Syntax-Highlighting
- Code-Validierung und Feedback
- Unterstützt verschiedene Programmiersprachen

## Datenstruktur

### LearningModule

```typescript
interface LearningModule {
  id: string
  title: string
  description: string
  videoUrl?: string
  content: string              // Markdown-Format
  learningObjectives: string[]
  order: number
}
```

### Challenge

```typescript
interface Challenge {
  id: string
  moduleId: string              // Verknüpfung zum Modul
  title: string
  description: string
  type: 'code' | 'quiz' | 'multiple-choice'
  difficulty: 'easy' | 'medium' | 'hard'
  codeTemplate?: string         // Für Code-Aufgaben
  language?: string             // z.B. 'javascript'
  solution?: string             // Erwartete Lösung
  quizQuestion?: string         // Für Quiz-Aufgaben
  quizOptions?: string[]
  quizCorrectAnswer?: number
  order: number
}
```

## Seiten

### Homepage (`app/page.tsx`)
- Einführung in die Ausbildung
- Erklärung des Lernkonzepts
- Call-to-Action Buttons

### Lerninhalte (`app/lerninhalte/page.tsx`)
- Zeigt alle verfügbaren Lernmodule
- Jedes Modul enthält:
  - Titel und Beschreibung
  - Eingebettetes Video (optional)
  - Theorie-Content (Markdown)
  - Lernziele

### Aufgaben (`app/aufgaben/page.tsx`)
- Liste aller verfügbaren Aufgaben
- Detailansicht mit:
  - Code-Editor für Programmieraufgaben
  - Multiple-Choice Quiz
  - Sofortiges Feedback

## Styling

- **Framework**: Tailwind CSS
- **Farbpalette**: 
  - Primary: Blau (primary-50 bis primary-900)
  - Grey: Grautöne (grey-50 bis grey-900)
- **Responsive**: Desktop-first, funktioniert auf Laptop/Desktop

## Erweiterungen

### Neue Module hinzufügen

1. Öffne `lib/data.ts`
2. Füge ein neues `LearningModule` zum Array `learningModules` hinzu
3. Verwende Markdown für den `content`-Feld

### Neue Aufgaben hinzufügen

1. Öffne `lib/data.ts`
2. Füge eine neue `Challenge` zum Array `challenges` hinzu
3. Setze `moduleId` auf die ID des zugehörigen Moduls
4. Für Code-Aufgaben: Definiere `codeTemplate`, `language` und `solution`
5. Für Quiz-Aufgaben: Definiere `quizQuestion`, `quizOptions` und `quizCorrectAnswer`

### Code-Validierung erweitern

Die Funktion `validateCodeSolution` in `lib/data.ts` kann erweitert werden für:
- Komplexere Validierungen
- Unit-Tests
- Code-Analyse

## Technische Details

- **Next.js 14**: App Router für Routing
- **TypeScript**: Type Safety
- **Monaco Editor**: VS Code Editor im Browser
- **React Markdown**: Markdown-Rendering für Theorie-Content


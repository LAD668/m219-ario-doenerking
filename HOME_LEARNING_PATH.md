# Homepage Learning Path - Dokumentation

## Übersicht

Die Lernpfad-Übersicht auf der Homepage zeigt den Fortschritt visuell an und motiviert Lernende, weiterzumachen. Das Design ist Duolingo-inspiriert, aber professionell und seriös.

## UI-Struktur

### Layout

```
Homepage
├── Hero Section
├── Learning Path Section (neu)
│   ├── Header
│   │   ├── Titel "Dein Lernpfad"
│   │   ├── Progress Text ("X von Y Modulen abgeschlossen")
│   │   └── Progress Bar
│   ├── Learning Path Container
│   │   ├── Connection Lines (vertikale Linien)
│   │   └── Module Cards (vertikal angeordnet)
│   │       ├── Module Icon (links)
│   │       └── Module Card (rechts)
│   │           ├── Badge (Modul X, Status)
│   │           ├── Titel
│   │           ├── Beschreibung
│   │           └── Action Button
│   └── CTA Button
└── Info Section
```

### Module Card Struktur

Jede Module Card enthält:

1. **Icon** (links, 48x48px):
   - Completed: Blauer Kreis mit weißem Checkmark
   - Active: Blauer Kreis mit weißer Zahl, Ring-Highlight
   - Locked: Grauer Kreis mit Schloss-Icon

2. **Card Content** (rechts):
   - Badge: "Modul X" + Status-Badge (Aktiv/Abgeschlossen)
   - Titel: Fett, groß
   - Beschreibung: Kurz, klar
   - Action Button: "Jetzt starten" oder "Wiederholen"

3. **Connection Line** (zwischen Modulen):
   - Vertikale Linie zwischen Icons
   - Blau wenn vorheriges Modul completed
   - Grau wenn gesperrt

## State Logic

### Module States

**Locked (Gesperrt)**
- Icon: Grauer Kreis mit Schloss
- Card: Grauer Hintergrund, niedrige Opacity
- Border: Grau
- Cursor: not-allowed
- Button: Kein Button
- Klickbar: Nein

**Active (Aktiv)**
- Icon: Blauer Kreis mit Modul-Nummer, Ring-Highlight
- Card: Weißer Hintergrund, blauer Border, Ring
- Border: Primary-500
- Shadow: Groß, mit Ring
- Cursor: pointer
- Button: "Jetzt starten"
- Klickbar: Ja

**Completed (Abgeschlossen)**
- Icon: Blauer Kreis mit weißem Checkmark
- Card: Weißer Hintergrund, blauer Border
- Border: Primary-300
- Shadow: Mittel
- Cursor: pointer
- Button: "Wiederholen"
- Klickbar: Ja

### State Übergänge

1. **Initial**: Modul 1 = active, alle anderen = locked
2. **Completion**: Wenn Modul completed → nächstes Modul wird active
3. **Persistence**: States werden in localStorage gespeichert

### Progress Calculation

```
completedCount = Anzahl Module mit progress === 'completed'
totalModules = Gesamtanzahl Module
progressPercentage = (completedCount / totalModules) * 100
```

## Visuelles Design

### Farben

- **Primary (Blau)**: 
  - Active: primary-600 (Icon, Border)
  - Completed: primary-300 (Border)
  - Ring: primary-200 (Highlight)

- **Grey**:
  - Locked: grey-300 (Icon), grey-200 (Border)
  - Background: grey-50 (Section)

### Typografie

- **Titel**: text-xl, font-bold, grey-900
- **Beschreibung**: text-sm, grey-600
- **Badge**: text-xs, uppercase, tracking-wide

### Spacing

- **Module Abstand**: space-y-8 (32px)
- **Card Padding**: p-6 (24px)
- **Icon Size**: w-12 h-12 (48px)
- **Line Width**: w-0.5 (2px)

### Shadows & Effects

- **Active**: shadow-lg + ring-2 ring-primary-200
- **Completed**: shadow-md
- **Hover**: shadow-lg/xl (nur bei accessible)

## Interaktivität

### Klick-Verhalten

- **Active/Completed**: Card ist klickbar → führt zu `/lerninhalte?module={id}`
- **Locked**: Nicht klickbar, zeigt Cursor not-allowed
- **Button**: Separate Klick-Area, verhindert Card-Klick

### Hover-Effekte

- **Active/Completed Cards**: Erhöhter Shadow
- **Buttons**: Standard Button Hover
- **Locked**: Keine Hover-Effekte

## Responsive Design

### Desktop (≥1024px)
- Max-Width: 2xl (672px)
- Zwei-Spalten: Icon links, Card rechts
- Volle Funktionalität

### Tablet (768px - 1024px)
- Gleiche Struktur
- Etwas kompakter

### Mobile (<768px)
- Cards werden schmaler
- Buttons: w-full auf Mobile
- Linien bleiben sichtbar

## Skalierbarkeit

### Neue Module hinzufügen

1. Modul zu `learningModules` Array hinzufügen
2. Automatisch in Learning Path angezeigt
3. States werden automatisch verwaltet
4. Connection Lines werden automatisch generiert

### Erweiterte Features (optional)

- **Module Icons**: Können durch Custom Icons ersetzt werden
- **Module Bilder**: Können hinzugefügt werden
- **Zusätzliche Info**: Können in Cards eingefügt werden
- **Animationen**: Können für State-Übergänge hinzugefügt werden

## Technische Details

### Komponente

- **Name**: `HomeLearningPath`
- **Location**: `components/learning/HomeLearningPath.tsx`
- **Type**: Client Component ('use client')
- **Dependencies**: 
  - `learningModules` aus `lib/data`
  - Progress-Funktionen aus `lib/learningPath`

### State Management

- Verwendet `initializeProgress()` für Initialisierung
- Lädt Progress aus localStorage
- Aktualisiert bei jedem Render
- Keine lokalen States für Module (nur für Progress)

### Performance

- Keine unnötigen Re-Renders
- Progress wird nur einmal initialisiert
- Icons werden inline gerendert (keine separate Komponenten)

## Best Practices

### Do's

✅ Verwende die bestehende Progress-Logik
✅ Halte das Design professionell
✅ Zeige klare visuelle Unterscheidung zwischen States
✅ Mache nur zugängliche Module klickbar
✅ Zeige Progress-Informationen prominent

### Don'ts

❌ Keine spielerischen Animationen
❌ Keine Emojis in der UI (außer in Completion-Messages)
❌ Keine zu grellen Farben
❌ Keine verwirrenden Icons
❌ Keine überladenen Cards


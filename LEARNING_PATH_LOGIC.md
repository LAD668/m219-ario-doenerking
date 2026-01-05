# Learning Path Logic - Dokumentation

## Übersicht

Das Learning Path System strukturiert den Lernprozess durch eine geordnete Abfolge von Modulen. Jedes Modul muss in einer festen Reihenfolge abgeschlossen werden, bevor das nächste Modul freigeschaltet wird.

## Datenstruktur

### Module States

Ein Modul kann drei Zustände haben:

- **`locked`**: Modul ist gesperrt, noch nicht zugänglich
- **`active`**: Modul ist aktiv und kann bearbeitet werden
- **`completed`**: Modul ist abgeschlossen

### Module Progress

Der Fortschritt eines Moduls wird in drei Stufen getrackt:

- **`not-started`**: Noch nicht begonnen
- **`in-progress`**: In Bearbeitung (Theorie angesehen ODER Aufgabe begonnen)
- **`completed`**: Abgeschlossen (Theorie angesehen UND Aufgabe gelöst)

### Progress Data Structure

```typescript
interface ModuleProgressData {
  moduleId: string
  state: ModuleState           // locked | active | completed
  progress: ModuleProgress     // not-started | in-progress | completed
  contentViewed: boolean       // Theorie wurde angesehen
  challengeCompleted: boolean // Aufgabe wurde erfolgreich gelöst
  completedAt?: number        // Timestamp der Completion
}

interface LearningPathProgress {
  modules: Record<string, ModuleProgressData>
  lastActiveModuleId: string | null
  overallProgress: number      // 0-100
}
```

## Completion Rules

Ein Modul gilt als abgeschlossen, wenn **beide** Bedingungen erfüllt sind:

1. ✅ **Content Viewed**: Der Lernende hat die Theorie-Seite des Moduls aufgerufen
2. ✅ **Challenge Completed**: Der Lernende hat mindestens eine Aufgabe des Moduls erfolgreich gelöst

### Automatisches Freischalten

- Das erste Modul ist standardmäßig `active`
- Sobald ein Modul `completed` ist, wird das nächste Modul automatisch auf `active` gesetzt
- Gesperrte Module werden sichtbar, aber nicht klickbar angezeigt

## State Management

### localStorage

Der Fortschritt wird im Browser-LocalStorage gespeichert:

- **Key**: `ariano-learning-path-progress`
- **Format**: JSON-String
- **Persistenz**: Bleibt erhalten zwischen Sessions
- **Scope**: Pro Browser/Device

### Funktionen

#### `initializeProgress(modules)`
Initialisiert den Fortschritt für alle Module. Wird beim Laden der App aufgerufen.

#### `markContentViewed(moduleId, modules)`
Markiert die Theorie eines Moduls als angesehen. Wird automatisch aufgerufen, wenn die Lerninhalte-Seite eines Moduls geladen wird.

#### `markChallengeCompleted(moduleId, modules)`
Markiert eine Aufgabe als gelöst. Wird aufgerufen, wenn:
- Eine Code-Aufgabe erfolgreich validiert wurde
- Eine Quiz-Frage korrekt beantwortet wurde

#### `getModuleState(moduleId)`
Gibt den aktuellen State eines Moduls zurück.

#### `isModuleAccessible(moduleId)`
Prüft, ob ein Modul zugänglich ist (active oder completed).

## User Flow

### 1. Erster Besuch

```
1. User öffnet die Website
2. System initialisiert Progress (alle Module auf locked, außer Modul 1 = active)
3. User sieht Lernpfad-Übersicht
4. Modul 1 ist als "Aktiv" markiert
5. User klickt auf "Theorie ansehen" → Modul 1 wird geöffnet
6. Content wird automatisch als "angesehen" markiert
7. User klickt auf "Aufgabe lösen" → Aufgabe wird geöffnet
8. User löst Aufgabe erfolgreich → Modul 1 wird als "completed" markiert
9. Modul 2 wird automatisch auf "active" gesetzt
```

### 2. Fortsetzung

```
1. User öffnet Website erneut
2. System lädt gespeicherten Progress
3. User sieht, welche Module abgeschlossen sind
4. Nächstes aktives Modul ist hervorgehoben
5. User kann:
   - Abgeschlossene Module erneut ansehen
   - Aktives Modul bearbeiten
   - Gesperrte Module sehen (aber nicht öffnen)
```

### 3. Navigation

**Lernpfad-Übersicht (`/lernpfad`)**
- Zeigt alle Module in Reihenfolge
- Status-Icons für jeden State
- Fortschrittsanzeige
- Direkte Links zu Theorie und Aufgaben

**Lerninhalte (`/lerninhalte?module={id}`)**
- Zeigt Theorie eines spezifischen Moduls
- Automatisches Tracking beim Laden
- Navigation zwischen Modulen (nur für zugängliche)
- Link zur Aufgabe

**Aufgaben (`/aufgaben?module={id}`)**
- Zeigt Aufgaben eines spezifischen Moduls
- Automatisches Tracking bei erfolgreicher Lösung
- Completion-Message bei Abschluss
- Link zurück zum Lernpfad

## UI Behavior

### Lernpfad-Übersicht

**Module States Visualisierung:**
- 🔒 **Locked**: Grauer Hintergrund, Schloss-Icon, nicht klickbar
- 🔵 **Active**: Blauer Hintergrund, Punkt-Icon, hervorgehoben mit Ring
- ✅ **Completed**: Grüner Hintergrund, Checkmark-Icon

**Progress Details:**
- Checkboxen zeigen, ob Theorie angesehen wurde
- Checkboxen zeigen, ob Aufgabe gelöst wurde
- Beide müssen erfüllt sein für Completion

**Actions:**
- "Theorie ansehen" Button (nur bei active/completed)
- "Aufgabe lösen" Button (nur bei active/completed)
- Gesperrte Module zeigen Hinweistext

### Lerninhalte Seite

**Module Navigation:**
- Tabs für alle Module
- Gesperrte Module sind disabled
- Aktives Modul ist hervorgehoben

**Content Viewing:**
- Automatisches Tracking beim Laden
- "Zur Aufgabe" Button am Ende

**Locked Module:**
- Zeigt "Modul gesperrt" Message
- Link zum Lernpfad

### Aufgaben Seite

**Challenge Filtering:**
- Zeigt nur Aufgaben für zugängliche Module
- Optional: Filterung nach Modul-ID

**Completion Tracking:**
- Code-Aufgaben: Tracking bei erfolgreicher Validierung
- Quiz: Tracking bei korrekter Antwort
- Erfolgs-Message mit Link zum Lernpfad

**Module Completion:**
- Spezielle Message, wenn Modul abgeschlossen
- Hinweis auf nächstes freigeschaltetes Modul

## Progress Calculation

### Overall Progress

```
completedModules = Anzahl Module mit progress === 'completed'
totalModules = Gesamtanzahl Module
overallProgress = (completedModules / totalModules) * 100
```

### Per Module Progress

Ein Modul hat `progress: 'completed'` wenn:
- `contentViewed === true` UND
- `challengeCompleted === true`

## Edge Cases

### Leere Module
- Module ohne Aufgaben können nicht abgeschlossen werden
- System sollte dies verhindern oder alternative Completion-Logik haben

### Mehrere Aufgaben pro Modul
- Aktuell: Eine erfolgreiche Aufgabe reicht für Completion
- Erweiterbar: Alle Aufgaben müssen gelöst werden

### Zurücksetzen
- Funktion `resetProgress()` für Testing/Debugging
- Kann in Development-Mode verfügbar gemacht werden

## Erweiterungen

### Mögliche Features

1. **Teil-Completion**: Fortschritt auch bei teilweise gelösten Aufgaben
2. **Zeit-Tracking**: Wie lange für jedes Modul benötigt wurde
3. **Wiederholungen**: Möglichkeit, Module erneut zu absolvieren
4. **Zertifikate**: Belohnung bei Abschluss aller Module
5. **Social Features**: Vergleich mit anderen Lernenden

### Technische Erweiterungen

1. **Backend Integration**: Progress auf Server speichern
2. **Multi-Device Sync**: Fortschritt zwischen Geräten synchronisieren
3. **Analytics**: Tracking von Lernverhalten
4. **Offline Support**: Progress auch ohne Internet speichern

## Testing

### Test-Szenarien

1. **Erster Besuch**: Alle Module sollten initialisiert werden
2. **Module Completion**: Nächstes Modul sollte freigeschaltet werden
3. **Progress Persistence**: Progress sollte nach Reload erhalten bleiben
4. **Navigation**: Gesperrte Module sollten nicht zugänglich sein
5. **Multiple Challenges**: Alle Challenges eines Moduls sollten getrackt werden

### Debugging

```typescript
// Progress zurücksetzen
import { resetProgress } from '@/lib/learningPath'
resetProgress()

// Progress anzeigen
import { getProgress } from '@/lib/learningPath'
console.log(getProgress())
```


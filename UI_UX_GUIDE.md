# UI/UX Design Guide - Einstieg mit R

## Design-Philosophie

Das Design von Einstieg mit R folgt klaren Prinzipien für eine professionelle, moderne und lernorientierte Erfahrung:

### Kernprinzipien

1. **Professionalität**: Seriös, vertrauenswürdig, erwachsen
2. **Klarheit**: Keine Ablenkungen, Fokus auf Inhalt
3. **Lesbarkeit**: Optimale Typografie und Kontraste
4. **Hierarchie**: Wichtige Elemente stechen hervor
5. **Einfachheit**: Intuitive Navigation und Interaktion

## Visuelle Identität

### Farben

**Primary (Blau)**
- Hauptfarbe für Aktionen, Links, Navigation
- Signalisiert Vertrauen und Professionalität
- Verwendung: Buttons, Links, Navigation, Akzente

**Grey (Grau)**
- Sekundärfarbe für Text, Borders, Hintergründe
- Schafft Struktur ohne Ablenkung
- Verwendung: Body Text, Borders, Cards, Hintergründe

**Weiß**
- Haupt-Hintergrund für Lesbarkeit
- Kontrast zu Text und Inhalten
- Verwendung: Card Hintergründe, Haupt-Background

### Typografie

**Inter Font Family**
- Moderne, professionelle Sans-Serif
- Hohe Lesbarkeit auf Bildschirmen
- Klare Unterscheidung zwischen Überschriften und Body Text

**Hierarchie**
- H1: Hero-Titel, Hauptüberschriften (36-48px)
- H2: Seitenüberschriften (30px)
- H3: Abschnittsüberschriften (24px)
- Body: Standard-Text (16px)
- Small: Metadaten, sekundärer Text (14px)

### Spacing

**Konsistentes 4px-Grid**
- Alle Abstände basieren auf Vielfachen von 4px
- Section Spacing: 48-64px (py-12 md:py-16)
- Card Padding: 24px (p-6)
- Element Spacing: 24px (space-y-6)

## Seiten-Design

### Homepage

**Hero Section**
- Zentrierte Ausrichtung
- Klare Headline mit Subtitle
- Primärer CTA: "Jetzt starten"
- Sekundärer CTA: "Aufgaben"

**Info Section**
- 3-spaltiges Grid (Desktop)
- Cards mit Hover-Effekt
- Klare Icons (SVG statt Emojis)
- Fokus auf Text-Inhalt

**CTA Section**
- Prominente Platzierung
- Blauer Hintergrund für Aufmerksamkeit
- Klarer Call-to-Action

### Lerninhalte Seite

**Layout**
- Max-Width: 5xl für optimale Lesbarkeit
- Progress Indicator oben
- Vertikale Liste der Module

**Modul Card**
- Modul-Nummer als Badge
- Titel und Beschreibung prominent
- Video-Player mit Rahmen
- Theorie-Content in Markdown
- Lernziele als Liste mit Checkmarks

**Progress Indicator**
- Visueller Fortschrittsbalken
- Text-Label mit Zahlen
- Primary-Farbe für Fortschritt

### Aufgaben Seite

**Layout**
- 2-Spalten: Sidebar + Hauptbereich
- Sidebar: Kompakte Aufgabenliste
- Hauptbereich: Detaillierte Aufgabe

**Aufgabenliste (Sidebar)**
- Kompakte Buttons
- Schwierigkeits-Badge
- Modul-Referenz
- Active State: Primary-Hintergrund

**Aufgabe-Detail**
- Klare Beschreibung oben
- Code-Editor: Dunkler Container (grey-900)
- Submit-Button: Primary, prominent
- Reset-Button: Sekundär, dezent
- Feedback: Farbcodiert (Grün/Rot)

**Code Editor**
- Dunkler Hintergrund (grey-900)
- Monaco Editor mit Dark Theme
- Professionelles Aussehen
- Klare Trennung vom Rest

**Quiz**
- Große, klickbare Optionen
- Hover-States für Feedback
- Klare Submit-Button
- Farbcodiertes Feedback

## Komponenten-System

### Button

**Variants**
- Primary: Blau, für Hauptaktionen
- Secondary: Grau, für sekundäre Aktionen
- Outline: Umrandet, für alternative Aktionen

**States**
- Default: Standard-Farbe
- Hover: Dunklere Farbe
- Focus: Ring für Accessibility
- Disabled: Grau, nicht klickbar

### Card

**Standard**
- Weißer Hintergrund
- Subtile Border (grey-200)
- Leichter Shadow (shadow-sm)
- Abgerundete Ecken

**Hover**
- Erhöhter Shadow (shadow-md)
- Sanfter Übergang

### Code Editor Container

**Design**
- Dunkler Hintergrund (grey-900)
- Border für Definition
- Abgerundete Ecken
- Professionelles Aussehen

**Controls**
- Submit-Button: Primary, prominent
- Reset-Button: Grau, sekundär
- Feedback: Farbcodiert, klar lesbar

### Feedback Messages

**Success (Grün)**
- Hintergrund: green-50
- Border: green-200
- Text: green-800
- Icon: ✓

**Error (Rot)**
- Hintergrund: red-50
- Border: red-200
- Text: red-800
- Icon: ✗

**Hint (Blau)**
- Hintergrund: blue-50
- Border: blue-200
- Text: blue-800
- Icon: ℹ

## Responsive Design

### Breakpoints

- **Mobile**: < 768px - 1 Spalte
- **Tablet**: 768px - 1024px - 2 Spalten
- **Desktop**: ≥ 1024px - 3 Spalten

### Desktop-First Approach

- Design primär für Laptop/Desktop optimiert
- Tablet und Mobile unterstützt, aber nicht priorisiert
- Grid passt sich automatisch an

## Accessibility

### Kontraste

- Mindestens 4.5:1 für Body Text
- Mindestens 3:1 für große Texte
- Alle Farben getestet für Lesbarkeit

### Interaktion

- Focus-States auf allen interaktiven Elementen
- Keyboard-Navigation vollständig unterstützt
- Semantisches HTML für Screen Reader

### Typografie

- Mindest-Schriftgröße: 14px
- Ausreichender Zeilenabstand (1.5-1.6)
- Klare Hierarchie für Überschriften

## Best Practices

### Do's

✅ Verwende konsistente Spacing-Werte
✅ Nutze die definierten Farben aus dem Design-System
✅ Halte Typografie-Hierarchie ein
✅ Verwende Cards für zusammengehörige Inhalte
✅ Stelle sicher, dass Buttons klare Labels haben
✅ Zeige Feedback sofort nach Aktionen

### Don'ts

❌ Keine Emojis in der UI (zu spielerisch)
❌ Keine zu grellen Farben
❌ Keine zu kleinen Schriftgrößen
❌ Keine überladenen Layouts
❌ Keine unklaren CTAs
❌ Keine fehlenden Focus-States

## Erweiterungen

### Neue Komponenten hinzufügen

1. Folgen Sie dem bestehenden Design-System
2. Verwenden Sie die definierten Farben und Spacing-Werte
3. Stellen Sie sicher, dass Focus-States vorhanden sind
4. Testen Sie auf verschiedenen Bildschirmgrößen

### Farben anpassen

Ändern Sie die Farben in `tailwind.config.js` und aktualisieren Sie die Dokumentation entsprechend.

### Typografie anpassen

Ändern Sie die Typografie in `app/globals.css` und stellen Sie sicher, dass die Hierarchie erhalten bleibt.


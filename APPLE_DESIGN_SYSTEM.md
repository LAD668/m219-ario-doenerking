# Apple/iOS Design System - Einstieg mit R

## Design-Philosophie

Das Design ist inspiriert von Apple's iOS und macOS, mit Fokus auf:
- **Modern & Premium**: Hochwertiges, zeitloses Design
- **Clean & Minimal**: Keine Ablenkungen, Fokus auf Inhalt
- **Professional**: Seriös, erwachsen, vertrauenswürdig
- **Elegant**: Sanfte Übergänge, weiche Schatten, großzügige Abstände

## Farbpalette

### Primary Colors (Blau-Gradient)

- **Dark Blue**: `#0a2540` - Dunkler Hintergrund, Navigation
- **Medium Blue**: `#0f4c81` - Primary Actions, Buttons
- **Light Blue**: `#e6f1fb` - Helle Akzente, Hintergründe

### Background Gradient

```
linear-gradient(180deg, #0a2540 0%, #0f4c81 50%, #e6f1fb 100%)
```

- Von dunkelblau oben zu hellblau unten
- Erzeugt Tiefe und visuelles Interesse
- Professionell, nicht ablenkend

### Glass Morphism

- **Glass Cards**: `bg-white/90 backdrop-blur-md`
- **Light Glass**: `bg-white/70 backdrop-blur-sm`
- **Navigation**: `bg-white/10 backdrop-blur-xl`
- Transparenz mit Blur-Effekt für moderne Optik

## Typografie

### Font Family

- **Primary**: Inter (Apple System Font ähnlich)
- **Code**: Monaco, Menlo (Apple Monospace Fonts)
- **Fallback**: System-UI Fonts für native Optik

### Typography Scale

- **H1**: 36-48px, bold, tracking-tight
- **H2**: 30px, bold
- **H3**: 24px, semibold
- **Body**: 16px, regular, leading-relaxed
- **Small**: 14px, regular

## Layout & Spacing

### Border Radius

- **Cards**: `rounded-3xl` (24px) - Großzügig, modern
- **Buttons**: `rounded-2xl` (16px) - Abgerundet, freundlich
- **Icons**: `rounded-2xl` (16px) - Konsistent
- **Small Elements**: `rounded-xl` (12px)

### Shadows

- **Soft**: `0 2px 8px rgba(0, 0, 0, 0.08)` - Subtile Tiefe
- **Soft LG**: `0 4px 16px rgba(0, 0, 0, 0.12)` - Mittlere Tiefe
- **Soft XL**: `0 8px 24px rgba(0, 0, 0, 0.16)` - Starke Tiefe
- **Card**: Kombination aus Shadow und Border

### Spacing

- **Section**: 48-64px (py-12 md:py-16)
- **Card Padding**: 24-32px (p-6 bis p-8)
- **Element Gap**: 24-32px (gap-6 bis gap-8)
- Großzügig für Premium-Gefühl

## Navigation

### Sidebar Navigation

**Position**: Fixed links, 80px breit

**Design**:
- Transparenter Hintergrund mit Blur
- Icon-basiert (keine Text-Labels)
- Tooltips auf Hover
- Active State: Weißer Hintergrund mit Opacity

**Icons**:
- Home: Haus-Icon
- Lernpfad: Ordner-Icon
- Größe: 24px (w-6 h-6)

**Behavior**:
- Hover: Leichter Hintergrund
- Active: Deutlicher Hintergrund
- Smooth Transitions (200ms)

## Komponenten

### Cards

**Standard Card**:
- `glass-card`: Weißer Hintergrund (90% Opacity) + Blur
- `rounded-3xl`: Große Border-Radius
- `shadow-soft-lg`: Sanfter Schatten
- `p-6` oder `p-8`: Großzügiges Padding

**Hover State**:
- Erhöhter Shadow
- Smooth Transition (200ms)

### Buttons

**Primary Button**:
- `bg-primary-medium`: Medium Blue
- `rounded-2xl`: Abgerundet
- `hover:bg-primary-dark`: Dunkler auf Hover
- `shadow-soft-lg`: Sanfter Schatten
- Keine Borders

**Outline Button**:
- `bg-white/80`: Transparenter Hintergrund
- `backdrop-blur-sm`: Blur-Effekt
- `border border-white/40`: Subtile Border
- Sanfte Hover-Effekte

### Progress Indicators

**Progress Bar**:
- Hintergrund: `bg-white/20` mit Blur
- Fill: `bg-white` mit Shadow
- `rounded-full`: Vollständig abgerundet
- Smooth Animation (500ms)

## Seiten-Layout

### Homepage

**Hero Section**:
- Glass Card mit großem Padding
- Weißer Text auf Gradient-Hintergrund
- Zentrierte Ausrichtung

**Learning Path**:
- Glass Cards für Module
- Verbindungslinien mit Transparenz
- Icons mit größeren Border-Radius

### Lernpfad Seite

- Glass Cards für Module
- Sanfte Schatten
- Klare Hierarchie

### Lerninhalte Seite

- Glass Card für Content
- Video-Container mit abgerundeten Ecken
- Klare Typografie

### Aufgaben Seite

- Glass Cards für Challenges
- Code-Editor mit dunklem Hintergrund
- Sanfte Feedback-Messages

## Responsive Design

### Desktop (≥1024px)
- Sidebar: 80px breit, fixed
- Content: ml-20 (Margin für Sidebar)
- Volle Funktionalität

### Tablet (768px - 1024px)
- Sidebar bleibt sichtbar
- Content passt sich an
- Cards bleiben großzügig

### Mobile (<768px)
- Sidebar kann kollabiert werden (optional)
- Cards werden schmaler
- Padding bleibt großzügig

## Animationen & Transitions

### Timing

- **Standard**: 200ms
- **Progress**: 500ms
- **Hover**: 200ms

### Easing

- Standard: `ease-in-out`
- Smooth, natürliche Bewegungen

### Was animiert wird

- Hover States (Shadow, Background)
- Progress Bars
- State Changes
- Keine ablenkenden Animationen

## Glass Morphism Details

### Backdrop Blur

- **Strong**: `backdrop-blur-xl` (24px) - Navigation
- **Medium**: `backdrop-blur-md` (12px) - Cards
- **Light**: `backdrop-blur-sm` (4px) - Subtile Elemente

### Opacity Levels

- **90%**: Haupt-Cards (gute Lesbarkeit)
- **70%**: Leichtere Cards
- **40%**: Disabled/Locked States
- **20%**: Subtile Hintergründe
- **10%**: Navigation Background

## Skalierbarkeit

### Neue Module

- Automatisch im neuen Stil
- Glass Cards werden verwendet
- Icons passen sich an

### Neue Komponenten

- Verwende Glass Morphism
- Große Border-Radius
- Sanfte Schatten
- Smooth Transitions

## Best Practices

### Do's

✅ Verwende Glass Morphism für Cards
✅ Große Border-Radius (16-24px)
✅ Sanfte Schatten
✅ Großzügige Abstände
✅ Smooth Transitions (200ms)
✅ Transparenz mit Blur

### Don'ts

❌ Keine harten Borders
❌ Keine grellen Farben
❌ Keine kleinen Border-Radius
❌ Keine harten Schatten
❌ Keine schnellen Animationen
❌ Keine volle Opacity ohne Blur


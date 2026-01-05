# Liquid Glass (Glassmorphism) Design System

## Design-Philosophie

Liquid Glass Design kombiniert Transparenz, Blur-Effekte und subtile Schatten für ein modernes, premium Aussehen im Apple/iOS/visionOS-Stil.

**Kernprinzipien:**
- **Subtile Eleganz**: Glass-Effekte sind dezent, nicht aufdringlich
- **Lesbarkeit First**: Text muss immer gut lesbar sein
- **Tiefe durch Schichten**: Glass-Elemente schweben über dem Hintergrund
- **Professionell**: Keine Neon-Effekte oder starke Glows

## Glass-Effekt Spezifikationen

### Standard Glass Card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.25);  /* 25% Opacity */
  backdrop-filter: blur(20px);            /* 20px Blur */
  border: 1px solid rgba(255, 255, 255, 0.3);  /* Subtile Border */
  border-radius: 24px;                     /* 3xl */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);  /* Sanfter Schatten */
}
```

**Hover State:**
- Opacity erhöht auf 30%
- Shadow verstärkt
- `translateY(-2px)` für Lift-Effekt

### Light Glass Card

```css
.glass-card-light {
  background: rgba(255, 255, 255, 0.20);  /* 20% Opacity */
  backdrop-filter: blur(16px);             /* 16px Blur */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;                     /* 2xl */
}
```

### Navigation Glass

```css
.glass-nav {
  background: rgba(255, 255, 255, 0.10);   /* 10% Opacity */
  backdrop-filter: blur(24px);              /* 24px Blur */
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
```

## Anwendungsbereiche

### ✅ Glass-Effekte verwenden für:

1. **UI-Container**
   - Module Cards
   - Info Panels
   - Statistik Cards
   - Navigation Sidebar
   - Learning Path Elements

2. **Interaktive Elemente**
   - Buttons (Outline-Variante)
   - Navigation Items
   - Hover States

3. **Overlays**
   - Modals (falls implementiert)
   - Dropdowns
   - Tooltips

### ❌ Keine Glass-Effekte für:

1. **Code-Editor**
   - Solider dunkler Hintergrund (grey-900)
   - Keine Transparenz
   - Klare Lesbarkeit für Code

2. **Lange Text-Bereiche**
   - Content-Text in Cards hat solide Hintergründe
   - Markdown-Content bleibt lesbar
   - Keine Glass-Effekte auf Text-Containern

3. **Kritische UI-Elemente**
   - Form Inputs (sollten solide sein)
   - Error Messages (müssen klar sichtbar sein)
   - Success Messages (müssen klar sichtbar sein)

## Text auf Glass

### Dunkler Text (auf hellem Glass)

```css
.text-on-glass {
  color: #111827;  /* grey-900 */
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}
```

- Verwendet für: Überschriften, Body-Text auf Glass Cards
- Text-Shadow für bessere Lesbarkeit

### Heller Text (auf dunklem Glass)

```css
.text-on-glass-light {
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
```

- Verwendet für: Navigation, Icons auf Glass
- Text-Shadow für Kontrast

## Hover-Effekte

### Standard Hover

```css
.glass-card:hover {
  background: rgba(255, 255, 255, 0.30);  /* +5% Opacity */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  transform: translateY(-2px);            /* Subtiler Lift */
  transition: all 200ms ease-in-out;
}
```

### Navigation Item Hover

```css
.glass-nav-item:hover {
  background: rgba(255, 255, 255, 0.30);
  transform: translateY(-2px);
}
```

## Border & Shadows

### Borders

- **Opacity**: 20-30% (rgba(255, 255, 255, 0.2-0.3))
- **Width**: 1px
- **Style**: solid
- **Purpose**: Definiert Glass-Container, nicht zu dominant

### Shadows

- **Soft**: `0 2px 8px rgba(0, 0, 0, 0.08)` - Subtile Tiefe
- **Soft LG**: `0 4px 16px rgba(0, 0, 0, 0.12)` - Standard
- **Soft XL**: `0 8px 24px rgba(0, 0, 0, 0.16)` - Hover/Active

## Komponenten-Spezifikationen

### Card Component

**Standard:**
- `glass-card` Klasse
- 25% Opacity
- 20px Blur
- Border mit 30% Opacity
- Hover: +5% Opacity, translateY(-2px)

**Ohne Glass:**
- `glass={false}` prop
- Solider weißer Hintergrund
- Für Text-Content oder Code-Bereiche

### Navigation

**Sidebar:**
- 10% Opacity Background
- 24px Blur
- Border rechts
- Items: 20% Opacity, erhöht auf Hover

**Active State:**
- 30% Opacity
- Stärkerer Blur (md)
- Border mit 40% Opacity
- Shadow für Tiefe

### Buttons

**Primary:**
- Solider Hintergrund (kein Glass)
- Für wichtige Aktionen

**Outline:**
- Glass-Effekt (`glass-card-light`)
- Transparenter Hintergrund
- Border für Definition

## Accessibility

### Kontrast

- **Text auf Glass**: Mindestens 4.5:1 Kontrast
- **Icons**: Klar sichtbar, keine Transparenz
- **Buttons**: Ausreichender Kontrast für States

### Lesbarkeit

- Text-Shadow für bessere Lesbarkeit
- Keine Glass-Effekte auf langen Text-Passagen
- Solide Hintergründe für Code und wichtige Inhalte

## Animationen

### Transitions

- **Duration**: 200ms (standard)
- **Easing**: ease-in-out
- **Properties**: all (background, shadow, transform)

### Hover-Animationen

1. **Opacity**: Erhöhung um 5%
2. **Shadow**: Verstärkung
3. **Transform**: translateY(-2px) für Lift
4. **Smooth**: Keine ruckartigen Bewegungen

## Skalierbarkeit

### Neue Glass-Komponenten

1. Verwende `.glass-card` oder `.glass-card-light`
2. Füge Hover-Effekte hinzu
3. Stelle Lesbarkeit sicher
4. Teste auf verschiedenen Hintergründen

### Opacity-Levels

- **10%**: Navigation Background
- **20%**: Light Cards, Navigation Items
- **25%**: Standard Cards
- **30%**: Hover States, Active States
- **40%+**: Nicht empfohlen (zu opak)

## Best Practices

### Do's

✅ Verwende Glass nur für UI-Container
✅ Stelle sicher, dass Text lesbar ist
✅ Verwende Text-Shadow für besseren Kontrast
✅ Subtile Hover-Effekte mit translateY
✅ Sanfte Transitions (200ms)
✅ Teste auf verschiedenen Bildschirmgrößen

### Don'ts

❌ Keine Glass-Effekte auf Code-Editor
❌ Keine Glass-Effekte auf langen Text-Bereichen
❌ Keine Neon-Glows oder starke Leuchteffekte
❌ Keine zu hohe Opacity (>40%)
❌ Keine schnellen Animationen
❌ Keine Glass-Effekte ohne Blur

## Technische Details

### Backdrop Blur Support

- Modern browsers unterstützen `backdrop-filter`
- Fallback: Solider Hintergrund wenn nicht unterstützt
- Progressive Enhancement

### Performance

- Blur kann performance-intensiv sein
- Verwendet sparsam
- Teste auf verschiedenen Geräten

### Browser-Kompatibilität

- Chrome/Edge: ✅ Vollständig unterstützt
- Safari: ✅ Vollständig unterstützt
- Firefox: ✅ Unterstützt (neuere Versionen)


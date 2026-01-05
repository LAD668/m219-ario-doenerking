# Design System - Einstieg mit R

## Design-Prinzipien

1. **Professional & Educational**: Seriös, modern, lernorientiert
2. **Clean & Minimalistic**: Keine Ablenkungen, Fokus auf Inhalt
3. **High Readability**: Klare Typografie, ausreichend Kontrast
4. **Clear Visual Hierarchy**: Wichtige Elemente stechen hervor
5. **Intuitive Navigation**: Einfach und selbsterklärend

## Farbpalette

### Primary (Blau)
- `primary-50`: #eff6ff - Sehr helle Hintergründe
- `primary-100`: #dbeafe - Helle Akzente
- `primary-200`: #bfdbfe - Subtile Hervorhebungen
- `primary-500`: #3b82f6 - Standard Primary
- `primary-600`: #2563eb - **Primäre Aktionen (Buttons, Links)**
- `primary-700`: #1d4ed8 - Hover States
- `primary-800`: #1e40af - Navigation Background

### Grey (Sekundär)
- `grey-50`: #f9fafb - **Haupt-Hintergrund**
- `grey-100`: #f3f4f6 - Card Hintergründe
- `grey-200`: #e5e7eb - **Borders, Trennlinien**
- `grey-300`: #d1d5db - Subtile Borders
- `grey-400`: #9ca3af - Placeholder Text
- `grey-600`: #4b5563 - Sekundärer Text
- `grey-700`: #374151 - Body Text
- `grey-900`: #111827 - **Überschriften, Primärer Text**

### Feedback Colors
- Success: `green-50` background, `green-700` text, `green-200` border
- Error: `red-50` background, `red-700` text, `red-200` border
- Hint: `blue-50` background, `blue-700` text, `blue-200` border

## Typografie

### Font Family
- **Primary**: Inter (Google Fonts) - Modern, sans-serif, hohe Lesbarkeit
- **Code**: Monaco, 'Courier New', monospace - Für Code-Editor

### Typography Scale

#### Headings
- **H1**: `text-4xl md:text-5xl` (36px/48px) - `font-bold` - `text-grey-900`
  - Verwendung: Hauptüberschriften, Hero-Titel
  - Line Height: 1.2
  - Letter Spacing: -0.02em

- **H2**: `text-3xl` (30px) - `font-bold` - `text-grey-900`
  - Verwendung: Seitenüberschriften, Modul-Titel
  - Line Height: 1.3

- **H3**: `text-2xl` (24px) - `font-semibold` - `text-grey-900`
  - Verwendung: Abschnittsüberschriften
  - Line Height: 1.4

- **H4**: `text-xl` (20px) - `font-semibold` - `text-grey-900`
  - Verwendung: Unterüberschriften
  - Line Height: 1.5

#### Body Text
- **Large**: `text-lg` (18px) - `font-normal` - `text-grey-700`
  - Verwendung: Einleitungen, wichtige Beschreibungen
  - Line Height: 1.6

- **Base**: `text-base` (16px) - `font-normal` - `text-grey-700`
  - Verwendung: Standard Body Text
  - Line Height: 1.6

- **Small**: `text-sm` (14px) - `font-normal` - `text-grey-600`
  - Verwendung: Sekundärer Text, Metadaten
  - Line Height: 1.5

#### Code
- **Code Inline**: `font-mono` - `text-sm` - `bg-grey-100` - `px-1.5 py-0.5` - `rounded`
- **Code Block**: `font-mono` - `text-sm` - `bg-grey-900` - `text-grey-50`

## Spacing System

### Base Unit: 4px (0.25rem)

### Spacing Scale
- `space-1`: 4px (0.25rem) - Sehr kleine Abstände
- `space-2`: 8px (0.5rem) - Kleine Abstände
- `space-3`: 12px (0.75rem) - Kompakte Abstände
- `space-4`: 16px (1rem) - **Standard-Abstand**
- `space-6`: 24px (1.5rem) - Mittlere Abstände
- `space-8`: 32px (2rem) - Große Abstände
- `space-12`: 48px (3rem) - Sehr große Abstände
- `space-16`: 64px (4rem) - Section Abstände
- `space-24`: 96px (6rem) - Hero Abstände

### Vertical Rhythm
- **Section Spacing**: `py-12 md:py-16` (48px/64px)
- **Card Padding**: `p-6` (24px)
- **Element Spacing**: `space-y-6` (24px zwischen Elementen)
- **Tight Spacing**: `space-y-2` (8px zwischen verwandten Elementen)

## Grid & Layout

### Container
- **Max Width**: `max-w-7xl` (1280px)
- **Padding**: `px-4 sm:px-6 lg:px-8` (16px/24px/32px)
- **Centered**: `mx-auto`

### Grid System
- **1 Column**: Mobile (< 768px)
- **2 Columns**: Tablet (768px - 1024px) - `md:grid-cols-2`
- **3 Columns**: Desktop (≥ 1024px) - `lg:grid-cols-3`

### Content Width
- **Full Width**: Für Hero Sections
- **Narrow Content**: `max-w-4xl` - Für Lesetext, Module
- **Wide Content**: `max-w-6xl` - Für Aufgaben mit Sidebar

## Komponenten-Spezifikationen

### Buttons

#### Primary Button
- Background: `bg-primary-600`
- Text: `text-white`
- Hover: `hover:bg-primary-700`
- Padding: `px-6 py-3` (lg), `px-4 py-2` (md), `px-3 py-1.5` (sm)
- Border Radius: `rounded-lg` (8px)
- Font: `font-medium`
- Focus: `focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`

#### Secondary Button
- Background: `bg-grey-600`
- Text: `text-white`
- Hover: `hover:bg-grey-700`

#### Outline Button
- Background: `transparent`
- Border: `border-2 border-primary-600`
- Text: `text-primary-600`
- Hover: `hover:bg-primary-50`

### Cards

#### Standard Card
- Background: `bg-white`
- Border: `border border-grey-200`
- Shadow: `shadow-sm` (subtile)
- Padding: `p-6`
- Border Radius: `rounded-lg` (8px)

#### Card Hover
- Hover: `hover:shadow-md transition-shadow duration-200`

### Code Editor Container

#### Editor Wrapper
- Background: `bg-grey-900`
- Border: `border border-grey-700`
- Border Radius: `rounded-lg`
- Overflow: `overflow-hidden`

#### Editor Controls
- Background: `bg-grey-100`
- Border Top: `border-t border-grey-200`
- Padding: `p-4`
- Button Spacing: `gap-3`

### Feedback Messages

#### Success
- Background: `bg-green-50`
- Border: `border border-green-200`
- Text: `text-green-800`
- Icon: ✓ (green)
- Padding: `p-4`
- Border Radius: `rounded-lg`

#### Error
- Background: `bg-red-50`
- Border: `border border-red-200`
- Text: `text-red-800`
- Icon: ✗ (red)

#### Hint
- Background: `bg-blue-50`
- Border: `border border-blue-200`
- Text: `text-blue-800`
- Icon: ℹ (blue)

### Navigation

#### Nav Bar
- Background: `bg-primary-800`
- Height: `h-16` (64px)
- Text: `text-white`
- Padding: `px-4 sm:px-6 lg:px-8`

#### Nav Link Active
- Background: `bg-primary-900`
- Text: `text-white`

#### Nav Link Inactive
- Text: `text-primary-100`
- Hover: `hover:bg-primary-700 hover:text-white`

### Progress Indicators

#### Progress Bar
- Background: `bg-grey-200`
- Fill: `bg-primary-600`
- Height: `h-2` (8px)
- Border Radius: `rounded-full`

#### Progress Badge
- Background: `bg-primary-100`
- Text: `text-primary-700`
- Padding: `px-3 py-1`
- Border Radius: `rounded-full`
- Font: `text-sm font-semibold`

## Responsive Breakpoints

- **sm**: 640px - Kleine Tablets
- **md**: 768px - Tablets
- **lg**: 1024px - Desktop
- **xl**: 1280px - Große Desktops

## Accessibility

- **Contrast Ratio**: Mindestens 4.5:1 für Body Text, 3:1 für große Texte
- **Focus States**: Sichtbare Focus-Ringe auf allen interaktiven Elementen
- **Keyboard Navigation**: Alle Funktionen per Tastatur erreichbar
- **Semantic HTML**: Korrekte Verwendung von HTML5-Semantik


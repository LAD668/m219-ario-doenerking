# Einstieg mit R - Ausbildung für Entwickler Digitales Business EFZ

Eine moderne Lernplattform für Auszubildende im Bereich "Entwickler Digitales Business EFZ (EDB)".

## Technologie-Stack

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Monaco Editor** - Code Editor (VS Code Editor im Browser)

## Projektstruktur

```
ariano/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── lerninhalte/       # Topic Pages
│   └── aufgaben/          # Challenge Pages
├── components/            # Wiederverwendbare Komponenten
│   ├── ui/                # UI Komponenten
│   └── layout/            # Layout Komponenten
├── lib/                   # Utilities und Daten
└── public/                # Statische Assets
```

## Entwicklung

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build
npm start
```

Die Anwendung läuft dann auf [http://localhost:3000](http://localhost:3000)


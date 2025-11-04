# Dykon - Duvet Finder Application

En moderne webapplikation bygget med React, TypeScript, Vite og SCSS til at hjælpe brugere med at finde den perfekte dyne.

## Kom i gang

### Installation

```bash
npm install
```

### Kør udviklerserver

```bash
npm run dev
```

### Build til produktion

```bash
npm run build
```

## Projekt struktur

Dette projekt følger **Atomic Design** principper:

```
src/
├── components/
│   ├── atoms/          # Basale UI-elementer (buttons, icons, inputs)
│   ├── molecules/      # Simple kombinationer af atoms
│   ├── organisms/      # Komplekse komponenter som Navigation
│   ├── templates/      # Layout strukturer
│   └── pages/          # Komplette sider
├── styles/
│   ├── abstracts/      # Variables, mixins, functions
│   ├── base/          # Reset, typography
│   ├── components/    # Komponent-specifikke styles
│   ├── layout/        # Layout-specifikke styles
│   └── pages/         # Side-specifikke styles
├── types/             # TypeScript type definitions
└── data/              # JSON data filer
```

## Komponenter

### Navigation

Navigation-komponenten består af:

**Top bar:**
- Telefon og email kontakt information (venstre)
- Sprogvælger (højre)
- Baggrund: #EFECE9
- 8px padding top/bottom

**Main navigation:**
- Centreret logo (højde: 50px)
- Navigation links på begge sider af logo
- Max bredde: 920px
- Baggrund: #FFFFFF
- Border: 1px solid #DAE0E7
- 18px padding top/bottom

```tsx
import { Navigation } from './components/organisms/Navigation'

function App() {
  return <Navigation />
}
```

## Farver

Projektet bruger følgende primære farver:

- Primary: `#880338` (ikoner, hover states)
- Top bar background: `#EFECE9`
- Top bar text: `#333D43`
- Navigation links: `#495B66`
- Navigation background: `#FFFFFF`
- Navigation border: `#DAE0E7`

## Typografi

Projektet bruger **EB Garamond** som primær font.

## Data flow

1. Duvet data indlæses fra JSON fil i `/data`
2. Rå data mappes til interne modeller
3. Bruger besvarer spørgsmål gennem guided flow (3-5 steps)
4. Svar gemmes i centraliseret state (context eller parent page)
5. Match score beregnes baseret på præferencer
6. Filtrerede og sorterede resultater vises
7. Bruger kan sammenligne op til 2 dyner side-by-side

## Teknologier

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool og dev server
- **SCSS** - Styling med variables og mixins
- **Lucide React** - Icon library

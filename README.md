# Dykon - Duvet Finder Application

En interaktiv web-app til at hjælpe brugere med at finde den perfekte dyne baseret på deres præferencer og behov.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **SCSS** - Styling med modulær arkitektur
- **Lucide React** - Icons

## Features

- 🎯 **Guidet flow** - 5-trins vejledning til at finde den perfekte dyne
- 🌡️ **Vejrintegration** - Automatisk sæsonanbefaling baseret på lokal vejrdata
- 🎨 **Visuel udvælgelse** - Billedbaserede stemningsvalg med ambient lyd
- 🔊 **Audio feedback** - Lydeffekter og stemningslyde for bedre brugeroplevelse
- 📊 **Matchningsalgoritme** - Beregner match score baseret på brugerpræferencer
- 🔄 **Sammenligning** - Side-by-side sammenligning af to dyner
- ♿ **Tilgængelig** - Tastaturnavigation og ARIA-labels

## Installation

```bash
npm install
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

Projektet følger **Atomic Design** principper:

```
src/
├── components/
│   ├── atoms/          # Små genanvendelige komponenter (Button, ImageCard)
│   ├── molecules/      # Sammensatte komponenter (ProgressBar, RangeSlider)
│   └── organisms/      # Komplekse komponenter (Navigation, Results, StepContainer)
├── contexts/           # React contexts (Audio, Weather)
├── data/              # JSON datakilde (duvets.json)
├── styles/            # SCSS moduler og partials
├── types/             # TypeScript interfaces
└── utils/             # Helper funktioner (duvetMatcher)
```

### Atomic Design Levels

- **Atoms**: Buttons, icons, inputs, text elements
- **Molecules**: Duvet card, question card, progress bar
- **Organisms**: Step view, results list, comparison module

## Data Flow

1. **User Input** → Brugeren besvarer 5 trin med spørgsmål
2. **State Management** → Svar gemmes i centraliseret state via contexts
3. **Matching Algorithm** → `duvetMatcher.ts` beregner match score for hver dyne
4. **Results** → Filtrerede og sorterede dyner vises med forklaringer
5. **Comparison** → Brugeren kan sammenligne op til 2 dyner side-by-side

## Step Flow

1. **Stemning** - Billedvalg af ideelt soveværelse
2. **Temperatur** - Præference for søvntemperatur
3. **Vægt og fylde** - Let vs. tung dyne
4. **Sæson** - Sommer, helår eller vinter (med vejranbefaling)
5. **Budget** - Prisniveau og prioritering af funktioner

## Key Files

- `src/App.tsx` - Main app structure og step definitions
- `src/data/duvets.json` - Duvet database med alle produkter
- `src/utils/duvetMatcher.ts` - Matching algorithm
- `src/types/duvet.ts` - TypeScript interfaces for duvet data
- `src/contexts/` - Audio og weather contexts

## Styling

SCSS er organiseret i:

- `abstracts/` - Variables, mixins, functions
- `base/` - Reset, typography
- `components/` - Component-specific styles
- `layout/` - Layout structures
- `pages/` - Page-specific styles

Mobile-first design med BEM naming convention.

## Browser Support

Modern browsers med ES6+ support.

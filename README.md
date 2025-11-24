# Dykon - Duvet Finder Application

En interaktiv web-app til at hjælpe brugere med at finde den perfekte dyne baseret på deres præferencer og behov.

https://github.com/user-attachments/assets/aa3abc5d-f697-4234-8e67-b4d7941f11c3

## Tech stack

- **React 19** - UI framework til at bygge brugergrænsefladen
- **TypeScript** - Tilføjer type safety til JavaScript
- **Vite** - Hurtig development server og build tool
- **SCSS** - Avanceret CSS med modulær arkitektur
- **Lucide React** - Icon bibliotek

## Accessibility considerations

Applikationen er designet med tilgængelighed i fokus:

- ✅ **Tastaturnavigation** - Alle interaktive elementer kan navigeres med tastatur (Tab, Enter, Space)
- ✅ **ARIA labels** - Skærmlæservenlige labels på ikoner og knapper
- ✅ **Focus states** - Synlige fokusringe viser hvor du er med tastaturet
- ✅ **Semantisk HTML** - Korrekt brug af HTML-elementer for bedre tilgængelighed
- ✅ **Beskrivende labels** - Hjælpetekst og tydelige instruktioner gennem hele flowet

## Installation and setup

### Forudsætninger

Du skal have følgende installeret på din computer:

1. **Node.js** (version 18 eller nyere)
   - Download fra [nodejs.org](https://nodejs.org/)
   - Vælg LTS (Long Term Support) versionen
   - Følg installationsvejledningen for dit operativsystem

2. **Code editor (IDE)** (valgfrit, men anbefalet)
   - [Visual Studio Code](https://code.visualstudio.com/) (anbefalet)
   - Eller en anden editor du foretrækker

### Trin-for-trin installation

1. **Download projektet**
   - Hent projektet fra [Github](https://github.com/AndreasKTZ/dykon) og udpak zip-filen

2. **Åbn en terminal/kommandolinje**
   
   **Anbefalet: Brug Visual Studio Code's indbyggede terminal**
   - Åbn projektmappen i VS Code (File → Open Folder)
   - Gå til Terminal → New Terminal
   - Terminalen åbner automatisk i projektmappen
   
   **Alternativ: Brug systemets terminal**
   - **Windows**: Tryk Windows-tast + R, skriv `cmd`, tryk Enter
   - **Mac**: Åbn Terminal fra Applications → Utilities
   - **Linux**: Tryk Ctrl + Alt + T

3. **Naviger til projektmappen**
   
   **Hvis du bruger VS Code's terminal**: Spring dette trin over - du er allerede i projektmappen! ✓
   
   **Hvis du bruger systemets terminal**:
   ```bash
   cd sti/til/dykon
   ```
   (Erstat `sti/til/dykon` med den faktiske sti til mappen)

4. **Installer afhængigheder**
   ```bash
   npm install
   ```
   Dette kan tage et par minutter første gang. Node.js downloader alle nødvendige pakker.

5. **Start udviklingsserveren**
   ```bash
   npm run dev
   ```

6. **Åbn applikationen**
   - Din browser åbner automatisk, eller
   - Åbn din browser og gå til `http://localhost:5173`
   - Applikationen kører nu lokalt på din computer! 🎉

### Andre kommandoer

```bash
# Byg til produktion
npm run build

# Se hvordan produktionsbygningen ser ud
npm run preview

# Tjek koden for fejl
npm run lint
```

## Folder structure

Projektet følger **Atomic Design** principper for at holde koden organiseret og genanvendelig:

```
dykon/
├── public/                 # Statiske filer (billeder, lyde, ikoner)
│   ├── duvets/            # Produktbilleder af dyner
│   ├── rooms/             # Stemningsbilleder til trin 1
│   └── sounds/            # Lydeffekter og ambient lyde
├── src/
│   ├── components/
│   │   ├── atoms/         # Små byggeklodser (Button, ImageCard, OptionCard)
│   │   ├── molecules/     # Sammensatte komponenter (ProgressBar, RangeSlider, OptionBoxes)
│   │   └── organisms/     # Komplekse sektioner (Navigation, Results, StepContainer)
│   ├── contexts/          # Global state management
│   │   ├── AudioContext.tsx      # Håndterer lydeffekter
│   │   └── WeatherContext.tsx    # Henter og håndterer vejrdata
│   ├── data/
│   │   └── duvets.json    # Database med alle dyner og deres egenskaber
│   ├── styles/            # SCSS styling opdelt i moduler
│   │   ├── abstracts/     # Variables, mixins, functions
│   │   ├── base/          # Reset og typografi
│   │   ├── components/    # Component-specifikke styles
│   │   ├── layout/        # Layout strukturer
│   │   └── pages/         # Side-specifikke styles
│   ├── types/             # TypeScript type definitions
│   │   ├── duvet.ts       # Duvet data struktur
│   │   └── weather.ts     # Weather data struktur
│   ├── utils/
│   │   └── duvetMatcher.ts    # Matchningsalgoritme til at finde den bedste dyne
│   ├── App.tsx            # Hovedkomponent med step definitions
│   └── main.tsx           # Entry point for applikationen
├── package.json           # Projekt metadata og dependencies
└── vite.config.ts         # Vite konfiguration
```

### Atomic Design levels

- **Atoms**: Mindste byggeklodser (knapper, inputs, kort)
- **Molecules**: Kombinationer af atoms (progress bar, slider, option boxes)
- **Organisms**: Komplette sektioner (navigation, results list, step container)

## How to use the app

### User flow

Applikationen guider brugeren gennem 5 trin for at finde den perfekte dyne:

1. **Introduktion**
   - Velkomstskærm der forklarer hvordan vejlederen virker
   - Bruger klikker "Start" for at begynde

2. **Trin 1: Stemning**
   - Visuel udvælgelse med 4 stemningsbilleder
   - Bruger vælger det rum de helst vil sove i
   - Ambient lyd starter når et billede vælges

3. **Trin 2: Temperatur**
   - 3 valgmuligheder: Frisk/køligt, Tempereret, Lunt/varmt
   - Hjælper algoritmen med at matche varmeniveau

4. **Trin 3: Vægt og fylde**
   - Slider fra "Let og luftig" til "Fyldig og omsluttende"
   - Bruger angiver præference på en skala

5. **Trin 4: Sæson**
   - Vælg mellem Sommer, Hele året, eller Vinter
   - Vejrintegration viser automatisk anbefaling baseret på lokalt vejr

6. **Trin 5: Budget og prioriteter**
   - Budget slider fra budget til luksus
   - Point fordeling (10 point) på: Komfort, Temperatur, Vedligehold, Materialer, Pris, Kvalitet

7. **Resultater**
   - Viser matchede dyner sorteret efter score
   - Hver dyne viser match percentage og forklaring
   - Bruger kan sammenligne op til 2 dyner side-by-side

### Navigation

- **Fremad/Tilbage knapper** - Naviger mellem trin
- **Progress bar** - Viser hvor langt du er kommet
- **Tastatur shortcuts**:
  - Tab: Naviger mellem elementer
  - Enter/Space: Vælg option eller klik knap
  - Piltoste: Juster slider værdier

### Data flow

1. **User Input** → Brugeren besvarer spørgsmål gennem 5 trin
2. **State Management** → Svar gemmes i centraliseret state via StepContainer
3. **Matching Algorithm** → `duvetMatcher.ts` beregner match score for hver dyne baseret på:
   - Stemning (mood)
   - Temperatur præference
   - Vægt præference
   - Sæson
   - Budget
   - Prioriteter
4. **Results** → Filtrerede og sorterede dyner vises med forklaringer
5. **Comparison** → Bruger kan vælge 2 dyner til direkte sammenligning

## Custom hooks explained

### `useAudio()`

Håndterer alle lydeffekter i applikationen.

**Placering**: `src/contexts/AudioContext.tsx`

**Funktioner**:
- `playClick(type)` - Afspil klik-lyd (type: 'button', 'option', 'slider')
- `playAmbience(roomId)` - Start ambient baggrundslyd for valgt stemning
- `stopAmbience()` - Stop ambient lyd med fade-out effekt
- `toggleAudio()` - Slå lyd til/fra
- `isEnabled` - Boolean der viser om lyd er aktiveret

**Brug**:
```typescript
import { useAudio } from './contexts/AudioContext';

function MyComponent() {
  const { playClick, isEnabled } = useAudio();
  
  const handleClick = () => {
    playClick('button');
    // Din logik her
  };
  
  return <button onClick={handleClick}>Klik mig</button>;
}
```

**Features**:
- Lydvolumen er præ-indstillet for behagelig oplevelse
- Fade-in/fade-out på ambient lyde
- Automatisk cleanup når komponenten unmounter

### `useWeather()`

Henter lokalt vejr og foreslår passende sæson.

**Placering**: `src/contexts/WeatherContext.tsx`

**Funktioner**:
- `weather.temp` - Aktuel temperatur i Celsius
- `weather.location` - By/område navn
- `weather.suggestedSeason` - Anbefalet sæson baseret på temperatur
  - < 15°C → "winter"
  - 15-22°C → "all-year"
  - \> 22°C → "summer"

**Brug**:
```typescript
import { useWeather } from './contexts/WeatherContext';

function SeasonStep() {
  const { weather } = useWeather();
  
  if (weather) {
    return (
      <p>
        Det er {weather.temp}°C i {weather.location}.
        Vi anbefaler en {weather.suggestedSeason} dyne.
      </p>
    );
  }
  
  return null;
}
```

**Data kilder**:
- **ipapi.co** - IP-baseret geolocation (henter by og koordinater)
- **Open-Meteo API** - Vejrdata baseret på koordinater
- Ingen fallback hvis API'erne fejler (anbefaling vises ikke)

## Known issues / Limitations

### Aktuelle begrænsninger

1. **Vejr API**
   - Bruger IP-baseret geolocation (kræver ikke brugertilladelse)
   - Hvis API'erne fejler, vises ingen vejranbefaling
   - Afhænger af eksterne services (ipapi.co og Open-Meteo API)

2. **Browser support**
   - Kræver moderne browser med ES6+ support
   - Audio playback kan kræve brugerinteraktion (browser policy)

3. **Data**
   - Duvet database er statisk (JSON fil)
   - Ingen backend integration endnu
   - Priser og lagerstatus opdateres ikke dynamisk

4. **Sammenligning**
   - Kun 2 dyner kan sammenlignes ad gangen
   - Sammenligning kræver at man er på resultat-siden

5. **Sprog**
   - Kun dansk sprog understøttet
   - Ingen internationalisering (i18n) endnu

## Future improvements

### Mulige forbedringer i fremtiden

1. **Backend integration**
   - Dynamisk dynelager og priser
   - Bruger konti og gemte præferencer
   - Order/købs funktionalitet

2. **Flere features**
   - Gem/del dine resultater via link
   - Print funktion til resultatoversigt
   - Filtrer resultater efter pris, mærke, etc.
   - Sammenlign mere end 2 dyner samtidig

3. **Internationalisering**
   - Engelsk sprog
   - Andre nordiske sprog
   - Valutaomregning

4. **Performance**
   - Lazy loading af billeder
   - Service worker for offline support
   - Optimeret bundle størrelse

5. **Analytics**
   - Sporing af populære valg
   - Conversion tracking
   - User journey insights

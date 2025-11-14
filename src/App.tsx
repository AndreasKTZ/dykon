import { Navigation } from './components/organisms/Navigation'
import { Footer } from './components/organisms/Footer'
import { StepContainer } from './components/organisms/StepContainer'
import { ImageSelection } from './components/molecules/ImageSelection'
import { OptionBoxes } from './components/molecules/OptionBoxes'
import { RangeSlider } from './components/molecules/RangeSlider'
import { PointsArranger } from './components/molecules/PointsArranger'
import { AudioProvider } from './contexts/AudioContext'
import { Snowflake, CloudRain, Sun, Feather, DollarSign, Award } from 'lucide-react'
import './styles/main.scss'

function App() {
  const steps = [
    {
      id: 'stemning',
      title: 'Stemning',
      content: (
        <ImageSelection
          title="Hvilket rum ville du helst sove i?"
          subtitle="Forestil dig dit ideelle soveværelse – hvordan føles det, når du går i seng?"
          stepId="stemning"
          options={[
            { id: 'cool', image: '/rooms/breeze.webp', label: 'Kølig brise', icon: <Snowflake size={16} /> },
            { id: 'natural', image: '/rooms/balance.webp', label: 'Naturlig balance', icon: <Feather size={16} /> },
            { id: 'soft', image: '/rooms/soft-comfort.webp', label: 'Blød komfort', icon: <CloudRain size={16} /> },
            { id: 'cozy', image: '/rooms/cozy-warmth.webp', label: 'Hyggelig varme', icon: <Sun size={16} /> }
          ]}
        />
      )
    },
    {
      id: 'temperatur',
      title: 'Temperatur',
      content: (
        <OptionBoxes
          title="Hvordan har du det bedst, når du skal sove?"
          subtitle="Nogle kan bedst lide frisk luft, andre foretrækker at have det lunt og trygt."
          stepId="temperatur"
          options={[
            { id: 'cool', icon: <Snowflake />, title: 'Frisk og køligt', description: 'Foretrækker en køligere søvn' },
            { id: 'moderate', icon: <CloudRain />, title: 'Behageligt tempereret', description: 'Neutral og afbalanceret' },
            { id: 'warm', icon: <Sun />, title: 'Lunt og varmt', description: 'Foretrækker god varme' }
          ]}
        />
      )
    },
    {
      id: 'vægt-fylde',
      title: 'Vægt og fylde',
      content: (
        <RangeSlider
          title="Foretrækker du en let eller tung dyne?"
          subtitle="Nogle elsker følelsen af en tung dyne, mens andre foretrækker en let og luftig følelse."
          leftLabel="Let og luftig"
          rightLabel="Fyldig og omsluttende"
          stepId="vægt-fylde"
        />
      )
    },
    {
      id: 'sæson',
      title: 'Sæson',
      content: (
        <OptionBoxes
          title="Hvilken sæson leder du efter dyne til?"
          subtitle="Lad os finde den perfekte dyne til årstiden."
          stepId="sæson"
          options={[
            { id: 'summer', icon: <Sun />, title: 'Sommer', description: 'Til varme nætter' },
            { id: 'all-year', icon: <CloudRain />, title: 'Hele året', description: 'Komfort året rundt' },
            { id: 'winter', icon: <Snowflake />, title: 'Vinter', description: 'Varme til kolde nætter' }
          ]}
        />
      )
    },
    {
      id: 'budget',
      title: 'Budget og afslutning',
      content: (
        <div className="step-content__wrapper">
          <div className="step-content__item">
            <RangeSlider
              title="Økonomi og budgetniveau"
              subtitle="Hvor ligger du prismæssigt, når du køber en dyne?"
              leftLabel="BUDGET ($)"
              rightLabel="LUKSUS ($$$)"
              stepId="budget-price"
            />
          </div>
          <div className="step-content__item">
            <PointsArranger
              title="Hvad betyder mest for dig?"
              subtitle="Fordel dine 10 point på det, der betyder mest for dig."
              totalPoints={10}
              stepId="budget-priorities"
              options={[
                { id: 'comfort', icon: <Feather />, label: 'Komfort' },
                { id: 'temperature', icon: <Sun />, label: 'Temperatur' },
                { id: 'maintenance', icon: <CloudRain />, label: 'Vedligehold' },
                { id: 'materials', icon: <Feather />, label: 'Materialer' },
                { id: 'price', icon: <DollarSign />, label: 'Pris' },
                { id: 'quality', icon: <Award />, label: 'Kvalitet' }
              ]}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <AudioProvider>
      <div>
        <Navigation />
        <main>
          <StepContainer steps={steps} />
        </main>
        <Footer />
      </div>
    </AudioProvider>
  )
}

export default App

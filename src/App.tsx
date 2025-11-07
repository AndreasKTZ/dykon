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
            { id: 'cool', image: '/rooms/breeze.png', label: 'Kølig brise', icon: <Snowflake size={16} /> },
            { id: 'natural', image: '/rooms/balance.png', label: 'Naturlig balance', icon: <Feather size={16} /> },
            { id: 'soft', image: '/rooms/soft-comfort.png', label: 'Blød komfort', icon: <CloudRain size={16} /> },
            { id: 'cozy', image: '/rooms/cozy-warmth.png', label: 'Hyggelig varme', icon: <Sun size={16} /> }
          ]}
        />
      )
    },
    {
      id: 'temperatur',
      title: 'Temperatur',
      content: (
        <OptionBoxes
          title="Hvordan føles dit soveværelse om natten?"
          subtitle="Søvnkomfort handler også om temperaturen i dit soveværelse."
          stepId="temperatur"
          options={[
            { id: 'cold', icon: <Snowflake />, title: 'Har det koldt', description: 'Brug for ekstra varme' },
            { id: 'balanced', icon: <CloudRain />, title: 'Helt tilpas', description: 'Komfortabel fleste nætter' },
            { id: 'warm', icon: <Sun />, title: 'Har det varmt', description: 'Brug for kølig dyne' }
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
            />
          </div>
          <div className="step-content__item">
            <PointsArranger
              title="Hvad betyder mest for dig?"
              subtitle="Fordel dine 10 point på det, der betyder mest for dig."
              totalPoints={10}
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

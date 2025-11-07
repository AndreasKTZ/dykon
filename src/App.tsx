import { Navigation } from './components/organisms/Navigation'
import { Footer } from './components/organisms/Footer'
import { StepContainer } from './components/organisms/StepContainer'
import './styles/main.scss'

function App() {
  const steps = [
    {
      id: 'stemning',
      title: 'Stemning',
      content: <div>Step 1: Stemning content</div>
    },
    {
      id: 'temperatur',
      title: 'Temperatur',
      content: <div>Step 2: Temperatur content</div>
    },
    {
      id: 'vægt-fylde',
      title: 'Vægt og fylde',
      content: <div>Step 3: Vægt og fylde content</div>
    },
    {
      id: 'sæson',
      title: 'Sæson',
      content: <div>Step 4: Sæson content</div>
    },
    {
      id: 'budget',
      title: 'Budget og afslutning',
      content: <div>Step 5: Budget og afslutning content</div>
    }
  ];

  return (
    <div>
      <Navigation />
      <main>
        <StepContainer steps={steps} />
      </main>
      <Footer />
    </div>
  )
}

export default App

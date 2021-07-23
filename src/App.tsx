import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { GlobalStyle } from './styles/styles'

import { Home } from './pages/Home'
import { Characters } from './pages/Characters'
import { CharacterSingle } from './pages/CharacterSingle'
import { Planets } from './pages/Planets'
import { PlanetSingle } from './pages/PlanetSingle'
import { Starships } from './pages/Starships'
import { StarshipSingle } from './pages/StarshipSingle'
import { Vehicles } from './pages/Vehicles'
import { VehicleSingle } from './pages/VehicleSingle'
import { NotFound } from './pages/404'

import { Header } from './components/Header'

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/characters" component={Characters} />
          <Route path="/characters/:name" component={CharacterSingle} />
          <Route exact path="/planets" component={Planets} />
          <Route path="/planets/:name" component={PlanetSingle} />
          <Route exact path="/starships" component={Starships} />
          <Route path="/starships/:name" component={StarshipSingle} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route path="/vehicles/:name" component={VehicleSingle} />
          <Route exact path="/404" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

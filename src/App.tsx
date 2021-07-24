import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { GlobalStyle } from './styles/styles'

import { Home } from './pages/Home'
import { Characters } from './pages/Characters'
import { CharacterSingle } from './pages/Characters/CharacterSingle'
import { Planets } from './pages/Planets'
import { PlanetSingle } from './pages/Planets/PlanetSingle'
import { Starships } from './pages/Starships'
import { StarshipSingle } from './pages/Starships/StarshipSingle'
import { Vehicles } from './pages/Vehicles'
import { VehicleSingle } from './pages/Vehicles/VehicleSingle'
import { Films } from './pages/Films'
import { FilmSingle } from './pages/Films/FilmSingle'
import { Species } from './pages/Species'
import { SpecieSingle } from './pages/Species/SpecieSingle'
import { NotFound } from './pages/404'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

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
          <Route exact path="/films" component={Films} />
          <Route path="/films/:name" component={FilmSingle} />
          <Route exact path="/species" component={Species} />
          <Route path="/species/:name" component={SpecieSingle} />
          <Route exact path="/404" component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

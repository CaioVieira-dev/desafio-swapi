import { Logo, Navigation, NavigationItem, Container } from './styles'
import { Link } from 'react-router-dom'

import SWlogo from '../../assets/star-wars-logo.svg'
export function Header() {

    return (
        <Container>
            <Link to="/" ><Logo src={SWlogo} /></Link>
            <Navigation>
                <NavigationItem to='/characters'>pessoas</NavigationItem>
                <NavigationItem to='/'>planetas</NavigationItem>
                <NavigationItem to='/'>naves</NavigationItem>
                <NavigationItem to='/'>veículos</NavigationItem>
                <NavigationItem to='/'>filmes</NavigationItem>
                <NavigationItem to='/'>espécies</NavigationItem>
            </Navigation>
        </Container>
    )
}
import { Logo, Navigation, NavigationItem, Container } from './styles'

import SWlogo from '../../assets/star-wars-logo.svg'
export function Header() {

    return (
        <Container>
            <Logo src={SWlogo} />
            <Navigation>
                <NavigationItem to='/'>pessoas</NavigationItem>
                <NavigationItem to='/'>planetas</NavigationItem>
                <NavigationItem to='/'>naves</NavigationItem>
                <NavigationItem to='/'>veículos</NavigationItem>
                <NavigationItem to='/'>filmes</NavigationItem>
                <NavigationItem to='/'>espécies</NavigationItem>
            </Navigation>
        </Container>
    )
}
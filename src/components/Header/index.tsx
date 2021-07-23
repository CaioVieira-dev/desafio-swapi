import bars from '../../assets/bars.svg'
import { Logo, Navigation, NavigationItem, Container, MobileBarsButton } from './styles'
import { Link } from 'react-router-dom'

import SWlogo from '../../assets/star-wars-logo.svg'
import { useEffect, useState } from 'react';
export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const event = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('keydown', (e) => event(e))
        return () => document.removeEventListener('keydown', event)
    }, [])

    function toggle() {
        setIsOpen(!isOpen);
    }

    return (
        <Container>
            <Link to="/" ><Logo src={SWlogo} /></Link>
            <MobileBarsButton onClick={toggle} src={bars} />
            <Navigation onClick={toggle} className={isOpen ? "active" : ""}>
                <NavigationItem to='/characters'>pessoas</NavigationItem>
                <NavigationItem to='/planets'>planetas</NavigationItem>
                <NavigationItem to='/starships'>naves</NavigationItem>
                <NavigationItem to='/vehicles'>veículos</NavigationItem>
                <NavigationItem to='/films'>filmes</NavigationItem>
                <NavigationItem to='/'>espécies</NavigationItem>
            </Navigation>
        </Container>
    )
}
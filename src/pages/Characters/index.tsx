import { Container } from './styles'
import { Header } from '../../components/Header'

import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { People, Planets } from 'swapi-ts'

export function Characters() {
    const [characterList, setCharacterList] = useState<any>()

    useEffect(() => {
        async function apiCall() {
            const people = await People.find();

            const planets = await Planets.find();

            const cardInfo = people.resources.map(character => {
                const planetName = planets.resources.find(planet => planet.value.url === character.value.homeworld)
                return {
                    name: character.value.name,
                    planet: planetName?.value.name,
                    birth: character.value.birth_year,
                    id: character.value.url
                }
            })


            setCharacterList(cardInfo)

        }
        apiCall()
    }, [])

    return (
        <>
            <Header />
            <Container>
                {characterList ?
                    characterList.map((character: any) =>
                        <Card key={character.id}
                            birth={character.birth}
                            name={character.name}
                            planet={character.planet} />)
                    :
                    "carregando"}
            </Container>
        </>
    )
}
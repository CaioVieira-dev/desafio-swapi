import { Container } from './styles'


import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { People, Planets } from 'swapi-ts'


export function Characters() {
    const [characterList, setCharacterList] = useState<any>()

    useEffect(() => {
        async function apiCall() {
            //get all people
            const people = await People.find();
            //get all planets
            const planets = await Planets.find();
            //create card info
            const cardInfo = people.resources.map(character => {
                const planetName = planets.resources.find(planet => planet.value.url === character.value.homeworld)
                return {
                    name: character.value.name,
                    planet: planetName?.value.name,
                    birth: character.value.birth_year,
                    id: character.value.url
                }
            })
            //set characterList with cardInfo
            setCharacterList(cardInfo)

        }
        apiCall()
    }, [])

    return (
        <>
            <Container>
                {characterList ?
                    characterList.map((character: any) =>
                        <Card key={character.id}
                            birth={character.birth}
                            name={character.name}
                            planet={character.planet}
                            photo={character.id}
                            cardType="character"
                            clickable
                            redirectTo={`/characters/${character.name}`}
                        />)
                    :
                    "carregando"}
            </Container>
        </>
    )
}
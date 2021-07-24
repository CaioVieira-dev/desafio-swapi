import { useEffect, useState } from 'react'

import { Container } from './styles'
import { Card } from '../../components/Card'
import { Loading } from '../../components/Load'

import { Planets as SWPlanets } from 'swapi-ts'

type PlanetType = {
    name: string;
    population: string;
    terrain: string;
    id: string;
}

export function Planets() {
    const [planetList, setPlanetList] = useState<PlanetType[]>();

    useEffect(() => {
        async function apiCall() {
            //get all planets
            const planets = await SWPlanets.find();
            //get card info
            const cardInfo = planets.resources.map(planet => {
                return {
                    name: planet.value.name,
                    population: planet.value.population,
                    terrain: planet.value.terrain,
                    id: planet.value.url
                }
            })
            setPlanetList(cardInfo)

        }

        apiCall();
    }, [])

    return (
        <Container>
            {planetList ?
                planetList.map(planet =>
                    <Card
                        field1="Nome:"
                        info1={planet.name}
                        field2="População:"
                        info2={planet.population}
                        field3="Terreno:"
                        info3={planet.terrain}
                        photo={planet.id}
                        cardType="planet"
                        clickable
                        redirectTo={`/planets/${planet.name}`}
                    />) :

                <Loading />
            }

        </Container>
    )
}
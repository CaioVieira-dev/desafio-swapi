import { Container } from './styles'


import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Loading } from '../../components/Load'
import { Starships as SWStarships } from 'swapi-ts'

type StarshipType = {
    name: string;
    passengers: string;
    speed: string;
    id: string;
}

export function Starships() {
    const [starshipList, setStarshipList] = useState<StarshipType[]>();

    useEffect(() => {
        //nome passageiros e velocidade(mglt)
        async function apiCall() {
            //get all starships
            const starships = await SWStarships.find();
            const cardInfo = starships.resources.map(ship => {
                return {
                    name: ship.value.name,
                    passengers: ship.value.passengers,
                    speed: ship.value.MGLT,
                    id: ship.value.url
                }
            })

            setStarshipList(cardInfo)

        }

        apiCall();
    }, [])

    return (
        <Container>
            {starshipList ?
                starshipList.map(ship =>
                    <Card
                        key={ship.id}
                        field1="Nome:"
                        info1={ship.name}
                        field2="Passageiros:"
                        info2={ship.passengers}
                        field3="Velocidade:"
                        info3={`${ship.speed} MGLT`}
                        photo={ship.id}
                        cardType="starship"
                    />) :
                <Loading />}

        </Container>
    )
}
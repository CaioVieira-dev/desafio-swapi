import { useEffect, useState } from 'react'

import { Container, Button, ButtonContainer } from './styles'
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
    const [forceUpdate, setForceUpdate] = useState(false);
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
    function sortAZ() {
        let list = starshipList;
        list?.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        })

        setStarshipList(list)
        setForceUpdate(!forceUpdate)

    }
    function sortZA() {
        let list = starshipList;
        list?.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase();
            if (nameA > nameB) //sort string descending
                return -1;
            if (nameA < nameB)
                return 1;
            return 0; //default return value (no sorting)
        })
        setStarshipList(list)
        setForceUpdate(!forceUpdate)
    }

    return (
        <>
            {starshipList &&
                <ButtonContainer>
                    <Button onClick={sortAZ}>Ordenar A-Z</Button>
                    <Button onClick={sortZA}>Ordenar Z-A</Button>
                </ButtonContainer>
            }
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
                            clickable
                            redirectTo={`/starships/${ship.name}`}
                        />) :
                    <Loading />}

            </Container>
        </>
    )
}
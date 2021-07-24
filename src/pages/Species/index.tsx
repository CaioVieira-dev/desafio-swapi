import { useEffect, useState } from 'react'

import { Container, Button, ButtonContainer } from './styles'
import { Card } from '../../components/Card'
import { Loading } from '../../components/Load'

import { Species as SWSpecies, Planets } from 'swapi-ts'

type SpecieType = {
    name: string;
    homeworld: string;
    classification: string;
    id: string;
}

export function Species() {
    const [specieList, setSpecieList] = useState<SpecieType[]>()
    const [forceUpdate, setForceUpdate] = useState(false);
    useEffect(() => {
        async function apiCall() {
            //get all species
            const species = await SWSpecies.find();
            //get all planets
            const planets = await Planets.find();

            const cardInfo = species.resources.map(specie => {
                const planetName = planets.resources.find(planet => planet.value.url === specie.value.homeworld)
                return {
                    name: specie.value.name,
                    homeworld: planetName?.value.name || "desconhecido",
                    classification: specie.value.classification,
                    id: specie.value.url
                }
            })
            //set species with card info
            setSpecieList(cardInfo)
        }

        apiCall();
    }, [])
    function sortAZ() {
        let list = specieList;
        list?.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        })

        setSpecieList(list)
        setForceUpdate(!forceUpdate)

    }
    function sortZA() {
        let list = specieList;
        list?.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase();
            if (nameA > nameB) //sort string descending
                return -1;
            if (nameA < nameB)
                return 1;
            return 0; //default return value (no sorting)
        })
        setSpecieList(list)
        setForceUpdate(!forceUpdate)
    }

    return (
        <>
            {specieList &&
                <ButtonContainer>
                    <Button onClick={sortAZ}>Ordenar A-Z</Button>
                    <Button onClick={sortZA}>Ordenar Z-A</Button>
                </ButtonContainer>
            }
            <Container>
                {specieList ?
                    specieList.map(specie =>
                        <Card
                            key={specie.id}
                            field1="Nome:"
                            info1={specie.name}
                            field2="Planeta natal:"
                            info2={specie.homeworld}
                            field3="Classificação:"
                            info3={specie.classification}
                            photo={specie.id}
                            cardType="specie"
                            clickable
                            redirectTo={`/species/${specie.name}`}
                        />) : <Loading />}
            </Container>
        </>
    )
}
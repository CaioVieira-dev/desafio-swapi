import { Container } from './styles'


import { useEffect, useState } from 'react'
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

    return (
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
    )
}
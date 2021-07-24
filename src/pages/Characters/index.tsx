import { useEffect, useState } from 'react'

import { Container, Button, ButtonContainer } from './styles'
import { Card } from '../../components/Card'
import { Loading } from '../../components/Load'

import { People, Planets } from 'swapi-ts'

type CharacterType = {
    name: string;
    planet: string;
    birth: string;
    id: string;
}

export function Characters() {
    const [characterList, setCharacterList] = useState<CharacterType[]>()
    const [forceUpdate, setForceUpdate] = useState(false);

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
                    planet: planetName?.value.name || "none",
                    birth: character.value.birth_year,
                    id: character.value.url
                }
            })
            //set characterList with cardInfo
            setCharacterList(cardInfo)

        }
        apiCall()
    }, [])
    function sortAZ() {
        let list = characterList;
        list?.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        })

        setCharacterList(list)
        setForceUpdate(!forceUpdate)

    }
    function sortZA() {
        let list = characterList;
        list?.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase();
            if (nameA > nameB) //sort string descending
                return -1;
            if (nameA < nameB)
                return 1;
            return 0; //default return value (no sorting)
        })
        setCharacterList(list)
        setForceUpdate(!forceUpdate)
    }

    return (
        <>
            {characterList &&
                <ButtonContainer>
                    <Button onClick={sortAZ}>Ordenar A-Z</Button>
                    <Button onClick={sortZA}>Ordenar Z-A</Button>
                </ButtonContainer>
            }
            <Container>
                {characterList ?
                    characterList.map((character) =>
                        <Card key={character.id}
                            field1="Nome:"
                            info1={character.name}
                            field2="Planeta:"
                            info2={character.planet}
                            field3="Nascimento:"
                            info3={character.birth}
                            photo={character.id}
                            cardType="character"
                            clickable
                            redirectTo={`/characters/${character.name}`}
                        />)
                    :
                    <Loading />}
            </Container>
        </>
    )
}
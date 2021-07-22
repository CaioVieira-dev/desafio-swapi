import { Container, Field, Info, Line } from './styles'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { People, Species, Starships, Films, Vehicles, Planets } from 'swapi-ts'

export function CharacterSingle() {
    const params = useParams<{ name: string }>();

    const [characterData, setCharacterData] = useState<any>()

    useEffect(() => {
        async function apiCall() {
            let char = {} as any;
            const character = await (await People.findBySearch([params.name])).resources.map(entry => entry.value);
            console.log(character)
            if (character.length !== 1) {
                //erro de busca, numero de personagens invalido
                console.error("Invalid search parameter")
                return;
            }
            char.name = character[0].name;
            char.height = character[0].height;
            char.birth = character[0].birth_year;
            char.gender = character[0].gender === 'male' ? "masculino" : character[0].gender === 'female' ? 'feminino' : character[0].gender;
            char.mass = character[0].mass;


            if (character[0].species.length >= 1) {
                const species = await (await Species.find(specie => specie.url === character[0].species[0])).resources.map(entry => {
                    if (entry.value.url === character[0].species[0]) {
                        return entry.value.name
                    }
                });
                console.log(species)
                char.species = species
            } else {
                char.species = "desconhecido"
            }
            if (character[0].starships.length >= 1) {
                const ships = await (await Starships.find(ship => {
                    for (let i = 0; i < character[0].starships.length; i++) {
                        if (ship.url === character[0].starships[i]) {
                            return true;
                        }
                    }
                    return false;

                })).resources.map(entry => entry.value.name)
                console.log(ships)
                char.starships = ships.join(', ')
            } else {
                char.starships = "não possui"
            }
            if (character[0].films.length >= 1) {
                const films = await (await Films.find(film => {
                    for (let i = 0; i < character[0].films.length; i++) {
                        if (film.url === character[0].films[i]) {
                            return true;
                        }
                    }
                    return false;
                })).resources.map(entry => entry.value.title)
                console.log(films)
                char.films = films.join(', ')
            } else {
                char.films = "sem participações"
            }
            if (character[0].vehicles.length >= 1) {
                const vehicles = await (await Vehicles.find(vehicle => {
                    for (let i = 0; i < character[0].vehicles.length; i++) {
                        if (vehicle.url === character[0].vehicles[i]) {
                            return true;
                        }
                    }
                    return false;
                })).resources.map(entry => entry.value.name)
                console.log(vehicles)
                char.vehicles = vehicles.join(', ')
            } else {
                char.vehicles = "não possui"
            }
            if (character[0].homeworld) {
                const homeworld = await (await Planets.find(world => world.url === character[0].homeworld)).resources.map(entry => entry.value.name)
                console.log(homeworld)
                char.homeworld = homeworld
            } else {
                char.homeworld = 'desconhecido'
            }

            setCharacterData(char)
        }
        apiCall()
    }, [params.name])
    console.log(characterData)
    return (
        <Container>
            {characterData && <>
                <Line>
                    <Field>Nome:</Field>
                    <Info> {characterData.name}</Info>
                </Line>
                <Line>
                    <Field>Genero:</Field>
                    <Info> {characterData.gender}</Info>
                </Line>
                <Line>
                    <Field>Ano de nascimento:</Field>
                    <Info> {characterData.birth}</Info>
                </Line>
                <Line>
                    <Field>Altura:</Field>
                    <Info> {characterData.height}cm</Info>
                </Line>
                <Line>
                    <Field>Peso:</Field>
                    <Info> {characterData.mass}Kg</Info>
                </Line>
                <Line>
                    <Field>Planeta natal:</Field>
                    <Info> {characterData.homeworld}</Info>
                </Line>
                <Line>
                    <Field>Espécie:</Field>
                    <Info> {characterData.species}</Info>
                </Line>
                <Line>
                    <Field>Naves espaciais:</Field>
                    <Info> {characterData.starships}</Info>
                </Line>
                <Line>
                    <Field>Filmes:</Field>
                    <Info> {characterData.films}</Info>
                </Line>
                <Line>
                    <Field>Veículos:</Field>
                    <Info> {characterData.vehicles}</Info>
                </Line>

            </>}

        </Container>
    )
}
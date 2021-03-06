import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { Container, Field, Info, Line, Photo, Text } from './styles'

import error from '../../../assets/erro.jpg'

import {
    People,
    Species,
    Starships,
    Films,
    Vehicles,
    Planets, ISpecie, IStarship, IFilm, IVehicle, IPlanet
} from 'swapi-ts'
import { Loading } from '../../../components/Load';

type CharacterDataType = {
    name: string;
    height: string;
    films: string;
    homeworld: string;
    mass: string;
    species: string;
    starships: string;
    vehicles: string;
    gender: string;
    birth: string;
}

export function CharacterSingle() {
    const params = useParams<{ name: string }>();
    const history = useHistory()

    const [characterData, setCharacterData] = useState<CharacterDataType>()
    const [photo, setPhoto] = useState()


    useEffect(() => {
        async function apiCall() {
            let char = {} as CharacterDataType;
            const character = await findCharacter(params.name);

            if (character.length !== 1) {
                //search failed, search should get only one character
                console.error("Invalid search parameter: search should get only one character")
                history.push('/404');
                return;
            }
            char.name = character[0].name;
            char.height = character[0].height;
            char.birth = character[0].birth_year;
            char.gender = character[0].gender === 'male' ? "masculino" : character[0].gender === 'female' ? 'feminino' : character[0].gender;
            char.mass = character[0].mass;

            //if species array is not empty
            if (character[0].species.length >= 1) {
                const species = await findSpecieName(character[0].species[0])
                if (species) {
                    char.species = species.value.name
                } else {
                    char.species = "indefinido"
                }
            } else {
                char.species = "desconhecido"
            }
            //if starships array is not empty
            if (character[0].starships.length >= 1) {
                const ships = await findStarshipsNames(character[0].starships)
                char.starships = ships.join(', ')
            } else {
                char.starships = "n??o possui"
            }
            //if films array is not empty
            if (character[0].films.length >= 1) {
                const films = await findFilmsNames(character[0].films)
                char.films = films.join(', ')
            } else {
                char.films = "sem participa????es"
            }
            //if vehicles array is not empty
            if (character[0].vehicles.length >= 1) {
                const vehicles = await findVehiclesNames(character[0].vehicles)
                char.vehicles = vehicles.join(', ')
            } else {
                char.vehicles = "n??o possui"
            }
            //if homeworld array is not empty
            if (character[0].homeworld) {
                const homeworld = await findHomeworldName(character[0].homeworld)

                char.homeworld = homeworld.join(', ')
            } else {
                char.homeworld = 'desconhecido'
            }

            setCharacterData(char)
            //dynamic import photo
            const charId = character[0].url.replace(/\/$/g, "");
            const photoId = charId.substring(charId.lastIndexOf('/') + 1);
            import(`../../../assets/characters/${photoId}.jpg`)
                .catch(() => {
                }).then((res) => {
                    //set photo
                    setPhoto(res.default)
                })
        }
        apiCall()
    }, [params.name, history])

    async function findCharacter(name: string) {
        return (await People.findBySearch([name])).resources.map(entry => entry.value)
    }
    async function findSpecieName(specieUrl: string | ISpecie) {
        return (await Species.find(specie => specie.url === specieUrl)).resources.find(entry => entry.value.url === specieUrl);
    }
    async function findStarshipsNames(starshipsUrlArray: string[] | IStarship[]) {
        return (await Starships.find(ship => {
            for (let i = 0; i < starshipsUrlArray.length; i++) {
                if (ship.url === starshipsUrlArray[i]) {
                    return true;
                }
            }
            return false;

        })).resources.map(entry => entry.value.name)
    }
    async function findFilmsNames(filmsUrlArray: string[] | IFilm[]) {
        return (await Films.find(film => {
            for (let i = 0; i < filmsUrlArray.length; i++) {
                if (film.url === filmsUrlArray[i]) {
                    return true;
                }
            }
            return false;
        })).resources.map(entry => entry.value.title)
    }
    async function findVehiclesNames(vehiclesUrlArray: string[] | IVehicle[]) {
        return (await Vehicles.find(vehicle => {
            for (let i = 0; i < vehiclesUrlArray.length; i++) {
                if (vehicle.url === vehiclesUrlArray[i]) {
                    return true;
                }
            }
            return false;
        })).resources.map(entry => entry.value.name)
    }
    async function findHomeworldName(planetUrl: string | IPlanet) {
        return (await Planets.find(world => world.url === planetUrl)).resources.map(entry => entry.value.name)
    }

    return (
        <Container>
            {characterData ? <>
                <Photo src={photo || error} />
                <Text>
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
                        <Field>Esp??cie:</Field>
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
                        <Field>Ve??culos:</Field>
                        <Info> {characterData.vehicles}</Info>
                    </Line>
                </Text>

            </> : <Loading />}

        </Container>
    )
}
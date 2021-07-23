import error from '../../assets/erro.jpg'
import { Container, Field, Info, Line, Photo, Text } from './styles'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Load';

import {
    People,
    Species,
    Starships,
    Films,
    Vehicles,
    Planets,
    ISpecie,
    IStarship,
    IVehicle,
    IPlanet,
    IPeople
} from 'swapi-ts'

type FilmDataType = {
    characters: string;
    director: string;
    episodeId: string;
    openingCrawl: string;
    planets: string;
    producer: string;
    releaseDate: string;
    species: string;
    starships: string;
    title: string;
    vehicles: string;
}

export function FilmSingle() {
    const params = useParams<{ name: string }>();
    const history = useHistory()

    const [filmData, setFilmData] = useState<FilmDataType>()
    const [photo, setPhoto] = useState()

    async function findFilm(title: string) {
        return (await Films.findBySearch([title])).resources.map(entry => entry.value)
    }
    function formatDate(date: string) {
        const yyyy = date.substr(0, 4);
        const mm = date.substr(5, 2);
        const dd = date.substr(8, 2);
        return `${dd}/${mm}/${yyyy}`
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
    async function findSpeciesNames(specieUrl: string[] | ISpecie[]) {
        return (await Species.find(specie => {
            for (let i = 0; i < specieUrl.length; i++) {
                if (specie.url === specieUrl[i]) {
                    return true;
                }
            }
            return false;
        })).resources.map(entry => entry.value.name);
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
    async function findPlanetsNames(planetUrl: string[] | IPlanet[]) {
        return (await Planets.find(planet => {
            for (let i = 0; i < planetUrl.length; i++) {
                if (planet.url === planetUrl[i]) {
                    return true;
                }
            }
            return false;
        })).resources.map(entry => entry.value.name)
    }
    async function findCharactersNames(characterUrl: string[] | IPeople[]) {
        return (await People.find(individual => {
            for (let i = 0; i < characterUrl.length; i++) {
                if (individual.url === characterUrl[i]) {
                    return true;
                }
            }
            return false;
        })).resources.map(entry => entry.value.name)
    }

    useEffect(() => {
        async function apiCall() {
            let preparedFilm = {} as FilmDataType;
            const film = await findFilm(params.name);
            if (film.length !== 1) {
                //search failed, search should get only one film
                console.error("Invalid search parameter: search should get only one film")
                history.push('/404');
                return;
            }

            preparedFilm = {
                ...preparedFilm,
                director: film[0].director,
                episodeId: film[0].episode_id,
                producer: film[0].producer,
                title: film[0].title,
                releaseDate: formatDate(film[0].release_date.toString()),
                openingCrawl: film[0].opening_crawl
            }
            if (film[0].starships.length >= 1) {
                const starships = await findStarshipsNames(film[0].starships);
                preparedFilm.starships = starships.join(', ');
            } else {
                preparedFilm.starships = "sem participação"
            }
            if (film[0].species.length >= 1) {
                const species = await findSpeciesNames(film[0].species);
                preparedFilm.species = species.join(', ');
            } else {
                preparedFilm.species = "sem participações"
            }
            if (film[0].vehicles.length >= 1) {
                const vehicles = await findVehiclesNames(film[0].vehicles);
                preparedFilm.vehicles = vehicles.join(', ');
            } else {
                preparedFilm.vehicles = "sem participações"
            }
            if (film[0].planets.length >= 1) {
                const planets = await findPlanetsNames(film[0].planets);
                preparedFilm.planets = planets.join(', ');
            } else {
                preparedFilm.planets = "sem participações";
            }
            if (film[0].characters.length >= 1) {
                const characters = await findCharactersNames(film[0].characters);
                preparedFilm.characters = characters.join(', ');
            } else {
                preparedFilm.characters = "sem participações";
            }

            setFilmData(preparedFilm);
            const filmId = film[0].url.replace(/\/$/g, "");
            const photoId = filmId.substring(filmId.lastIndexOf('/') + 1);
            import(`../../assets/films/${photoId}.jpg`)
                .catch(() => {
                }).then((res) => {
                    //set photoSrc
                    setPhoto(res.default)
                }).catch(() => {
                })
        }

        apiCall();
    }, [params.name, history])

    return (
        <Container>
            {filmData ? <>
                <Photo src={photo || error} />
                <Text>
                    <Line>
                        <Field>Titulo: </Field>
                        <Info>{filmData.title}</Info>
                    </Line>
                    <Line>
                        <Field>Personagens: </Field>
                        <Info>{filmData.characters}</Info>
                    </Line>
                    <Line>
                        <Field>Diretor: </Field>
                        <Info>{filmData.director}</Info>
                    </Line>
                    <Line>
                        <Field>Episódio: </Field>
                        <Info>{filmData.episodeId}</Info>
                    </Line>
                    <Line>
                        <Field>Abertura: </Field>
                        <Info>{filmData.openingCrawl}</Info>
                    </Line>
                    <Line>
                        <Field>Planetas: </Field>
                        <Info>{filmData.planets}</Info>
                    </Line>
                    <Line>
                        <Field>Produtor: </Field>
                        <Info>{filmData.producer}</Info>
                    </Line>
                    <Line>
                        <Field>Lançado: </Field>
                        <Info>{filmData.releaseDate}</Info>
                    </Line>
                    <Line>
                        <Field>Espécies: </Field>
                        <Info>{filmData.species}</Info>
                    </Line>
                    <Line>
                        <Field>Naves espaciais: </Field>
                        <Info>{filmData.starships}</Info>
                    </Line>
                    <Line>
                        <Field>Veículos: </Field>
                        <Info>{filmData.vehicles}</Info>
                    </Line>
                </Text>
            </> :
                <Loading />}

        </Container>
    )
}
/**
 *  characters: string;
    director: string;
    episodeId: string;
    openingCrawl: string;
    planets: string;
    producer: string;
    releaseDate: string;
    species: string;
    starships: string;
    title: string;
    vehicles: string;
 */
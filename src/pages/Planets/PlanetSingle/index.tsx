import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { Container, Field, Info, Line, Photo, Text } from './styles'
import { Loading } from '../../../components/Load';

import error from '../../../assets/erro.jpg'

import { Planets, People, Films, IFilm, IPeople } from 'swapi-ts'

type PlanetDataType = {
    name: string;
    climate: string;
    diameter: string;
    gravity: string;
    orbitalPeriod: string;
    population: string;
    surfaceWater: string;
    rotationPeriod: string;
    terrain: string;
    residents: string;
    films: string;
}




export function PlanetSingle() {
    const params = useParams<{ name: string }>();
    const history = useHistory();
    const [planetData, setPlanetData] = useState<PlanetDataType>()
    const [photo, setPhoto] = useState();


    useEffect(() => {
        async function apiCall() {
            let preparedPlanet = {} as PlanetDataType;
            const planet = await findPlanet(params.name)
            if (planet.length !== 1) {
                //search failed, search should get only one planet
                console.error("Invalid search parameter: search should get only one planet")
                history.push('/404');
                return;
            }
            preparedPlanet.name = planet[0].name;
            preparedPlanet.climate = planet[0].climate;
            preparedPlanet.diameter = planet[0].diameter;
            preparedPlanet.gravity = planet[0].gravity;
            preparedPlanet.orbitalPeriod = planet[0].orbital_period;
            preparedPlanet.population = planet[0].population;
            preparedPlanet.surfaceWater = planet[0].surface_water;
            preparedPlanet.rotationPeriod = planet[0].rotation_period;
            preparedPlanet.terrain = planet[0].terrain;
            //if residents array is not empty
            if (planet[0].residents.length >= 1) {
                const residents = await findResidentsNames(planet[0].residents)
                preparedPlanet.residents = residents.join(', ')
            } else {
                preparedPlanet.residents = "Sem personagens residentes"
            }
            //if film array is not empty
            if (planet[0].films.length >= 1) {
                const films = await findFilmsNames(planet[0].films);
                preparedPlanet.films = films.join(', ')
            } else {
                preparedPlanet.films = "sem participações"
            }
            //set planet data
            setPlanetData(preparedPlanet);
            //dynamic import photo
            const planetId = planet[0].url.replace(/\/$/g, "");
            const photoId = planetId.substring(planetId.lastIndexOf('/') + 1);
            import(`../../../assets/planets/${photoId}.jpg`)
                .catch((e) => {
                    console.error(e)
                }).then((res) => {
                    //set photo
                    setPhoto(res.default)
                }).catch((er) => { console.error(er) })
        }


        apiCall();
    }, [params.name, history])


    async function findPlanet(planet: string) {
        return (await Planets.findBySearch([planet])).resources.map(entry => entry.value)
    }
    async function findResidentsNames(residentsUrl: string[] | IPeople[]) {
        return (await People.find(individual => {
            for (let i = 0; i < residentsUrl.length; i++) {
                if (individual.url === residentsUrl[i]) {
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

    return (
        <Container>
            {planetData ? <>
                <Photo src={photo || error} />
                <Text>
                    <Line>
                        <Field>Nome: </Field>
                        <Info>{planetData.name}</Info>
                    </Line>
                    <Line>
                        <Field>Clima: </Field>
                        <Info>{planetData.climate}</Info>
                    </Line>
                    <Line>
                        <Field>Gravidade: </Field>
                        <Info>{planetData.gravity}</Info>
                    </Line>
                    <Line>
                        <Field>Período Orbital: </Field>
                        <Info>{planetData.orbitalPeriod}</Info>
                    </Line>
                    <Line>
                        <Field>População: </Field>
                        <Info>{planetData.population}</Info>
                    </Line>
                    <Line>
                        <Field>Agua na superfície: </Field>
                        <Info>{planetData.surfaceWater}</Info>
                    </Line>
                    <Line>
                        <Field>Período de rotação: </Field>
                        <Info>{planetData.rotationPeriod}</Info>
                    </Line>
                    <Line>
                        <Field>Terreno: </Field>
                        <Info>{planetData.terrain}</Info>
                    </Line>
                    <Line>
                        <Field>Residentes: </Field>
                        <Info>{planetData.residents}</Info>
                    </Line>
                    <Line>
                        <Field>Filmes: </Field>
                        <Info>{planetData.films}</Info>
                    </Line>
                </Text>
            </> : <Loading />}

        </Container>
    )
}

/**
 * name: string;
    climate: string;
    diameter:string;
    gravity: string;
    orbitalPeriod: string;
    population: string;
    surfaceWater: string;
    rotationPeriod: string;
    terrain: string;
    residents: string;
    films: string;
 */
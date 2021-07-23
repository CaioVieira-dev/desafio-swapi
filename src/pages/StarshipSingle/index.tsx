import error from '../../assets/erro.jpg'
import { Container, Field, Info, Line, Photo, Text } from './styles'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Load';
import { Starships, People, IPeople, Films, IFilm } from 'swapi-ts'

type StarshipDataType = {
    MGLT: string;
    cargoCapacity: string;
    consumables: string;
    costInCredits: string;
    crew: string;
    hyperdriveRating: string;
    length: string;
    manufacturer: string;
    maxAtmospheringSpeed: string;
    model: string;
    name: string;
    passengers: string;
    films: string;
    pilots: string;
    starshipClass: string;
}

export function StarshipSingle() {
    const params = useParams<{ name: string }>();


    const [starshipData, setStarshipData] = useState<StarshipDataType>()
    const [photo, setPhoto] = useState()

    async function findStarship(name: string) {
        return (await Starships.findBySearch([name])).resources.map(entry => entry.value)
    }
    async function findPilotNames(pilotUrl: string[] | IPeople[]) {
        return (await People.find(individual => {
            for (let i = 0; i < pilotUrl.length; i++) {
                if (individual.url === pilotUrl[i]) {
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
    useEffect(() => {
        async function apiCall() {
            let preparedStarship = {} as StarshipDataType;
            const starship = await findStarship(params.name);

            preparedStarship.name = starship[0].name;
            preparedStarship.MGLT = starship[0].MGLT
            preparedStarship.cargoCapacity = starship[0].cargo_capacity
            preparedStarship.consumables = starship[0].consumables
            preparedStarship.costInCredits = starship[0].cost_in_credits
            preparedStarship.crew = starship[0].crew
            preparedStarship.hyperdriveRating = starship[0].hyperdrive_rating
            preparedStarship.length = starship[0].length
            preparedStarship.manufacturer = starship[0].manufacturer
            preparedStarship.maxAtmospheringSpeed = starship[0].max_atmosphering_speed
            preparedStarship.model = starship[0].model
            preparedStarship.passengers = starship[0].passengers
            preparedStarship.starshipClass = starship[0].starship_class

            if (starship[0].pilots.length >= 1) {
                const pilots = await findPilotNames(starship[0].pilots);
                preparedStarship.pilots = pilots.join(', ');
            } else {
                preparedStarship.pilots = 'não possui'
            }
            if (starship[0].films.length >= 1) {
                const films = await findFilmsNames(starship[0].films)
                preparedStarship.films = films.join(', ');
            } else {
                preparedStarship.films = 'sem participações'
            }
            //set starship data
            setStarshipData(preparedStarship)

            const shipId = starship[0].url.replace(/\/$/g, "");
            const photoId = shipId.substring(shipId.lastIndexOf('/') + 1);
            import(`../../assets/starships/${photoId}.jpg`)
                .catch(() => {
                }).then((res) => {
                    //set photoSrc
                    setPhoto(res.default)
                }).catch(() => {
                })

        }

        apiCall();
    }, [params.name])

    return (
        <Container>
            {starshipData ? <>
                <Photo src={photo || error} />
                <Text>
                    <Line>
                        <Field>Nome: </Field>
                        <Info>{starshipData.name}</Info>
                    </Line>
                    <Line>
                        <Field>Velocidade: </Field>
                        <Info>{starshipData.MGLT} MGLT</Info>
                    </Line>
                    <Line>
                        <Field>Capacidade de carga: </Field>
                        <Info>{starshipData.cargoCapacity} Kg</Info>
                    </Line>
                    <Line>
                        <Field>Consumíveis: </Field>
                        <Info>{starshipData.consumables}</Info>
                    </Line>
                    <Line>
                        <Field>Custo em créditos: </Field>
                        <Info>{starshipData.costInCredits}</Info>
                    </Line>
                    <Line>
                        <Field>Tripulação: </Field>
                        <Info>{starshipData.crew}</Info>
                    </Line>
                    <Line>
                        <Field>Avaliação do hiperdrive: </Field>
                        <Info>{starshipData.hyperdriveRating}</Info>
                    </Line>
                    <Line>
                        <Field>Comprimento: </Field>
                        <Info>{starshipData.length} m</Info>
                    </Line>
                    <Line>
                        <Field>Fabricante: </Field>
                        <Info>{starshipData.manufacturer}</Info>
                    </Line>
                    <Line>
                        <Field>Velocidade maxima na atmosfera: </Field>
                        <Info>{starshipData.maxAtmospheringSpeed}</Info>
                    </Line>
                    <Line>
                        <Field>Modelo: </Field>
                        <Info>{starshipData.model}</Info>
                    </Line>
                    <Line>
                        <Field>Numero de passageiros: </Field>
                        <Info>{starshipData.passengers}</Info>
                    </Line>
                    <Line>
                        <Field>Filmes: </Field>
                        <Info>{starshipData.films}</Info>
                    </Line>
                    <Line>
                        <Field>Pilotos: </Field>
                        <Info>{starshipData.pilots}</Info>
                    </Line>
                    <Line>
                        <Field>Classe da nave espacial: </Field>
                        <Info>{starshipData.starshipClass}</Info>
                    </Line>
                </Text>
            </> :
                <Loading />}
        </Container>
    )
}
/**
 * MGLT: string;
    cargoCapacity: string;
    consumables:  string;
    costInCredits:  string;
    crew:  string;
    hyperdriveRating:  string;
    length:  string;
    manufacturer:  string;
    maxAtmospheringSpeed:  string;
    model:  string;
    name:  string;
    passengers: string;
    films:  string;
    pilots:  string;
    starshipClass:  string;
 */
import error from '../../assets/erro.jpg'
import { Container, Field, Info, Line, Photo, Text } from './styles'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Load';

import { Vehicles, People, IPeople, Films, IFilm } from 'swapi-ts';

type VehicleDataType = {
    cargoCapacity: string;
    consumables: string;
    costInCredits: string;
    crew: string;
    length: string;
    manufacturer: string;
    maxAtmospheringSpeed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: string;
    films: string;
    vehicleClass: string;
}

export function VehicleSingle() {
    const params = useParams<{ name: string }>();


    const [vehicleData, setVehicleData] = useState<VehicleDataType>()
    const [photo, setPhoto] = useState();


    useEffect(() => {
        async function apiCall() {
            let preparedVehicle = {} as VehicleDataType;
            const vehicle = await findVehicle(params.name);

            preparedVehicle = {
                ...preparedVehicle,
                cargoCapacity: vehicle[0].cargo_capacity,
                consumables: vehicle[0].consumables,
                costInCredits: vehicle[0].cost_in_credits,
                crew: vehicle[0].crew,
                length: vehicle[0].length,
                manufacturer: vehicle[0].manufacturer,
                maxAtmospheringSpeed: vehicle[0].max_atmosphering_speed,
                model: vehicle[0].model,
                name: vehicle[0].name,
                passengers: vehicle[0].passengers,
                vehicleClass: vehicle[0].vehicle_class
            }

            if (vehicle[0].pilots.length >= 1) {
                const pilots = await findPilotNames(vehicle[0].pilots);
                preparedVehicle.pilots = pilots.join(', ');
            } else {
                preparedVehicle.pilots = "não possui"
            }
            if (vehicle[0].films.length >= 1) {
                const films = await findFilmsNames(vehicle[0].films);
                preparedVehicle.films = films.join(', ');
            } else {
                preparedVehicle.films = "sem participações"
            }

            setVehicleData(preparedVehicle);
            const vehicleId = vehicle[0].url.replace(/\/$/g, "");
            const photoId = vehicleId.substring(vehicleId.lastIndexOf('/') + 1);
            import(`../../assets/vehicles/${photoId}.jpg`)
                .catch(() => {
                }).then((res) => {
                    //set photoSrc
                    setPhoto(res.default)
                }).catch(() => {
                })
        }

        apiCall();
    }, [params.name])
    async function findVehicle(name: string) {
        return (await Vehicles.findBySearch([name])).resources.map(vehicle => vehicle.value)
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

    return (
        <Container>
            {vehicleData ? <>
                <Photo src={photo || error} />
                <Text>
                    <Line>
                        <Field>Nome: </Field>
                        <Info>{vehicleData.name}</Info>
                    </Line>
                    <Line>
                        <Field>Capacidade de carga: </Field>
                        <Info>{vehicleData.cargoCapacity} Kg</Info>
                    </Line>
                    <Line>
                        <Field>Consumíveis: </Field>
                        <Info>{vehicleData.consumables}</Info>
                    </Line>
                    <Line>
                        <Field>Custo em créditos: </Field>
                        <Info>{vehicleData.costInCredits}</Info>
                    </Line>
                    <Line>
                        <Field>Tripulação: </Field>
                        <Info>{vehicleData.crew}</Info>
                    </Line>
                    <Line>
                        <Field>Comprimento: </Field>
                        <Info>{vehicleData.length} m</Info>
                    </Line>
                    <Line>
                        <Field>Fabricante: </Field>
                        <Info>{vehicleData.manufacturer}</Info>
                    </Line>
                    <Line>
                        <Field>Velocidade maxima na atmosfera: </Field>
                        <Info>{vehicleData.maxAtmospheringSpeed}</Info>
                    </Line>
                    <Line>
                        <Field>Passageiros: </Field>
                        <Info>{vehicleData.passengers}</Info>
                    </Line>
                    <Line>
                        <Field>Pilotos: </Field>
                        <Info>{vehicleData.pilots}</Info>
                    </Line>
                    <Line>
                        <Field>Filmes: </Field>
                        <Info>{vehicleData.films}</Info>
                    </Line>
                    <Line>
                        <Field>Classe de veiculo: </Field>
                        <Info>{vehicleData.vehicleClass}</Info>
                    </Line>
                    <Line>
                        <Field>Modelo: </Field>
                        <Info>{vehicleData.model}</Info>
                    </Line>
                </Text>
            </> :
                <Loading />}
        </Container>
    )
}

import { useEffect, useState } from 'react'

import { Container } from './styles'
import { Card } from '../../components/Card'
import { Loading } from '../../components/Load'

import { Vehicles as SWVehicles } from 'swapi-ts'

type VehicleType = {
    name: string;
    speed: string;
    cost: string;
    id: string;
}

export function Vehicles() {
    const [vehicleList, setVehicleList] = useState<VehicleType[]>();

    useEffect(() => {
        async function apiCall() {
            //get all vehicles
            const vehicles = await SWVehicles.find();
            //get cardInfo
            const cardInfo = vehicles.resources.map(vehicle => {
                return {
                    name: vehicle.value.name,
                    speed: vehicle.value.max_atmosphering_speed,
                    cost: vehicle.value.cost_in_credits,
                    id: vehicle.value.url
                }
            })
            setVehicleList(cardInfo)

        }

        apiCall();
    }, [])

    return (
        <Container >
            {vehicleList ?
                vehicleList.map((vehicle) =>
                    <Card key={vehicle.id}
                        field1="Nome:"
                        info1={vehicle.name}
                        field2="Velocidade:"
                        info2={vehicle.speed}
                        field3="Custo em créditos:"
                        info3={vehicle.cost}
                        photo={vehicle.id}
                        cardType="vehicle"
                        clickable
                        redirectTo={`/vehicles/${vehicle.name}`}
                    />)
                :
                <Loading />}
        </Container>
    )
}
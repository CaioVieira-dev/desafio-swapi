import { useEffect, useState } from 'react'

import { Container, Button, ButtonContainer } from './styles'
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
    const [forceUpdate, setForceUpdate] = useState(false);
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
    function sortAZ() {
        let list = vehicleList;
        list?.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        })

        setVehicleList(list)
        setForceUpdate(!forceUpdate)

    }
    function sortZA() {
        let list = vehicleList;
        list?.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase();
            if (nameA > nameB) //sort string descending
                return -1;
            if (nameA < nameB)
                return 1;
            return 0; //default return value (no sorting)
        })
        setVehicleList(list)
        setForceUpdate(!forceUpdate)
    }

    return (
        <>
            {vehicleList &&
                <ButtonContainer>
                    <Button onClick={sortAZ}>Ordenar A-Z</Button>
                    <Button onClick={sortZA}>Ordenar Z-A</Button>
                </ButtonContainer>
            }
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
        </>
    )
}
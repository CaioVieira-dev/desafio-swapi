import { Container } from './styles'
import { Header } from '../../components/Header'
import axios from 'axios'
import { useEffect } from 'react'
import { Card } from '../../components/Card'
export function Characters() {

    useEffect(() => {
        async function apiCall() {
            const res = await axios.get("https://swapi.dev/api/people")
            console.log(res.data.results)
        }
        apiCall()
    }, [])

    return (
        <>
            <Header />
            <Container>
                <Card />
            </Container>
        </>
    )
}
import { Container, Field, Info, Line } from './styles'

export function Card() {

    return (
        <Container>
            <Line>
                <Field>Nome: </Field>
                <Info> Luke Skywalker</Info>
            </Line>
            <Line>
                <Field>Planeta: </Field>
                <Info> Tatooine</Info>
            </Line>
            <Line>
                <Field>Nascimento: </Field>
                <Info> 19BBY</Info>
            </Line>
        </Container>
    )
}
import { Container, Field, Info, Line } from './styles'

type CardProps = {
    name: string;
    planet: string;
    birth: string;
}

export function Card(props: CardProps) {

    return (
        <Container>
            <Line>
                <Field>Nome: </Field>
                <Info> {props.name}</Info>
            </Line>
            <Line>
                <Field>Planeta: </Field>
                <Info> {props.planet}</Info>
            </Line>
            <Line>
                <Field>Nascimento: </Field>
                <Info> {props.birth}</Info>
            </Line>
        </Container>
    )
}
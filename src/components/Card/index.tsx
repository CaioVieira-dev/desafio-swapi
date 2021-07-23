import { Container, Field, Info, Line, Photo, Text } from './styles'

type CardProps = {
    name: string;
    planet: string;
    birth: string;
    photo?: string;
}

export function Card(props: CardProps) {

    return (
        <Container>
            <Photo src={props.photo ? props.photo : ""} />
            <Text>
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
            </Text>
        </Container>
    )
}
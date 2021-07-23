import error from '../../assets/erro.jpg'
import { useEffect, useState } from 'react'
import { Container, Field, Info, Line, Photo, Text } from './styles'

type CardProps = {
    name: string;
    planet: string;
    birth: string;
    photo: string;
    cardType: "character" | "film" | "planet" | "specie" | "starship" | "vehicle"
}

export function Card(props: CardProps) {
    const [photoSrc, setPhotoSrc] = useState('');

    useEffect(() => {
        //get url that defines card subject and remove last "/"
        const url = props.photo.replace(/\/$/g, "");
        //get parameter from last match
        const photoId = url.substring(url.lastIndexOf('/') + 1)

        //import after page load, only one photo
        import(`../../assets/${props.cardType}s/${photoId}.jpg`)
            .catch(() => {
            }).then((res) => {
                //set photoSrc
                setPhotoSrc(res.default)
            })

    }, [props.cardType, props.photo])


    return (
        <Container>
            <Photo src={photoSrc || error} />
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
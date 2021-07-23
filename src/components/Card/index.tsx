import error from '../../assets/erro.jpg'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Field, Info, Line, Photo, Text } from './styles'

type CardProps = {
    info1: string;
    info2: string;
    info3: string;
    field1: string;
    field2: string;
    field3: string;
    photo: string;
    cardType: "character" | "film" | "planet" | "specie" | "starship" | "vehicle";
    clickable?: boolean;
    redirectTo?: string;
}

export function Card(props: CardProps) {
    const [photoSrc, setPhotoSrc] = useState('');
    const history = useHistory()

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

    function handleClick() {
        if (props.clickable && props.redirectTo) {
            history.push(props.redirectTo)
        }
    }

    return (
        <Container onClick={handleClick} className={props.clickable ? "clickable" : ""}>
            <Photo src={photoSrc || error} />
            <Text>
                <Line>
                    <Field>{props.field1} </Field>
                    <Info> {props.info1}</Info>
                </Line>
                <Line>
                    <Field>{props.field2} </Field>
                    <Info> {props.info2}</Info>
                </Line>
                <Line>
                    <Field>{props.field3} </Field>
                    <Info> {props.info3}</Info>
                </Line>
            </Text>
        </Container>
    )
}
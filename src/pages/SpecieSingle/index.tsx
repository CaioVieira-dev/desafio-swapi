import error from '../../assets/erro.jpg'
import { Container, Field, Info, Line, Photo, Text } from './styles'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Load';
import { Species, Planets, IPlanet, Films, IFilm, People, IPeople } from 'swapi-ts'

type SpecieDataType = {
    averageHeight: string;
    averageLifespan: string;
    classification: string;
    designation: string;
    eyeColors: string;
    hairColors: string;
    homeworld: string;
    language: string;
    name: string;
    people: string;
    films: string;
    skinColors: string;
}

export function SpecieSingle() {
    const params = useParams<{ name: string }>();
    const history = useHistory()

    const [specieData, setSpecieData] = useState<SpecieDataType>()
    const [photo, setPhoto] = useState()

    async function findSpecie(name: string) {
        return (await Species.findBySearch([name])).resources.map(entry => entry.value)
    }
    async function findHomeworldName(planetUrl: string | IPlanet) {
        return (await Planets.find(world => world.url === planetUrl)).resources.map(entry => entry.value.name)
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
    async function findPeopleNames(peopleUrl: string[] | IPeople[]) {
        return (await People.find(individual => {
            for (let i = 0; i < peopleUrl.length; i++) {
                if (individual.url === peopleUrl[i]) {
                    return true;
                }
            }
            return false;
        })).resources.map(entry => entry.value.name)
    }
    useEffect(() => {
        async function apiCall() {
            let preparedSpecie = {} as SpecieDataType;
            const specie = await findSpecie(params.name);
            if (specie.length !== 1) {
                //search failed, search should get only one specie
                console.error("Invalid search parameter: search should get only one specie")
                history.push('/404');
                return;
            }

            preparedSpecie = {
                ...preparedSpecie,
                averageHeight: specie[0].average_height,
                averageLifespan: specie[0].average_lifespan,
                classification: specie[0].classification,
                designation: specie[0].designation,
                eyeColors: specie[0].eye_colors,
                hairColors: specie[0].hair_colors,
                language: specie[0].language,
                name: specie[0].name,
                skinColors: specie[0].skin_colors,

            }
            if (specie[0].homeworld) {
                const homeworld = await findHomeworldName(specie[0].homeworld);
                preparedSpecie.homeworld = homeworld.join(', ');
            } else {
                preparedSpecie.homeworld = "não possui"
            }
            if (specie[0].films.length >= 1) {
                const films = await findFilmsNames(specie[0].films)
                preparedSpecie.films = films.join(', ')
            } else {
                preparedSpecie.films = "sem participações"
            }
            if (specie[0].people.length >= 1) {
                const people = await findPeopleNames(specie[0].people);
                preparedSpecie.people = people.join(', ')
            } else {
                preparedSpecie.people = "sem participações"
            }
            setSpecieData(preparedSpecie);
            const specieId = specie[0].url.replace(/\/$/g, "");
            const photoId = specieId.substring(specieId.lastIndexOf('/') + 1);
            import(`../../assets/species/${photoId}.jpg`)
                .catch(() => {
                }).then((res) => {
                    //set photoSrc
                    setPhoto(res.default)
                }).catch(() => {
                })

        }

        apiCall();
    }, [params.name, history])

    return (
        <Container>
            {specieData ? <>
                <Photo src={photo || error} />
                <Text>
                    <Line>
                        <Field>Nome: </Field>
                        <Info>{specieData.name}</Info>
                    </Line>
                    <Line>
                        <Field>Altura media: </Field>
                        <Info>{specieData.averageHeight} cm</Info>
                    </Line>
                    <Line>
                        <Field>Tempo de vida médio: </Field>
                        <Info>{specieData.averageLifespan}</Info>
                    </Line>
                    <Line>
                        <Field>Classificação: </Field>
                        <Info>{specieData.classification}</Info>
                    </Line>
                    <Line>
                        <Field>Designação: </Field>
                        <Info>{specieData.designation}</Info>
                    </Line>
                    <Line>
                        <Field>Cor dos olhos: </Field>
                        <Info>{specieData.eyeColors}</Info>
                    </Line>
                    <Line>
                        <Field>Cor dos cabelos: </Field>
                        <Info>{specieData.hairColors}</Info>
                    </Line>
                    <Line>
                        <Field>Planeta natal: </Field>
                        <Info>{specieData.homeworld}</Info>
                    </Line>
                    <Line>
                        <Field>Linguagem: </Field>
                        <Info>{specieData.language}</Info>
                    </Line>
                    <Line>
                        <Field>Personagens: </Field>
                        <Info>{specieData.people}</Info>
                    </Line>
                    <Line>
                        <Field>Filmes: </Field>
                        <Info>{specieData.films}</Info>
                    </Line>
                    <Line>
                        <Field>Cor da pele: </Field>
                        <Info>{specieData.skinColors}</Info>
                    </Line>
                </Text>
            </> :
                <Loading />}


        </Container>
    )
}

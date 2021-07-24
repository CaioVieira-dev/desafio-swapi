import { useEffect, useState } from 'react'

import { Container, Button, ButtonContainer } from './styles'
import { Card } from '../../components/Card'
import { Loading } from '../../components/Load'

import { Films as SWFilms } from 'swapi-ts';

type FilmType = {
    director: string;
    title: string;
    released: string;
    id: string;
}
export function Films() {
    const [filmList, setFilmList] = useState<FilmType[]>()
    const [forceUpdate, setForceUpdate] = useState(false);


    useEffect(() => {
        async function apiCall() {
            const films = await SWFilms.find();
            //diretor titulo data de estreia
            const cardInfo = films.resources.map(film => {
                return {
                    director: film.value.director,
                    title: film.value.title,
                    released: formatDate(film.value.release_date.toString()),
                    id: film.value.url
                }
            })

            setFilmList(cardInfo)
        }

        apiCall();
    }, [])
    function formatDate(date: string) {
        const yyyy = date.substr(0, 4);
        const mm = date.substr(5, 2);
        const dd = date.substr(8, 2);
        return `${dd}/${mm}/${yyyy}`
    }
    function sortAZ() {
        let list = filmList;
        list?.sort((a, b) => {
            const nameA = a.title.toLowerCase()
            const nameB = b.title.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        })

        setFilmList(list)
        setForceUpdate(!forceUpdate)

    }
    function sortZA() {
        let list = filmList;
        list?.sort((a, b) => {
            const nameA = a.title.toLowerCase()
            const nameB = b.title.toLowerCase();
            if (nameA > nameB) //sort string descending
                return -1;
            if (nameA < nameB)
                return 1;
            return 0; //default return value (no sorting)
        })
        setFilmList(list)
        setForceUpdate(!forceUpdate)
    }

    return (
        <>
            {filmList &&
                <ButtonContainer>
                    <Button onClick={sortAZ}>Ordenar A-Z</Button>
                    <Button onClick={sortZA}>Ordenar Z-A</Button>
                </ButtonContainer>
            }
            <Container>
                {filmList ?
                    filmList.map((film) =>
                        <Card key={film.id}
                            field1="Titulo:"
                            info1={film.title}
                            field2="Diretor:"
                            info2={film.director}
                            field3="Lançado:"
                            info3={film.released}
                            photo={film.id}
                            cardType="film"
                            clickable
                            redirectTo={`/films/${film.title}`}
                        />)
                    :
                    <Loading />}
            </Container>
        </>
    )


}
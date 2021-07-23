import { Container } from './styles'


import { useEffect, useState } from 'react'
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

    function formatDate(date: string) {
        const yyyy = date.substr(0, 4);
        const mm = date.substr(5, 2);
        const dd = date.substr(8, 2);
        return `${dd}/${mm}/${yyyy}`
    }

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

    return (
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
    )


}
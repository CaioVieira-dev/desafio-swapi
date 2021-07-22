import { Image } from './styles'
import { Header } from '../../components/Header'
import banner from '../../assets/sw-banner.png'
export function Home() {

    return (
        <>
            <Header />
            <Image src={banner} />
        </>
    )
}
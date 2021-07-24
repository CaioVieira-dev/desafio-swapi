import { StyledFooter, Link, Paragraph } from './styles'

export function Footer() {

    return (
        <StyledFooter>
            <Paragraph>Star Wars e todos os nomes e/ou imagens associados são de copyright de Lucasfilm Ltd. Imagens foram coletadas livremente de <Link href="https://starwars.fandom.com/wiki/Main_Page">Wookiepedia</Link>.</Paragraph>
        </StyledFooter>
    )
}
import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const Container = styled.header`
width:100%;
height:100px;
display:flex;
align-items: center;
justify-content: space-between;
padding: 0 24px;
`

export const Logo = styled.img``
export const Navigation = styled.nav`
display: flex;
gap:24px;
`
export const NavigationItem = styled(Link)`
font-size: 24px;
font-weight: bold;
color: hsl(45,89%,45%);
text-transform: capitalize;
text-decoration: none;
`

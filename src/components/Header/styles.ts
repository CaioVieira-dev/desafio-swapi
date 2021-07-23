import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const Container = styled.header`
width:100%;
height:100px;
display:flex;
position: relative;
align-items: center;
justify-content: space-between;
padding: 0 24px;
background-color: hsla(0,0%,0%,0.2);
z-index: 20;
`

export const Logo = styled.img``
export const Navigation = styled.nav`
display: flex;
gap:24px;
@media(max-width:900px){
   
    position: absolute;
    top: -400px;
    flex-direction: column;
    width:100% ;
    gap: 2px;
    margin-left:-24px;
    background-color: black;
    transition: top 0.6s ease;
    z-index: 10;
    .active&{
           display: flex;
            top:100px;
       }
        
        
    
}
`
export const NavigationItem = styled(Link)`
cursor: pointer;
font-size: 24px;
font-weight: bold;
color: hsl(45,89%,45%);
text-transform: capitalize;
text-decoration: none;
transition: color 0.3s ease-in-out;
:hover&{
    color: hsl(45,89%,25%)
}
@media(max-width:900px){
text-align: center;
padding: 12px 24px;
:not(:last-child){
    border-bottom: 2px solid hsl(45,89%,45%);
}
}

`
export const MobileBarsButton = styled.img`
display:none;
filter: invert(53%) sepia(86%) saturate(966%) hue-rotate(14deg) brightness(106%) contrast(90%);
cursor: pointer;
@media(max-width:900px){
    display: block;

}
`
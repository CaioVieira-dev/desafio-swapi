import styled from "styled-components";

export const Container = styled.div`
padding: 20px;
background-color:black;
border: 2px solid hsl(45,89%,45%);
border-radius: 8px;

width: 426px;
display: flex;
gap: 20px;
align-items: center;
@media (max-width:1440px){
    width:400px;
}
`
export const Text = styled.div`
display: flex;
flex-direction:column;
gap: 28px;
`
export const Line = styled.p``
export const Field = styled.strong`
font-size: 20px;
color: hsl(45,89%,45%);
text-transform: capitalize;
`
export const Info = styled.span`
color: hsl(45,89%,45%);
font-size: 20px;
text-transform: capitalize;
`
export const Photo = styled.img`
height:155px;
width:105px;
border-radius: 8px;
`
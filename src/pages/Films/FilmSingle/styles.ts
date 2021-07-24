import styled from "styled-components";

export const Container = styled.div`
position: relative;
left: 50%;
transform:translateX(-50%);
margin-top: 56px;
width: 90%;

padding:48px 24px;
background-color:black;
border: 2px solid hsl(45,89%,45%);
border-radius: 8px;

display: flex;
gap: 24px;

@media(max-width:1024px){
    flex-direction: column;
    align-items: center;
}

`
export const Text = styled.div`
display: flex;
flex-direction: column;
gap: 28px;
`
export const Line = styled.p``
export const Field = styled.strong`
font-size: 24px;
color: hsl(45,89%,45%);
text-transform: uppercase;
`
export const Info = styled.span`
color: hsl(45,89%,45%);
font-size: 24px;
text-transform: capitalize;
`
export const Photo = styled.img`
width:403px;
height:554px;
border-radius: 8px;
`

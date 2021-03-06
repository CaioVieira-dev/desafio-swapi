import styled from "styled-components";

export const Container = styled.div`
margin-top: 36px;
max-width: 800px;
position: relative;
left: 50%;
transform: translateX(-50%);
display: flex;
flex-direction: column;
gap:24px;
justify-content: center;
align-items: center;
padding: 0 2%;
`

export const Text = styled.strong`

font-size: 64px;
color: hsl(45,89%,45%);
text-transform: capitalize;
text-align: center;
@media(max-width:768px){
font-size: 48px;
}
`
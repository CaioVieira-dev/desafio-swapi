import styled, { keyframes } from "styled-components";

const resize = keyframes`
0%100%{
    transform: scale(1);
}
40%{
    transform: scale(0.5);
}
80%{
    transform: scale(2);
}
`

export const Container = styled.div`
display: flex;
gap:20px;
align-items: center;
justify-content:center;
position: relative;
left: 50%;
transform: translateX(-50%);

`
export const Circle = styled.div`
width: 30px;
height: 30px;
background-color:hsl(45,89%,45%);
border-radius: 100px;

animation: ${resize} 1.2s linear infinite;
:nth-child(2)&{
    animation: ${resize} 1.5s linear infinite;
}
`

import styled from 'styled-components'

export const Image = styled.img`
position: relative;
left: 50%;
transform: translateX(-50%);
@media (max-width:768px){
   width:500px;
}
@media (max-width:500px){
width: 360px;
}
`

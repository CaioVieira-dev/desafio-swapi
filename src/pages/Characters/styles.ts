import styled from "styled-components";

export const Container = styled.section`
 display: flex;
 gap: 16px;
  flex-wrap: wrap;
  justify-content:space-between;
  padding: 0 36px;
  margin-top: 56px;
  @media (max-width:980px){
      justify-content:center;
      align-items:center;
  }
 `
export const Button = styled.button`
 font-size: 24px;
 color: hsl(45,89%,45%);
 background-color:transparent;
 border: 2px solid hsl(45,89%,45%);
 padding: 8px 12px;
 border-radius: 8px;
 transition:border-color 0.3s linear;
 cursor: pointer;
 :hover&{
     border-color: hsl(45,89%,25%);
 }
 `
export const ButtonContainer = styled.div`
 width: 100%;
 display: flex;
 gap: 16px;
 justify-content:center;
 align-items: center;
 `
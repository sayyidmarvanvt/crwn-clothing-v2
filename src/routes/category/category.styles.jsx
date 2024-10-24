import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  row-gap: 50px;
`;

export const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 25px;
  text-align: center;
`;

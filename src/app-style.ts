import styled from "styled-components";

export const LayoutWrapper = styled.div`
  background-image: linear-gradient(
    0deg,
    hsl(215, 14%, 16%) 0%,
    hsl(215, 19%, 29%) 100%
  );
  border-radius: 3px;
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.25);
  margin: 3rem auto;
  max-width: 370px;
`;

export const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

export const Header = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin-bottom: 5px;
`;

export const StoreContainer = styled.div`
  text-align: center;
  padding: 5px;
  background-color: skyblue;
`;

export const ItemsContainer = styled.div`
  text-align: center;
`;

export const ItemContainer = styled.div`
  padding: 5px;
  border-bottom: 1px solid grey;
`;

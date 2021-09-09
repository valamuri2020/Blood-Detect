import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 20px;
  color: white;
  background-color: ${(props) => props.bg_color ?? "darkblue"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

export const Title = styled.h3`
  a {
    color: white;
  }
`;

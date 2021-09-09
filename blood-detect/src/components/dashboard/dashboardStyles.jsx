import styled from "styled-components";
import { Container, Button } from "react-bootstrap";

const darkblue = "#5C5CFF";
const hoverdarkblue = "#775496";
const lavender = "#eeb4ff";
const darkred = "#8b0000";

export const PageWrapper = styled(Container)`
  align-items: center;
  padding: 2rem;
  background-color: ${lavender};
  min-width: 98vw;
  height: 100%
  
`;

export const PageHeader = styled.h3`
    padding: 1rem;
    color: ${darkred};
`

export const Image = styled.img`
  height: ${(props) => props.size ?? "200px"};
  width: ${(props) => props.size ?? "200px"};
`;

export const SubmitButton = styled(Button)`
  padding-bottom: 15px;
  margin-top: 5.5px;
  background-color: ${darkblue};
  &:hover {
    background-color: ${hoverdarkblue}
  }
`;

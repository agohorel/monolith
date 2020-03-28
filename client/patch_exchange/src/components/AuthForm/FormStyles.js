import styled from "styled-components";

import colors from "../../styles/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: ${colors.darkgrey};
  margin-bottom: 1000rem;
`;

export const Label = styled.label`
  color: ${colors.offwhite};
  margin-bottom: .25rem;
`;

export const Input = styled.input`
  background-color: ${colors.midgrey};
  color: ${colors.lightgrey};
  border: none;
  padding: 0.5rem;
  margin-bottom: 2rem;
`;

import styled from "styled-components";

import colors from "../../styles/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: ${colors.darkgrey};

  * {
    font-family: "Robo Mono", monospace;
  }
`;

export const Label = styled.label`
  color: ${colors.offwhite};
  margin-bottom: 0.25rem;
  font-size: 1.8rem;
`;

export const Input = styled.input`
  background-color: ${colors.midgrey};
  color: ${colors.lightgrey};
  border: none;
  padding: 0.5rem;
  margin-bottom: 2rem;
`;

export const Textarea = styled.textarea`
  background-color: ${colors.midgrey};
  color: ${colors.lightgrey};
  border: none;
  padding: 0.5rem;
  margin-bottom: 2rem;
`;

export const Select = styled.select`
  background-color: ${colors.midgrey};
  color: ${colors.lightgrey};
  border: none;
  padding: 0.5rem;
`;

export const Option = styled.option`
  background-color: ${colors.lightgrey};
  color: ${colors.nearblack};
`;

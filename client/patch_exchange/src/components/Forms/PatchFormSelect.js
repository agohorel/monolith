import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

import { Label, Select, Option } from "./FormStyles";

import colors from "../../constants/colors";

export const PatchFormSelect = ({
  category,
  label,
  itemPropertyName,
  handleChange,
  metadataLists
}) => {
  const [selectCounts, setSelectCounts] = useState({
    operatingSystems: [1],
    platforms: [1],
    categories: [1],
    tags: [1]
  });

  const addSelectGroup = e => {
    const type = e.currentTarget.getAttribute("name");
    setSelectCounts({
      ...selectCounts,
      [type]: [...selectCounts[type], selectCounts[type].length + 1]
    });
  };

  const removeSelectGroup = e => {
    const type = e.currentTarget.getAttribute("name");
    if (selectCounts[type].length > 1) {
      setSelectCounts({
        ...selectCounts,
        [type]: selectCounts[type].slice(0, selectCounts[type].length - 1)
      });
    }
  };

  return (
    <SelectGroup>
      <Label htmlFor={category}>{label}</Label>
      <SelectRow>
        {selectCounts[category].map(idx => {
          return (
            <Select key={idx} id={category} onChange={handleChange}>
              {metadataLists[category]?.map(item => {
                return (
                  <Option
                    key={item.id}
                    id={item[itemPropertyName]}
                    value={item[itemPropertyName]}
                  >
                    {item[itemPropertyName]}
                  </Option>
                );
              })}
            </Select>
          );
        })}
        <Icon
          icon={faPlusCircle}
          size="2x"
          name={category}
          onClick={addSelectGroup}
        />
        <Icon
          icon={faMinusCircle}
          size="2x"
          name={category}
          onClick={removeSelectGroup}
        />
      </SelectRow>
    </SelectGroup>
  );
};

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-bottom: 2rem;
  width: calc(50% - 2rem);
`;

const SelectRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  select {
    :not(:last-of-type) {
      margin-right: 1rem;
    }
    width: 100%;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${colors.offwhite};
  margin-left: 1rem;
  :hover {
    cursor: pointer;
    color: ${colors.nearblack};
  }
`;

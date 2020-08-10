import React, { useState, useEffect } from "react";
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
  metadataLists,
  existingForm,
  mode,
}) => {
  const [selectCounts, setSelectCounts] = useState({
    operating_systems: [1],
    platforms: [1],
    categories: [1],
    tags: [1],
  });

  useEffect(() => {
    if (mode === "edit") {
      setSelectCounts({
        operating_systems: existingForm.operating_systems,
        platforms: existingForm.platforms,
        categories: existingForm.categories,
        tags: existingForm.tags,
      });
    }
  }, [existingForm, mode]);

  const addSelectGroup = (e) => {
    const type = e.currentTarget.getAttribute("name");
    setSelectCounts({
      ...selectCounts,
      [type]: [...selectCounts[type], selectCounts[type].length + 1],
    });
  };

  const removeSelectGroup = (e) => {
    const type = e.currentTarget.getAttribute("name");
    if (selectCounts[type].length > 1) {
      setSelectCounts({
        ...selectCounts,
        [type]: selectCounts[type].slice(0, selectCounts[type].length - 1),
      });
    }
  };

  return (
    <SelectGroup>
      <Label htmlFor={category}>{label}</Label>
      <SelectRow>
        {selectCounts[category].map((cat) => {
          if (mode === "edit") {
            return (
              <Select
                key={`${cat.name}_${cat.id}`}
                id={category}
                onChange={handleChange}
                value={cat.name}
              >
                {metadataLists[category]?.map((item) => {
                  return (
                    <Option
                      key={item.id}
                      id={item.id}
                      value={item[itemPropertyName]}
                    >
                      {item[itemPropertyName]}
                    </Option>
                  );
                })}
              </Select>
            );
          } else {
            return (
              <Select key={cat} id={category} onChange={handleChange}>
                {metadataLists[category]?.map((item) => {
                  return (
                    <Option
                      key={item.id}
                      id={item.id}
                      value={item[itemPropertyName]}
                    >
                      {item[itemPropertyName]}
                    </Option>
                  );
                })}
              </Select>
            );
          }
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

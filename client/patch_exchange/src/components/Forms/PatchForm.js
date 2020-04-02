import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { fetchMetadataLists } from "../../actions/patchActions";

import { Form, Label, Input, Textarea, Select, Option } from "./FormStyles";
import { Button } from "../Button/Button";

import colors from "../../styles/colors";

const PatchForm = ({ metadataLists, fetchMetadataLists }) => {
  const [selectCounts, setSelectCounts] = useState({
    os: [1],
    platform: [1],
    category: [1],
    tag: [1]
  });
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    preview_url: "",
    repo_url: "",
    version: "",
    file_url: "",
    description: "",
    release_status: "",
    os: [],
    platforms: [],
    categories: [],
    tags: []
  });

  useEffect(() => {
    fetchMetadataLists();
  }, [fetchMetadataLists]);

  const handleChange = e => {
    if (typeof formData[e.target.id] === "string") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } else {
      // update array fields
      setFormData({
        ...formData,
        [e.target.id]: [...formData[e.target.id], e.target.value]
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // redux action here
  };

  const addSelectGroup = e => {
    const type = e.currentTarget.getAttribute("name");
    setSelectCounts({
      ...selectCounts,
      [type]: [...selectCounts[type], selectCounts[type].length + 1]
    });
  };

  console.log(formData);

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">name</Label>
      <Input id="name" onChange={handleChange}></Input>
      <Label htmlFor="image_url">image url</Label>
      <Input id="image_url" onChange={handleChange}></Input>
      <Label htmlFor="preview_url">preview url</Label>
      <Input id="preview_url" onChange={handleChange}></Input>
      <Label htmlFor="repo_url">repo url</Label>
      <Input id="repo_url" onChange={handleChange}></Input>
      <Label htmlFor="version">version name</Label>
      <Input id="version" onChange={handleChange}></Input>
      <Label htmlFor="file_url">file url</Label>
      <Input id="file_url" onChange={handleChange}></Input>
      <Label htmlFor="description">description</Label>
      <Textarea id="description" onChange={handleChange}></Textarea>

      <SelectContainer>
        <SelectGroup>
          <Label htmlFor="os">os compatibility</Label>
          <SelectRow>
            {selectCounts.os.map(idx => {
              return (
                <Select key={idx} id="os" onChange={handleChange}>
                  {metadataLists.operatingSystems?.map(os => {
                    return (
                      <Option key={os.id} id={os.os_name} value={os.os_name}>
                        {os.os_name}
                      </Option>
                    );
                  })}
                </Select>
              );
            })}
            <Icon
              icon={faPlusCircle}
              size="2x"
              name="os"
              onClick={addSelectGroup}
            />
          </SelectRow>
        </SelectGroup>

        <SelectGroup>
          <Label htmlFor="platform">platform</Label>
          <SelectRow>
            {selectCounts.platform.map(idx => {
              return (
                <Select key={idx} id="platforms" onChange={handleChange}>
                  {metadataLists.platforms?.map(platform => {
                    return (
                      <Option
                        key={platform.id}
                        id={platform.platform_name}
                        value={platform.platform_name}
                      >
                        {platform.platform_name}
                      </Option>
                    );
                  })}
                </Select>
              );
            })}
            <Icon
              icon={faPlusCircle}
              size="2x"
              name="platform"
              onClick={addSelectGroup}
            />
          </SelectRow>
        </SelectGroup>

        <SelectGroup>
          <Label htmlFor="categories">categories</Label>
          <SelectRow>
            {selectCounts.category.map(idx => {
              return (
                <Select key={idx} id="categories" onChange={handleChange}>
                  {metadataLists.categories?.map(category => {
                    return (
                      <Option
                        key={category.id}
                        id={category.category_name}
                        value={category.category_name}
                      >
                        {category.category_name}
                      </Option>
                    );
                  })}
                </Select>
              );
            })}
            <Icon
              icon={faPlusCircle}
              size="2x"
              name="category"
              onClick={addSelectGroup}
            />
          </SelectRow>
        </SelectGroup>

        <SelectGroup>
          <Label htmlFor="tags">tags</Label>
          <SelectRow style={{ width: "100%" }}>
            {selectCounts.tag.map(idx => {
              return (
                <Select key={idx} id="tags" onChange={handleChange}>
                  {metadataLists.tags?.map(tag => {
                    return (
                      <Option key={tag.id} id={tag.tag} value={tag.tag}>
                        {tag.tag}
                      </Option>
                    );
                  })}
                </Select>
              );
            })}
            <Icon
              icon={faPlusCircle}
              size="2x"
              name="tag"
              onClick={addSelectGroup}
            />
          </SelectRow>
        </SelectGroup>

        <Label htmlFor="release_status">release status</Label>
        <SelectRow style={{ marginBottom: "2rem" }}>
          <Select id="release_status" onChange={handleChange}>
            {metadataLists.releaseStatuses?.map(releaseStatus => {
              return (
                <Option
                  key={releaseStatus.id}
                  id={releaseStatus.release_status}
                  value={releaseStatus.release_status}
                >
                  {releaseStatus.release_status}
                </Option>
              );
            })}
          </Select>
        </SelectRow>
      </SelectContainer>
      <Button>Add Patch</Button>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    metadataLists: state.patches.metadataLists
  };
};

export default connect(mapStateToProps, { fetchMetadataLists })(PatchForm);

const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

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
    width: 100%;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${colors.offwhite};
  :hover {
    cursor: pointer;
    color: ${colors.nearblack};
  }
  margin-left: 1rem;
`;

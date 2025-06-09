"use client"
import React from 'react';
import Select from 'react-select';

const SelectNice = ({options, onChange, placeholder = "Select an option"}) => {
  
  return (
    <Select 
      options={options} 
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default SelectNice;

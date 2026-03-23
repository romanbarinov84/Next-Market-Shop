"use client"
import React, { ChangeEvent } from 'react';

interface selectRegionProps {
    value:string;
    onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectRegion = ({value,onChangeAction}:selectRegionProps) => {
  return (
    <div>

    </div>
  )
}

export default SelectRegion
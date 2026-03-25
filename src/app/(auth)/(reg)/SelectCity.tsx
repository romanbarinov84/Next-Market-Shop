
"use client";

import { ChangeEvent } from "react";
import { formStyles } from "../styles";


interface SelectCityProps {
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectCity = ({ value, onChangeAction }: SelectCityProps) => {
  return (
    <div>
      <label htmlFor="location" className={formStyles.label}>
        Населенный пункт
      </label>
      <div className="relative">
        <select
          id="location"
          value={value}
          onChange={onChangeAction}
          className={formStyles.input} 
        >
          <option value="">Выберите город</option>
                    <option value="Киев">Киев</option>
                    <option value="Бровары">Бровары</option>
                    <option value="Борисполь">Борисполь</option>
                    <option value="Буча">Буча</option>
        </select>
       
      </div>
    </div>
  );
};

export default SelectCity;
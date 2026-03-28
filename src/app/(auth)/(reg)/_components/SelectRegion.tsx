'use client';
import React, { ChangeEvent } from 'react';
import { formStyles } from './styles';


interface selectRegionProps {
    value: string;
    onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectRegion = ({ value, onChangeAction }: selectRegionProps) => {
    return (
        <div>
            <label htmlFor="region"className="text-gray-400">Регион</label>
            <div className="relative">
                <select
                    id="region"
                    value={value}
                    onChange={onChangeAction}
                    className={formStyles.input}
                >
                    <option value="">Выберите регион</option>
                    <option value="Киев">Киев</option>
                    <option value="Киевская область">Киевская область</option>
                </select>
            </div>
        </div>
    );
};

export default SelectRegion;

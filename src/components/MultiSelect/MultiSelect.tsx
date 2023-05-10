import React, { useEffect, useRef, useState } from "react";
import './MultiSelect.scss';

export interface MultiSelectOption {
  label: string;
  value: string;
}

function MultiSelect({ name, label, options, onChange }
  : { name: string, label: string, options: MultiSelectOption[], onChange: Function }) {
  const [open, setOpen] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>('');
  const [selected, setSelected] = useState<MultiSelectOption[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(e.target as HTMLDivElement)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    onChange(parseSelected());
  }, [selected]);

  const parseSelected = (): string => {
    let filter = `${label}=`;
    selected.map((item) => {
      filter += item.value + ',';
    });

    return filter.replace(/,$/, '');
  }

  const addToSelected = (option: MultiSelectOption): void => {
    if (undefined === selected.find((item) => item.value == option.value)) {
      setSelected(selected => [...selected, option]);
    }
  }

  const removeFromSelected = (option: MultiSelectOption): void => {
    setSelected(selected.filter((item) => item.value !== option.value));
  }

  const removeLastSelected = (): void => {
    if (selected.length > 0) {
      selected.pop();
      setSelected(() => [...selected]);
    }
  }

  const filterChoices = (option: MultiSelectOption): boolean => {
    if (currentFilter === '') {
      return true;
    }
    return option.label.startsWith(currentFilter);
  }

  return (
    <div
      ref={rootRef}
      className="fz-multiselect"
    >
      <span className="fz-multiselect-label">{name}</span>
      <div
        className="fz-multiselect-container"
      >
        <div className="fz-multiselect-selected">
          {selected.map((item) =>
            <div
              className="fz-multiselect-pills"
              key={item.value}
              onClick={() => removeFromSelected(item)}
            >
              <div>{item.label}</div>
            </div>
          )}
        </div>
        <input
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && currentFilter === "") {
              removeLastSelected();
            }
          }}
          onChange={(e) => setCurrentFilter(e.currentTarget.value)}
          className="fz-multiselect-filter-input"
          type="text"
        />
        <span
          onClick={() => setOpen(!open)}
          className={`arrow ${open && 'opened'}`}
        >
        </span>
      </div>
      <div className={`fz-multiselect-content ${open && ' active'}`}>
        {options.length > 0 &&
          <ul>
            {
              options.filter(filterChoices).map((item) => (
                <li
                  onClick={() => addToSelected(item)}
                  key={item.value}>{item.label}
                </li>
              ))
            }
          </ul>
        }
      </div>
    </div >
  );
}

export default MultiSelect;
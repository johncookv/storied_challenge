/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";

import { DROPDOWN_SELECT } from "../base/colors";

const styles = () => ({
  container: css`
    width: 200px;
  `,
  optionsContainer: css`
    max-height: 100px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
  `,
  optionsOuterContainer: css`
    border-width: 10px;
  `,
  option: css`
    :hover {
      background-color: ${DROPDOWN_SELECT.SECONDARY};
    }
  `,
  selectedOptionLight: css`
    background-color: ${DROPDOWN_SELECT.SECONDARY};
  `,
  selectedOption: css`
    background-color: ${DROPDOWN_SELECT.MAIN};
    :hover {
      background-color: ${DROPDOWN_SELECT.MAIN};
    }
  `,
  search: css`
    border-color: ${DROPDOWN_SELECT.MAIN};
    border-radius: 5px;
  `,
});

const keyCode = {
  enter: 13,
  arrowUp: 38,
  arrowDown: 40,
};

const DropdownSelect = ({
  label,
  options,
  onChange,
  isSearchable,
  value,
  open,
}) => {
  const cssStyles = styles();
  const inputRef = useRef();
  const [optionsToShow, setOptionsToShow] = useState(options);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (!open) {
      setOptionsToShow(options);
      setSelectedIndex(-1);
      if (inputRef?.current?.value) {
        inputRef.current.value = "";
      }
    }
  }, [options, open]);

  const filterOptions = (e) => {
    setOptionsToShow(
      options.filter((option) => option.value.includes(e.target.value))
    );
  };

  const handleKeyDown = (e) => {
    if (!open) {
      return;
    }
    switch (e.keyCode) {
      case keyCode.enter:
        selectedIndex > -1 && onChange(options[selectedIndex].value);
        break;
      case keyCode.arrowUp:
        selectedIndex > 0 && setSelectedIndex(selectedIndex - 1);
        break;
      case keyCode.arrowDown:
        selectedIndex < options.length - 1 &&
          setSelectedIndex(selectedIndex + 1);
        break;
      default:
      // no-op
    }
  };

  return (
    <div css={cssStyles.container} onKeyDown={handleKeyDown}>
      <input
        type="text"
        readOnly
        value={value ? value.charAt(0).toUpperCase() + value.slice(1) : label}
        onClick={onChange}
        data-testid="selector-input"
      />
      {open && (
        <div css={cssStyles.optionsOuterContainer}>
          {isSearchable && (
            <input
              css={cssStyles.search}
              ref={inputRef}
              type="text"
              onChange={filterOptions}
              autoFocus
            />
          )}
          <ul css={cssStyles.optionsContainer}>
            {optionsToShow.map((option, index) => {
              return (
                <li
                  key={index}
                  css={[
                    cssStyles.option,
                    ...(option.value === value
                      ? [cssStyles.selectedOption]
                      : index === selectedIndex
                      ? [cssStyles.selectedOptionLight]
                      : []),
                  ]}
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;

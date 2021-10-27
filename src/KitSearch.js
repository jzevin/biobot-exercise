import React, { useEffect, useState } from "react";
import axios from "axios";
import "./KitSearch.css";

export default function KitSearch({
  onAppClickSearchItem,
  appUiState,
  setAppUiState,
}) {
  const [apiSearchString, setApiSearchString] = useState(""),
    [autoCompleteResults, setAutoCompleteResults] = useState([]);

  useEffect(() => {
    // needs to be at least 3 chars
    if (apiSearchString.length < 3) {
      return;
    }
    setAutoCompleteResults([]);
    axios
      .get(`http://127.0.0.1:3001/kits/search/${apiSearchString}`)
      .then((result) => setAutoCompleteResults([...result.data]));
  }, [apiSearchString]);

  // handle search input
  function onSearchChange(e) {
    const { value } = e.target;
    e.target.value = value.trim();
    if (value.length) {
      setAppUiState({ ...appUiState, autoCompleteIsOpen: true });
    } else {
      setAppUiState({ ...appUiState, autoCompleteIsOpen: false });
    }
    setApiSearchString(value);
  }

  // handle auto complete click
  function onAutoCompleteItemClick(item) {
    setAppUiState({ ...appUiState, autoCompleteIsOpen: false }); // close the autocomplete
    setApiSearchString(item.label_id); // set the search string to the label id
    setAutoCompleteResults([]); // clear results
    onAppClickSearchItem(item); // pass the item to the parent
  }

  return (
    <div id="kit-search">
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <label id="kit-search-label" htmlFor="search">
          <input
            type="text"
            autoComplete="off"
            name="search"
            id="kit-search-input"
            value={apiSearchString}
            onChange={onSearchChange}
            tabIndex="1"
          />
          <div
            id="search-auto-complete"
            className={appUiState.autoCompleteIsOpen ? "open" : "closed"}
          >
            <ol id="search-auto-complete-list">
              <li
                className={
                  autoCompleteResults < 3
                    ? "search-auto-complete-list-item--info active"
                    : "search-auto-complete-list-item--info"
                }
              >
                No Results :(
              </li>
              {autoCompleteResults.map((item, index) => (
                <li className="search-auto-complete-list-item" key={item.id}>
                  <a
                    href=""
                    className="search-auto-complete-list-item-link"
                    onClick={(e) => (
                      e.preventDefault(), onAutoCompleteItemClick(item)
                    )}
                    tabIndex={index + 1}
                  >
                    Label ID: {item.label_id}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </label>
      </form>
    </div>
  );
}

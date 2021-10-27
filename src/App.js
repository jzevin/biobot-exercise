import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import KitSearch from "./KitSearch.js";
import KitSearchDetails from "./KitSearchDetails.js";

function App() {
  const [searchResultsDetail, setSearchResultsDetail] = useState({}),
    [appUiState, setAppUiState] = useState({ autoCompleteIsOpen: false });

  function onClickSearchItem(itemData) {
    //context would be better for ui state but fine for this exercise
    setAppUiState({ ...appUiState, autoCompleteIsOpen: false });
    setSearchResultsDetail(itemData); //set the search results detail
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="biobot logo" />
      </header>

      <section id="content">
        <KitSearch
          onAppClickSearchItem={onClickSearchItem}
          appUiState={appUiState}
          setAppUiState={setAppUiState}
        />
        <KitSearchDetails kitData={searchResultsDetail} />
      </section>
    </div>
  );
}

export default App;

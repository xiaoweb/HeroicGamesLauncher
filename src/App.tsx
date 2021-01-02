import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import { Library } from "./components/Library";
import GameConfig from "./components/UI/GameConfig";
import { getLegendaryConfig } from "./helper";

function App() {
  const [config, setConfig] = React.useState({} as any);

  React.useEffect(() => {
    const updateConfig = async () => {
      const newConfig = await getLegendaryConfig();
      newConfig && setConfig(newConfig);
    };
    updateConfig();
  }, []);

  if (Object.keys(config).length) {
    const { user, library } = config;

    if (!user) {
      return null;
    }

    return (
      <HashRouter>
        {/* TODO: move rel below to proper location */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              children={<Library library={library} user={user} />}
            />
            <Route exact path="/gameconfig" component={GameConfig} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
  return <div className={"noConfigText"}>No Config Found</div>;
}

export default App;

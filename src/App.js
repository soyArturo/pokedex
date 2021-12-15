import React, { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "./context/ThemeContext";

import withRouter from "./Routes/withRouter";
import generations from "./generations";
import PokeView from "./components/Main/PokeView";
import NotFound from "./components/NotFound";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.light ? "#f5f5f5" : "#181818")};
  height: 100vh;
`;

const App = () => { 
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Main light={!darkMode}>
      <Routes>
        <Route path="*" element={<NotFound/>} />
        <Route exact path="/" element={<Navigate to={generations[0].link} />} />
        {generations.map((generation, i) => (
          <Route key={i} exact path={"/" + generation.link} element={<PokeView gen={generation}/>} />
            
        ))}
      </Routes>
    </Main>
  );
};

export default withRouter(App);

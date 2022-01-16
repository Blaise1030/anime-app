import { Box } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AnimeContext from "./Context/AnimeContext";
import AnimeDetailsContext from "./Context/AnimeDetailsContext";
import AnimeSearchContext from "./Context/AnimeSearchContext";
import AnimeRouter from "./router";

function App() {
  return (
    <BrowserRouter>
      <AnimeContext>
        <AnimeDetailsContext>
          <AnimeSearchContext>
            <Box width={"100vw"} height={"100vh"} userSelect={"none"}>
              <AnimeRouter />
            </Box>
          </AnimeSearchContext>
        </AnimeDetailsContext>
      </AnimeContext>
    </BrowserRouter>
  );
}

export default App;

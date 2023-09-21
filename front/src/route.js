import { Route, Routes } from "react-router-dom";
import List from "./pages/List";
import Game from "./pages/Game";
import Answer from "./pages/Answer";
import Enter from "./pages/Enter";
export const AppRouting = () => {
  return (
    <Routes>
      <Route path="" element={<List />} />
      <Route path="game" element={<Game />} />
      <Route path="answer" element={<Answer />} />
      <Route path="enter" element={<Enter />} />
    </Routes>
  );
};

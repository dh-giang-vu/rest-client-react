import InputData from "./pages/InputData";
import SendData from "./pages/SendData";

const routes = [
  {
    path: "/",
    element: <InputData />,
  },
  {
    path: "send",
    element: <SendData />,
  },
];

export default routes;
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Container from "../container/Container";

function HeaderContainer() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default HeaderContainer;

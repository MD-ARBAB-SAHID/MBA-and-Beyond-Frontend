import { Navbar, Container, Nav } from "react-bootstrap";
import AuthContext from "../../store/Auth-Context";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Styles from "./Navbar.module.css";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const NavBar = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  const logoutHandler = async () => {
    try {
      const data = await sendRequest("/api/logout", "POST");

      if (data.success) {
        authCtx.logout();
        router.replace("/");
      }

      setResponseData(data);
    } catch (err) {
      // authCtx.logout();
    }
  };

  const path = router.pathname;

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="black"
        variant="dark"
        className={Styles["navbar"]}
      >
        <Container>
          <Navbar.Brand className={Styles["navbar-brand"]}>
            <Link href="/">
              <Nav.Link eventKey="2" href="/" bsPrefix={Styles["brand"]}>
                MBA and Beyond Blogs
              </Nav.Link>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={`me-auto`}></Nav>
            <Nav>
              <Link href="/add-blog">
                <Nav.Link
                  href="/add-blog"
                  eventKey="2"
                  bsPrefix={Styles["nav-link"]}
                >
                  Add Blog
                </Nav.Link>
              </Link>

              {!authCtx.isLoggedin && (
                <Link href="/login">
                  <Nav.Link
                    href="/login"
                    eventKey="2"
                    bsPrefix={Styles["nav-link"]}
                  >
                    Login
                  </Nav.Link>
                </Link>
              )}
              {authCtx.isLoggedin && (
                <Link href="/draft-blogs">
                  <Nav.Link
                    href="/draft-blogs"
                    eventKey="2"
                    bsPrefix={Styles["nav-link"]}
                  >
                    Draft Blogs
                  </Nav.Link>
                </Link>
              )}
              {authCtx.isLoggedin && (
                <Link href="/my-blogs">
                  <Nav.Link
                    href="/my-blogs"
                    eventKey="2"
                    bsPrefix={Styles["nav-link"]}
                  >
                    My Blogs
                  </Nav.Link>
                </Link>
              )}

              {authCtx.isLoggedin && (
                <button
                  className={`${Styles["nav-link"]} ${Styles["logout"]}`}
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import myCtx from "./store/authCtx";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Home() {
  const authCtx = useContext(myCtx);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Movies, setMovies] = useState([]);
  let api = "https://api.themoviedb.org/";
  let API_key = "1ff12ca4f16a9f0d5149fe1335118d27";
  let url = api + "3/movie/now_playing?api_key=" + API_key;
  var ranonce = false;
  useEffect(() => {
    if (!ranonce) {
      fetch(url)
        .then((res) => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setMovies(data.results);
            console.log("aaaaaaaaaaaaaaa");
          },
          (error) => {
            console.err(error);
            setIsLoaded(true);
            setError(error);
          }
        );
      ranonce = true;
    }
  }, []);

  const styles = {
    card: {
      width: "18rem",
      margin: "1rem",
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
      height: "auto",
    },
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="home">
      {console.log(" emailState.value", authCtx.email)}
      {console.log(" enteredPassword", authCtx.enteredPassword)}
      {console.log(" hello", authCtx.hello)}
      <header>
        <h1>Home</h1>
      </header>
      <Container>
        <Row>
          {Movies.map((m) => {
            return (
              <Col sm={3} style={styles.card} key={m.id}>
                <Card>
                  <h3>{m.title}</h3>
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + m.poster_path}
                    alt={m.title}
                  />
                  <Link key={m.id} to={`/movie/${m.id}`}>
                    <Button size="lg">
                      <p>{m.title}</p>
                    </Button>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Home;

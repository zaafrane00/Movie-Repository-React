import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Movie() {
  const { id } = useParams();
  const [Movie, setMovie] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  let api = "https://api.themoviedb.org/";
  let API_key = "?api_key=1ff12ca4f16a9f0d5149fe1335118d27";
  let url = api + "3/movie/" + id + "" + API_key;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data) => {
          //  console.log(data);
          setMovie(data);
          setIsLoaded(true);
        },
        (error) => {
          console.err(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const minutesToHoures = (data) => {
    var totalMinutes = data;
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;
    return hours + "h " + minutes + "m";
  };

  // how to  Format Numbers as Thousands, Millions, or Billions?
  const convertNumber = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const commarize = (num) => {
    // Alter numbers larger than 1k
    if (num >= 1e3) {
      var units = ["k", "M", "B", "T"];
      // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
      let unit = Math.floor((num.toFixed(0).length - 1) / 3) * 3;
      // Calculate the remainder
      var num = (num / ("1e" + unit)).toFixed(2);
      var unitname = units[Math.floor(unit / 3) - 1];
      // output number remainder + unitname
      return num + unitname;
    }
  };
  var myCart = {
    movies: [],
  };

  const addToWatchedList = (data) => {
    if (JSON.parse(localStorage.getItem("myCart") === null)) {
      myCart.movies.push(data.id);
      localStorage.setItem("myCart", JSON.stringify(myCart));
    } else {
      console.log(myCart.movies.indexOf(data.id) < 0);
      console.log(typeof JSON.parse(localStorage.getItem("myCart")?.movies));

      if (myCart.movies.indexOf(data.id) < 0) {
        //    myCart.movies = JSON.parse(localStorage.getItem("myCart")?.movies);
        myCart.movies.push(...JSON.parse(localStorage.getItem("myCart")?.movies));

        myCart.movies.push(data.id);
        localStorage.clear();
        localStorage.setItem("myCart", JSON.stringify(myCart));
      }
    }
  };

  // useEffect(() => {
  //   myCart.movies = localStorage.getItem("myCart");
  //   console.log(myCart.movies);
  // }, []);

  const styles = {
    container: {
      backgroundColor: "#f1f1f1",
      padding: "10px",
      border: "1px solid grey",
      borderRadius: "5px",
    },
    table: {
      width: "100%",
      borderSpacing: "40px",
    },
  };

  return (
    <div>
      <br />
      <Container style={styles.container}>
        <Row>
          <Col style={{ textAlign: "left" }}>
            <small>{Movie?.release_date}</small>
            <h1>
              {Movie?.title} <p>{Movie?.tagline}</p>
            </h1>
            <Container fluid>
              <Row>
                {Movie != null && Movie.homepage != null && (
                  <Col sm={10}>
                    <a href={Movie?.homepage}>{Movie?.homepage}</a>
                  </Col>
                )}
                {Movie != null && Movie.imdb_id != null && (
                  <Col sm={2}>
                    <a href={`https://www.imdb.com/title/${Movie?.imdb_id}`}>IMDB</a>
                  </Col>
                )}
              </Row>
            </Container>
            <p>{Movie?.overview}</p>
            <p>
              <b>Vote Average :</b> {Movie?.vote_average}
            </p>
            <p>
              <b>Vote Count :</b> {commarize(Movie?.vote_count)}
            </p>
            <p>
              <b>Popularity</b>: {commarize(Movie?.popularity)}
            </p>
            <p>
              <b>Revenu</b> :{commarize(Movie?.revenue)}
            </p>
            <p>
              <b>Runtime</b> : {minutesToHoures(Movie?.runtime)}
            </p>
            <table>
              <tr>
                <b> Genre : </b>
                {Movie?.genres.map((genre) => {
                  return (
                    <>
                      <td key={genre.id}>{genre.name},</td>
                    </>
                  );
                })}
              </tr>
            </table>
            <table style={styles.table}>
              <tr>
                <td>
                  <b> Production Companies : </b>
                </td>
                <br />
                {Movie?.production_companies?.map((company) => {
                  return (
                    <td key={company.id}>
                      <img
                        width={"130px"}
                        src={"https://image.tmdb.org/t/p/w500" + company.logo_path}
                        alt=""
                      />
                    </td>
                  );
                })}
              </tr>
            </table>
            <br />
            <Button variant="primary" onClick={() => addToWatchedList(Movie)}>
              Add to Watched List
            </Button>{" "}
          </Col>
          <Col>
            <img
              src={"https://image.tmdb.org/t/p/w500" + Movie?.poster_path}
              alt=""
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Movie;

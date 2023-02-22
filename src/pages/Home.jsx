import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import NavBar from "../components/NavBar";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  //   console.log(BACKEND_URL);

  useEffect(() => {
    const getRestaurants = async () => {
      await axios
        .get(`${BACKEND_URL}/api/restaurants`)
        .then((response) => {
          setRestaurants(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
      //   setRestaurants(getRestaurants);
      //   console.log(restaurants);
    };
    getRestaurants();
  }, []);

  return (
    <>
      <NavBar />
      <section className="container">
        <h1>Restaurants</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Restaurant Name</th>
              <th>Restaurant Address</th>
            </tr>
          </thead>
          <tbody>
            {restaurants?.map((restaurant, i) => (
              <tr key={restaurant._id}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/restaurants/${restaurant._id}`}>
                    {restaurant.name}
                  </Link>
                </td>
                <td>
                  <Link to={`/restaurants/${restaurant._id}`}>
                    {restaurant.address}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default Home;

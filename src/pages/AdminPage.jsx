import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function AdminPage() {
  const [restaurants, setRestaurants] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    async function fetchRestaurants() {
      const response = await axios.get(`${BACKEND_URL}/api/restaurants/admin`);
      setRestaurants(response.data);
    }
    fetchRestaurants();
  }, []);
  //   console.log(restaurants);

  return (
    <>
      <NavBar />
      <section className="container">
        <h1>Admin Page</h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Restaurant Name</th>
              <th>Review Count</th>
            </tr>
          </thead>
          <tbody>
            {restaurants?.map((restaurant, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{restaurant.restaurant}</td>
                <td>{restaurant.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
}

export default AdminPage;

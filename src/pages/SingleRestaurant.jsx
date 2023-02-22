import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import NavBar from "../components/NavBar";
import sideImg from "../assets/restaurant.avif";
import FormReview from "../components/FormReview";

const SingleRestaurant = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchRestaurant() {
      await axios
        .get(`${BACKEND_URL}/api/restaurants/${id}`)
        .then((response) => {
          //   console.log(response);
          setRestaurant(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
    async function fetchReviews() {
      await axios
        .get(`${BACKEND_URL}/api/restaurants/reviews/${id}`)
        .then((response) => {
          //   console.log(response);
          setReviews(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
    fetchRestaurant();
    fetchReviews();
  }, [BACKEND_URL, id]);
  if (!restaurant) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col sm={8}>
            <h1>{restaurant?.name}</h1>
            <p>{restaurant?.address}</p>
            <p>{restaurant?.description}</p>
            <h2>Reviews</h2>
            <ul>
              {reviews?.map((review) => (
                <li key={review._id}>
                  <p>
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="tomato"
                      numberOfStars={5}
                      starDimension="24px"
                      name="rating"
                    />
                  </p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </Col>
          <Col sm={4}>
            <img
              src={sideImg}
              alt="restaurant"
              thumbnail="true"
              style={{ width: "100%" }}
            />
            <FormReview
              id={id}
              setReviews={setReviews}
              setAuthor={setAuthor}
              setRating={setRating}
              setComment={setComment}
              author={author}
              rating={rating}
              comment={comment}
              reviews={reviews}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SingleRestaurant;

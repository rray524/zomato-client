import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const FormReview = ({
  id,
  setReviews,
  setAuthor,
  setRating,
  setComment,
  author,
  rating,
  comment,
  reviews,
}) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(`${BACKEND_URL}/api/restaurants/reviews/${id}`, {
        author,
        rating,
        comment,
      })
      .then(async (response) => {
        if (response.status === 201) {
          setAuthor("");
          setRating(1);
          setComment("");
          const reviewsResponse = await axios.get(
            `${BACKEND_URL}/api/restaurants/reviews/${id}`
          );
          console.log(reviewsResponse);
          setReviews(reviewsResponse.data);
        }
        if (response.statusText === "OK") {
          toast.success("Review Created successfully");
        }
        console.log(response.data);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 mt-5" controlId="formAuthor">
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          value={author}
          name="author"
          placeholder="Enter Author Name"
          onChange={(event) => setAuthor(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRating">
        <Form.Label>Rating:</Form.Label>
        <Form.Select
          aria-label="Default select Select-form-data"
          value={rating}
          name="rating"
          onChange={(event) => setRating(event.target.value)}
        >
          <option>Open this select menu</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAuthor">
        <Form.Label>Comment:</Form.Label>
        <Form.Control
          as="textarea"
          style={{ height: "100px" }}
          value={comment}
          name="comment"
          placeholder="Enter Your Comment"
          onChange={(event) => setComment(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="info">
        Review it!
      </Button>
    </Form>
  );
};

export default FormReview;

import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react';

const Reviews = ({ getMovieData, movie, reviews = [], setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId, getMovieData]);

    useEffect(() => {
        // console.log('Movie:', movie); // Debug statement
        // console.log('Reviews:', reviews); // Debug statement
    }, [movie, reviews]);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
            const newReview = { body: rev.value };
            console.log('New review added:', response);
            setReviews(prevReviews => [...prevReviews, newReview]);
            rev.value = "";
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt={movie?.title} />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col><hr /></Col>
                    </Row>
                    {reviews.length > 0 ? (
                        reviews.map((r, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col><hr /></Col>
                                </Row>
                            </React.Fragment>
                        ))
                    ) : (
                        <Row>
                            <Col>No reviews available.</Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <Row>
                <Col><hr /></Col>
            </Row>
        </Container>
    );
}

export default Reviews;

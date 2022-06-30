import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");
    const handleGoBack = () => {
        history.push('/');
    }
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name, reviewText, rating
            });
            history.push("/")
            history.push(location.pathname)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='mb-2'>
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
                    </div>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="rating">Rating</label>
                    <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="custom-select">
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Rewiev</label>
                    <textarea id="Review" value={reviewText} onChange={(e) => setReviewText(e.target.value)} className='form-control'></textarea>
                </div>
                <div className='d-flex justify-content-between'>
                    <button type='submit' onClick={handleSubmitReview} className='btn btn-primary'>
                        Submit
                    </button>
                    <button type='submit' onClick={handleGoBack} className='btn btn-secondary'>
                        Go Back
                    </button>

                </div>
            </form>
        </div>
    );
}

export default AddReview;

import React, { useState,useEffect } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
const UpdateRestaurant = (props) => {
    const { id } = useParams();
    let history = useHistory();
    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [price_range,setPriceRange] = useState("");
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const updatedRestaurant = await RestaurantFinder.put(`${id}`,{name,location,price_range});
        history.push("/");
    }
    useEffect(() => {
      const fetchData = async()=>{
           const response = await RestaurantFinder.get(`${id}`)
            setName(response.data.data.restaurants.name);
            setLocation(response.data.data.restaurants.location);
            setPriceRange(response.data.data.restaurants.price_range);
           }
           fetchData();
    }, []);
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className='form-control' id='name' />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} className='form-control' id='location' />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={price_range} onChange={(e)=>setPriceRange(e.target.value)} type="number" className='form-control' id='price_range' />
                </div>
                <div>
                    <button onClick={handleSubmit} type="submit" className='btn btn-primary'> Submit</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateRestaurant;

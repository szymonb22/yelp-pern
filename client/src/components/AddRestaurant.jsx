import React,{useContext, useState} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
const AddRestaurant = () => {
    const{addRestaurants} = useContext(RestaurantsContext);
    const [name,setName]=useState("");
    const [location,setLocation]=useState("");
    const [price_range,setPriceRange]=useState("Price Range");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
       const response =  await RestaurantFinder.post("/",{name,location,price_range});
       addRestaurants(response.data.data.restaurants);
    } catch (error) {
            
        }
    }
    return (
        <div className="mb-4">
        <form action="">
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="form-control"
                placeholder="name"
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                type="text"
                placeholder="location"
              />
            </div>
            <div className="col">
              <select
                className="custom-select my-1 mr-sm-2"
                value={price_range}
                onChange={(e)=>setPriceRange(e.target.value)}
              >
                <option disabled>Price Range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary" onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
}

export default AddRestaurant;

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require('./db');
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

//get all
app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM restaurants left join (select restaurant_id,Count(*),Trunc(AVG(Rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id= reviews.restaurant_id ");
        console.log(results);
        res.status(200).json({
            status: "succes",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch (error) {
        console.log(error);
    }

});
//get by id
app.get("/api/v1/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const results = await db.query("SELECT * FROM restaurants left join (select restaurant_id,Count(*),Trunc(AVG(Rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id= reviews.restaurant_id  WHERE id=($1)", [id]);
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id=($1)", [id]);
        
        console.log(results);
        res.status(200).json({
            status: "succes",
            data: {
                restaurants: results.rows[0],
                reviews:reviews.rows
            }
        })
    } catch (error) {
        console.log(error);
    }
});
// create
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    const {name, location, price_range} = req.body;
    try {
        const results = await db.query("INSERT INTO  restaurants(name,location,price_range) VALUES($1,$2,$3) returning *", [name, location, price_range]);
        console.log(results);
        res.status(201).json({
            status: "succes",
            data: {
                restaurants: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error);
    }
});
//delete
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id=($1) ", [id]);
        console.log(results);
        res.status(204).json({
            status: "succes",
        })
    } catch (error) {
        console.log(error);
    }


});
// update
app.put("/api/v1/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const {name, location, price_range} = req.body;
    try {
        const results = await db.query("UPDATE restaurants SET name =($1),location=($2),price_range=($3)  WHERE id=($4) returning *", [name, location, price_range,id]);
        console.log(results);
        res.status(203).json({
            status: "succes",
            data: {
                restaurants: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error);
    }

});

//addrewiev
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    const restaurant_id = req.params.id;
    const {name, rating, reviewText} = req.body;
    try {
        const results = await db.query("INSERT INTO  reviews(name,rating,review,restaurant_id) VALUES($1,$2,$3,$4) returning *", [name, rating, reviewText,restaurant_id]);
        console.log(results);
        res.status(201).json({
            status: "succes",
            data: {
                reviews: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error);
    }
});


const port = process.env.PORT || 3001;
console.log(port);
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})
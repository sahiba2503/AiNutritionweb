

import { useState } from "react";
import "./AddFood.css";

function AddFood() {
  const [foodName, setFoodName] = useState("");
  const [load, setLoad] = useState(false);
  const [foodError, setFoodError] = useState("");

  const [nutritionData, setNutritionData] = useState([]);

  function UsersFoodAnalysis(e) {
    e.preventDefault();

    let food = foodName.trim();

    if (food) {
      setLoad(true);
      setFoodError("");

      fetch("http://localhost:3000/foodNutritions", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          food: food
        })
      })
        .then((res) => {
          return res.json();
        })

        .then((data) => {
          if (data.success) {

            let nutrition = {
              food: food,
              calorie: data.calorie,
              protein: data.protein,
              vitamin: data.vitamin
            };

            setNutritionData([...nutritionData, nutrition]);
          }
        })

        .catch((error) => {
          alert("Please try again. Something went wrong.");
          console.log(error);
        })

        .finally(() => {
          setLoad(false);
          setFoodName("");
        });
    } else {
      setFoodError("Please enter food name");
      setLoad(false);
    }
  }

  return (
    <div className="page">

      <h1 className="page-title">
        Add Food
      </h1>

      <p className="page-subtitle">
        Enter food details to get nutrition information.
      </p>


      <div className="add-food-grid">

        <div className="add-food-card">

          <p className="card-heading">
            📝 Add Food by Text
          </p>

          <label className="input-label">
            Enter the name of the food
          </label>

          <input
            type="text"
            placeholder="e.g.apple,banana,egg,cofee,tea,juice,water"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />

          <p>
            Food name should be lower case.
          </p>

          <button
            className="primary-btn"
            onClick={UsersFoodAnalysis}
            disabled={load}
          >
            {load ? "Loading..." : "Add food"}
          </button>

          {foodError && (
            <p className="food-error">
              {foodError}
            </p>
          )}

        </div>


        <div className="add-food-card photo-card">

          <p className="card-heading">
            📷 Add Food by Photo
          </p>

          <div className="upload-box">

            <p className="upload-icon">
              📷
            </p>

            <p>
              Click to upload a photo
            </p>

            <p className="upload-sub">
              or drag and drop
            </p>

          </div>

          <button className="primary-btn">
            Upload Image
          </button>

        </div>

      </div>


      <div className="nutrition-result">

        <p className="result-heading">
          Nutrition Information
        </p>


        {nutritionData.map((food, index) => (

          <div
            className="result-row"
            key={index}
          >

            <div className="result-icon">
              🥗
            </div>


            <div className="result-name">

              <p className="result-food-name">
                {food.food}
              </p>

              <p className="result-date">
                Nutrition details
              </p>

            </div>


            <div className="result-stats">

              <div>
                <span className="stat-val">
                  Calories: {food.calorie} kcal
                </span>
              </div>


              <div>
                <span className="stat-val">
                  Protein: {food.protein} g
                </span>
              </div>


              <div>
                <span className="stat-val">
                  Vitamins: {food.vitamin}
                </span>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

 export default AddFood;



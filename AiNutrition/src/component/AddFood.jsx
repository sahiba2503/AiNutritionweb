import { useState } from "react";
import "./AddFood.css";

// This calls our own Node.js/Express backend, which looks up
// nutrition info and sends it back as JSON.

function AddFood() {
  const [foodName, setFoodName] = useState("");
  const [load, setLoad] = useState(false);
  const [foodError, setFoodError] = useState("");
  const [calorie, setCalorie] = useState("");
  const [protein, setProtein] = useState("");
  const [vitamin, setVitamin] = useState("");

 
  function UsersFoodAnalysis(e) {
    e.preventDefault();
    let food = foodName.trim();

    if (food) {
      setLoad(true);
      setFoodError("");
       setProtein("");
            setVitamin("");
          
            console.log(load);
      fetch("http://localhost:3000/foodNutritions", {
        method: "POST",
      headers: {
  "Content-Type": "application/json"
},
        body: JSON.stringify({ food: foodName }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if(data.success){
              setCalorie(data.calorie);
          setProtein(data.protein);
            setVitamin(data.vitamin);
           
          }
         
        })
        .catch((error)=>{
          alert("plese try again someting wrong.");
          console.log(error);
        })
     
       .finally(() => {
  setLoad(false);
  setFoodName("");
});
    }
     else {
      setFoodError("please enter only food related data");
      setLoad(false);
      return;
    }
  }

  return (
    <div className='page'>
      <h1 className='page-title'>Add Food</h1>
      <p className='page-subtitle'>
        Enter food details to get nutrition information.
      </p>

      <div className='add-food-grid'>
        <div className='add-food-card'>
          <p className='card-heading'>📝 Add Food by Text</p>
          <label className='input-label'>Enter the name of the food</label>
          <input
            type='text'
            placeholder='e.g. apple, chicken, rice'
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <p>food name should be lower case.</p>
          <button className='primary-btn' onClick={UsersFoodAnalysis}>
            Add food
          </button>
          {foodError ? foodError : ""};
        </div>

        <div className='add-food-card photo-card'>
          <p className='card-heading'>📷 Add Food by Photo</p>
          <div className='upload-box'>
            <p className='upload-icon'>📷</p>
            <p>Click to upload a photo</p>
            <p className='upload-sub'>or drag and drop</p>
          </div>
          <button className='primary-btn'>Upload Image</button>
        </div>
      </div>

      <div className='nutrition-result'>
        <p className='result-heading'>Nutrition Information</p>
        <div className='result-row'>
          <div className='result-icon'>🥗</div>
          <div className='result-name'>
            <p className='result-food-name'>
              <span>(e.g. Apple)</span>
            </p>
            <p className='result-date'></p>
          </div>
          <div className='result-stats'>
            <div>
              <span className='stat-key'></span>
              <span className='stat-val'> Calories:{calorie?calorie:""}kcal</span>
            </div>
            <div>
              <span className='stat-key'></span>
              <span className='stat-val'>Protein:{protein?protein:""}g</span>
            </div>
            <div>
              <span className='stat-key'></span>
              <span className='stat-val'>vitamis:{vitamin?vitamin:""} g</span>
            </div>
            <div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFood;

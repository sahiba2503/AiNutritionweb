import { useState } from "react";
import "./Recommendation.css";

const FILTERS = [
  "For Better Health",
  "For More Energy",
  "For Weight Management",
  "For Strong Bones",
];

const FOODS = [
  {
    icon: "🥗",
    name: "Vegetable Salad",
    desc: "Rich in vitamins, minerals and fiber. Helps digestion and keeps you full for longer.",
    color: "#97c459",
  },
  {
    icon: "🍓",
    name: "Fresh Fruits",
    desc: "Provides natural vitamins, antioxidants and boosts your energy.",
    color: "#e24b4a",
  },
  {
    icon: "🥜",
    name: "Mixed Nuts",
    desc: "Good source of healthy fats, protein and minerals.",
    color: "#fac775",
  },
  {
    icon: "🍲",
    name: "Lentil Soup",
    desc: "High in protein and fiber. Supports heart health and digestion.",
    color: "#854f0b",
  },
];

function Recommendations() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  return (
    <div className='page'>
      <h1 className='page-title'>Food Recommendations</h1>
      <p className='page-subtitle'>
        Get healthy food suggestions based on your needs.
      </p>

      <div className='filter-row'>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={
              filter === activeFilter
                ? "filter-chip filter-chip-active"
                : "filter-chip"
            }
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className='food-list'>
        {FOODS.map((food) => (
          <div className='food-row' key={food.name}>
            <div className='food-icon' style={{ backgroundColor: food.color }}>
              {food.icon}
            </div>
            <div className='food-info'>
              <p className='food-name'>{food.name}</p>
              <p className='food-desc'>{food.desc}</p>
            </div>
            <button className='outline-btn'>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;

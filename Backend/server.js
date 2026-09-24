////second aproach using object//////
const express = require("express");
const cors = require("cors");
const { z } = require("zod");

const app = express();

app.use(express.json());
app.use(cors());

const foodData = [
  { name: "apple", calorie: 95, protein: 0.5, vitamin: 25 },
  { name: "banana", calorie: 105, protein: 1.3, vitamin: 27 },
  { name: "rice (1 cup, cooked)", calorie: 205, protein: 4.3, vitamin: 45 },
  { name: "Chicken", calorie: 165, protein: 31, vitamin: 0 },
  { name: "egg", calorie: 78, protein: 6.3, vitamin: 0.6 },
  { name: "cofee", calorie: 280, protein: 39, vitamin: 0 },
  { name: "tea", calorie: 55, protein: 3.7, vitamin: 11 },
  { name: "juice", calorie: 100, protein: 17, vitamin: 6 },
  { name: "oats", calorie: 158, protein: 6, vitamin: 27 },
  { name: "water", calorie: 230, protein: 18, vitamin: 40 },
];

let users = {
  name: "",
  email: "",
  password: "",
};

const foodSchema = z.object({
  food: z.string().min(1, "Food is required"),
});

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z ]+$/, "Name can contain only letters and spaces"),

  email: z
    .string()
    .min(1, "Email is required")
    .includes("@gmail.com", "Email must contain @gmail.com"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must not be more than 12 characters")
    .regex(/[A-Z]/, "Password must contain one capital letter")
    .regex(/[a-z]/, "Password must contain one small letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
});
//min(1,"food is require")//it should not be empty at least one character present.

app.post("/createAccount", (req, res) => {
  const result = createAccountSchema.safeParse(req.body);

  if (!result.success) {
    return res.json({
      success: false,
      message: result.error.issues[0].message,
    });
  }

  const { name, email, password } = result.data;

  if (!users.name || !users.email || !users.password) {
    users.name = name;
    users.email = email;
    users.password = password;

    return res.json({
      success: true,
      message: "Account created successfully",
    });
  }

  if (users.name === name || users.email === email) {
    return res.json({
      success: false,
      message: "User's account details are duplicate",
    });
  }

  return res.json({
    success: false,
    message: "We already have an account",
  });
});

app.post("/loginAccount", (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  const { email, password } = result.data;

  if (email === users.email && password === users.password) {
    res.json({
      success: true,
      message: "You logged in successfully",
    });
  } else if (email === users.email && password !== users.password) {
    res.json({
      success: false,
      message: "Enter correct password",
    });
  } else if (email !== users.email && password === users.password) {
    res.json({
      success: false,
      message: "Enter correct email",
    });
  } else {
    res.json({
      success: false,
      message:
        "Server could not match. Please enter correct email and password",
    });
  }
});
//

app.post("/loginAccount", (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  const { email, password } = result.data;

  if (email === users.email && password === users.password) {
    res.json({
      success: true,
      message: "You logged in successfully",
    });
  } else if (email === users.email && password !== users.password) {
    res.json({
      success: false,
      message: "Enter correct password",
    });
  } else if (email !== users.email && password === users.password) {
    res.json({
      success: false,
      message: "Enter correct email",
    });
  } else {
    res.json({
      success: false,
      message:
        "Server could not match. Please enter correct email and password",
    });
  }
});
//

app.post("/changePass", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    if (email === users.email) {
      users.password = password;

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Email not found. Please enter correct email",
      });
    }
  } else {
    res.json({
      success: false,
      message: "Server did not get email and password",
    });
  }
});
app.get("/usersInfor", (req, res) => {
  if (users.name !== "" && users.email !== "" && users.password !== "") {
    res.json({
      name: users.name,
      email: users.email,
      password: users.password,
      success: true,
      message: "User has account.",
    });
  } else {
    res.json({
      success: false,
      message: "User has no account.",
    });
  }
});

app.get("/usersName", (req, res) => {
  if (users.name !== "") {
    res.json({
      name: users.name,
      success: true,
      message: "User has account.",
    });
  } else {
    res.json({
      success: false,
      message: "User has no account.",
    });
  }
});

app.post("/foodNutritions", (req, res) => {
  //“safeParse-Is data ko safely check karo aur batao ki data correct hai ya nahi.”
  let result = foodSchema.safeParse(req.body);

  //zod can be return like this data
  //{
  //success: true,
  //data: {
  //food: "Apple"
  //}
  //}

  //success Zod automatically gives it to you when you use safeParse(). You do not create success yourself.
  if (!result.success) {
    return res.json({
      success: false,
      message: "Invalid request format",
    });
  }

  let Food = result.data.food;
  let foodNut = foodData.find((value) => {
    return value.name === Food;
  });

  if (foodNut) {
    res.json({
      success: true,
      calorie: foodNut.calorie,
      protein: foodNut.protein,
      vitamin: foodNut.vitamin,
    });
  } else {
    res.json({
      success: false,
      message: "Food not found",
    });
  }
});

app.listen(3000, () => {
  console.log("server is running on 3000 port");
});

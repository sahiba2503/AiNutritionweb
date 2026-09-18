//using array

const express = require("express"); //helps me
const cors = require("cors"); //allows to my

//app is used to create routes and handle requests and responses.”
const app = express();

app.use(express.json());

app.use(cors());
let users = [];

//“I created a GET API endpoint called /usersInfor.
app.get("/usersInfor", (req, res) => {
   if ((users[0] !== "" && users[1] !== "" && users[2] !== "")) {
    res.json({
      name:users[0],
      email:users[1],
      password:users[2],
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

app.post("/createAccount", (req, res) => {
  if (req.body.name && req.body.email && req.body.password) {
    //object destructuring
    const { name, email, password } = req.body;
    if (!users[0] || !users[1] || !users[2]) {
      users[0] = name;
      users[1] = email;
      users[2] = password;

      res.json({
        success: true,
        message: "Account created successfully",
      });
    }
    if (users[0] === name || users[1] === email || users[2] === password) {
      res.json({
        success: false,
        message: " user's has already account",
      });
    } else {
      res.json({
        success: false,
        message:
          "we have already account ,only one user's account can be created ",
      });
    }
  } else {
    res.json({
      success: false,
      message: "server does not get name ,email and password successfully",
    });
  }
});

app.post("/loginAccount", (req, res) => {

  if (req.body.email && req.body.password) {
    const { email, password } = req.body;
    if (email === users[1] && password === users[2]) {
      res.json({
        success: true,
        message: "you loged in successfully",
      });
    } else if (email === users[1] && password !== users[2]) {
      res.json({
        success: false,
        message: "enter correct password",
      });
    } else if (email !== users[1] && password === users[2]) {
      res.json({
        success: false,
        message: "enter correct email",
      });
    } else {
      res.json({
        success: false,
        message:
          "server could not match. plese enter correct email and password",
      });
    }
  } else {
    res.json({
      success: false,
      message: "server did not get emil and password ",
    });
  }
});

app.post("/changePassword", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    if (email === users[1]) {
      users[2] = password;

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

app.get("/usersName", (req, res) => {
  if (users.length > 0) {
    res.json({
      name: users[0],
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

app.listen(3000, () => {
  console.log("server is running on 3000 port");
});
//send a error message through success
//using object.
/////////////////////////////////////////////////////////////////////
// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(express.json());
// app.use(cors());
// let users = {
//   name: "",
//   email: "",
//   password: "",
// };

// app.post("/createAccount", (req, res) => {
//   if (req.body.name && req.body.email && req.body.password) {
//     //object destructuring
//     const { name, email, password } = req.body;
//     if (!users.name || !users.email || !users.password) {
//       users.name = name;
//       users.email = email;
//       users.password = password;

//       res.json({
//         success: true,
//         message: "Account created successfully",
//       });
//     }
//     if (
//       users.name === name ||
//       users.email === email ||
//       users.password === password
//     ) {
//       res.json({
//         success: false,
//         message: " user's account's detail is dublicate ",
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "we have already account ,",
//       });
//     }
//   } else {
//     res.json({
//       success: false,
//       message: "server does not get name ,email and password successfully",
//     });
//   }
// });

// app.post("/loginAccount", (req, res) => {
//   //data come in string .
//   if (req.body.email && req.body.password) {
//     const { email, password } = req.body;
//     if (email === users.email && password === users.password) {
//       res.json({
//         success: true,
//         message: "you loged in successfully",
//       });
//     } else if (email === users.email && password !== users.password) {
//       res.json({
//         success: false,
//         message: "enter correct password",
//       });
//     } else if (email !== users.email && password === users.email) {
//       res.json({
//         success: false,
//         message: "enter correct email",
//       });
//     } else {
//       res.json({
//         success: false,
//         message:
//           "server could not match. plese enter correct email and password",
//       });
//     }
//   } else {
//     res.json({
//       success: false,
//       message: "server did not get emil and password ",
//     });
//   }
// });

// app.post("/changePass", (req, res) => {
//   const { email, password } = req.body;

//   if (email && password) {
//     if (email === users.email) {
//       users.password = password;

//       res.json({
//         success: true,
//         message: "Password changed successfully",
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "Email not found. Please enter correct email",
//       });
//     }
//   } else {
//     res.json({
//       success: false,
//       message: "Server did not get email and password",
//     });
//   }
// });
// app.get("/usersInfor", (req, res) => {
//   if (users.name !== "" && users.email !== "" && users.password !== "") {
//     res.json({
//       name:users.name,
//       email:users.email,
//       password:users.password,
//       success: true,
//       message: "User has account.",
//     });
//   } else {
//     res.json({
//       success: false,
//       message: "User has no account.",
//     });
//   }
// });

// app.get("/usersName", (req, res) => {
//   if (users.name !== "") {
//     res.json({
//       name: users.name,
//       success: true,
//       message: "User has account.",
//     });
//   } else {
//     res.json({
//       success: false,
//       message: "User has no account.",
//     });
//   }
//  });

// app.listen(3000, () => {
//   console.log("server is running on 3000 port");
// });


////data base
// Simple in-memory "database" of foods and their nutrition values.
// In a real final year project you could later replace this with
// MongoDB, MySQL, or a real nutrition API.
// const foodData = {
//   apple: { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
//   banana: { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
//   rice: { name: "Rice (1 cup, cooked)", calories: 205, protein: 4.3, carbs: 45, fat: 0.4 },
//   chicken: { name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
//   egg: { name: "Boiled Egg", calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
//   salmon: { name: "Grilled Salmon", calories: 280, protein: 39, carbs: 0, fat: 13 },
//   broccoli: { name: "Broccoli (1 cup)", calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
//   yogurt: { name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0.7 },
//   oats: { name: "Oats (1 cup, cooked)", calories: 158, protein: 6, carbs: 27, fat: 3.2 },
//   lentils: { name: "Lentil Soup (1 bowl)", calories: 230, protein: 18, carbs: 40, fat: 1 },
// };

// module.exports = foodData;

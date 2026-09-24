//using array

// const express = require("express"); //helps me
// const cors = require("cors"); //allows to my

// //app is used to create routes and handle requests and responses.”
// const app = express();

// app.use(express.json());

// app.use(cors());
// let users = [];

// //“I created a GET API endpoint called /usersInfor.
// app.get("/usersInfor", (req, res) => {
//    if ((users[0] !== "" && users[1] !== "" && users[2] !== "")) {
//     res.json({
//       name:users[0],
//       email:users[1],
//       password:users[2],
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

// app.post("/createAccount", (req, res) => {
//   if (req.body.name && req.body.email && req.body.password) {
//     //object destructuring
//     const { name, email, password } = req.body;
//     if (!users[0] || !users[1] || !users[2]) {
//       users[0] = name;
//       users[1] = email;
//       users[2] = password;

//       res.json({
//         success: true,
//         message: "Account created successfully",
//       });
//     }
//     if (users[0] === name || users[1] === email || users[2] === password) {
//       res.json({
//         success: false,
//         message: " user's has already account",
//       });
//     } else {
//       res.json({
//         success: false,
//         message:
//           "we have already account ,only one user's account can be created ",
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

//   if (req.body.email && req.body.password) {
//     const { email, password } = req.body;
//     if (email === users[1] && password === users[2]) {
//       res.json({
//         success: true,
//         message: "you loged in successfully",
//       });
//     } else if (email === users[1] && password !== users[2]) {
//       res.json({
//         success: false,
//         message: "enter correct password",
//       });
//     } else if (email !== users[1] && password === users[2]) {
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

// app.post("/changePassword", (req, res) => {
//   const { email, password } = req.body;

//   if (email && password) {
//     if (email === users[1]) {
//       users[2] = password;

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

// app.get("/usersName", (req, res) => {
//   if (users.length > 0) {
//     res.json({
//       name: users[0],
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

// app.listen(3000, () => {
//   console.log("server is running on 3000 port");
// });
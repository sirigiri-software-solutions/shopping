// import React, { useEffect, useState } from "react";
// import icon from "./Images/icon.png";
// import { useNavigate } from "react-router-dom";
// import "./App.css";
// import { ref, get, push } from "firebase/database";
// import { database } from "./Firebase";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Home = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showsignupPassword, setShowsignupPassword] = useState(false);

//   const [signupData, setSignupData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     password: "",
//   });
//   const [signinData, setSigninData] = useState({
//     username: "",
//     password: "",
//   });
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const handleSignUp = () => {
//     setShowPopup(false);

//     // Proceed with sign up process
//     const signupRef = ref(database, `signupdata`);
//     const userData = {
//       ...signupData,
//       category: document.getElementById("category").value, // Get the selected category from the dropdown
//     };

//     push(signupRef, { signupData: userData }) // Push the updated signup data to Firebase
//       .then(() => {
//         toast.success("Sign up successful!", {
//           position: "bottom-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       })
//       .catch((error) => {
//         console.log("Error while adding to firebase", error);
//       });
//   };

//   // useEffect(() => {
//   //   const userLogginedIn = localStorage.getItem("username");
//   //   if (userLogginedIn) {
//   //     return navigate("/vendor")

//   //   } else {
//   //     navigate("/");
//   //   }
//   // });

//   const handleSignIn = () => {
//     const { username, password } = signinData;

//     const userRef = ref(database, "signupdata");
//     if (!username || !password) {
//       // Show fill details toast
//       toast.error("Please fill in both username and password", {
//         position: "bottom-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });

//       return; // Exit the function early if details are not filled
//     }

//     // Retrieve user data from Firebase
//     get(userRef)
//       .then((snapshot) => {
//         const userData = snapshot.val();

//         // Find the user with matching username
//         const user = Object.values(userData).find(
//           (user) => user.signupData && user.signupData.username === username
//         );
//         if (user) {
//           const singleUserData = user.signupData;

//           localStorage.setItem("username", signinData.username);
//           if (singleUserData.username === username) {
//             if (singleUserData.password === password) {
//               // If both username and password match, show success toast
//               toast.success("You are logged in successfully.", {
//                 position: "bottom-right",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });

//               // Redirect to the appropriate page based on category
//               // if (singleUserData.category === "vendor") {
//                 navigate("/vendor"); // Redirect to vendor page
//               // } else if (singleUserData.category === "customer") {
//                 // navigate("/customer"); // Redirect to customer page
//               // }
//             } else {
//               // If username matches but password is incorrect, show password incorrect toast
//               toast.error("Password incorrect", {
//                 position: "bottom-right",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//             }
//           } else {
//             // If username does not match, show invalid user toast
//             toast.error("Invalid user", {
//               position: "bottom-right",
//               autoClose: 2000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//           }
//         } else {
//           // If user with the given username does not exist, show username not found toast
//           toast.error("Username not found", {
//             position: "bottom-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   };

//   const handleSigninChange = (e) => {
//     const { name, value } = e.target;
//     setSigninData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSignUpClick = () => {
//     setShowPopup(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <div className="background">
//         <div className="left-side">
//           <img src={icon} alt="" height="350px" width="450px" />
//         </div>

//         <div className="right-side">
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               className="input1"
//               name="username"
//               onChange={handleSigninChange}
//             ></input>
//           </div>
//           <div>
//             <input
//               type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
//               placeholder="Password"
//               className="input2"
//               name="password"
//               autoComplete="current-password"
//               onChange={handleSigninChange}
//             ></input>
//           </div>

//           <div className="right-content">
//             <div className="check-box">
//               <input
//                 type="checkbox"
//                 className="checkbox-input"
//                 value={showPassword}
//                 onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
//               ></input>
//               <label htmlFor="checkbox" className="checkbox-label">
//                 Show Password
//               </label>
//               <div className="forgot-password">
//                 <p>Forgotten Password?</p>
//               </div>
//             </div>
//           </div>
//           <div className="line">
//             <hr />
//           </div>

//           <div className="button-layout">
//             <button
//               className="button"
//               onClick={() => {
//                 handleSignIn(); // Call handleSignIn function when the button is clicked
//               }}
//               style={{ textDecoration: "none" }}
//             >
//               Sign In
//             </button>
//           </div>
//           <div className="account">
//             <p>Do you have an account? </p>
//             <div>
//               <p className="account-para" onClick={handleSignUpClick}>
//                 Sign Up
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showPopup && (
//         <div>
//           <div className="overlay">
//             <div className="popup">
//               <div className="top-dashboard">
//                 <div>
//                   <p className="top">Sign Up</p>
//                 </div>
//                 <div className="button-div">
//                   <button
//                     className="top-button"
//                     onClick={() => setShowPopup(false)}
//                   >
//                     X
//                   </button>
//                 </div>
//               </div>

//               <div className="bottomContainer">
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   className="input-names"
//                   name="firstName"
//                   onChange={handleChange}
//                 ></input>
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   className="input-names"
//                   name="lastName"
//                   onChange={handleChange}
//                 ></input>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     className="input-username"
//                     name="username"
//                     onChange={handleChange}
//                   ></input>
//                 </div>
//                 <div>
//                   <input
//                     type={showsignupPassword ? "text" : "password"}
//                     placeholder="password"
//                     className="input-username"
//                     name="password"
//                     onChange={handleChange}
//                   ></input>
//                 </div>
//                 <div className="checkbox-row">
//                   <input
//                     className="popup-checkbox"
//                     type="checkbox"
//                     onChange={() => setShowsignupPassword(!showsignupPassword)}
//                   ></input>
//                   <p>Show Password</p>
//                 </div>
//                 {/* <div className="category-dropdown">
//                   <label htmlFor="category">Select Category:</label>
//                   <select id="category" className="dropdown-input">
//                     <option value="" disabled selected>
//                       Select
//                     </option>
//                     <option value="vendor">Vendor</option>
//                     <option value="customer">Customer</option>
//                   </select>
//                 </div> */}

//                 <div className="date-row">
//                 <label className="date-label">Date of Birth:</label>
//                   <input
//                     type="date"
//                     placeholder="Date of Birth"
//                     className="input-username-date"
//                     name="date"
//                     onChange={handleChange}
//                   ></input>
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Occupation"
//                     className="input-names"
//                     name="occupation"
//                     onChange={handleChange}
//                   ></input>
//                   <input
//                     type="text"
//                     placeholder="Education"
//                     className="input-names"
//                     name="education"
//                     onChange={handleChange}
//                   ></input>
//                 </div>
//                 <div className="button-layout1">
//                   <button className="button1" onClick={handleSignUp}>
//                     Sign Up
//                   </button>
//                 </div>
//                 <div className="account-ending">
//                   <div>
//                     <p className="para">Already have an account ?</p>
//                   </div>
//                   <div className="para1" onClick={() => setShowPopup(false)}>
//                     Sign In
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import img from './Images/img5.png'
import { useNavigate } from "react-router-dom";
import "./App.css";
import { ref, get, push } from "firebase/database";
import { database } from "./Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showsignupPassword, setShowsignupPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignUp = () => {
    setShowPopup(false);

    // Proceed with sign up process
    const signupRef = ref(database, `signupdata`);
    const userData = { ...signupData };

    push(signupRef, { signupData: userData }) // Push the updated signup data to Firebase
      .then(() => {
        toast.success("Sign up successful!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log("Error while adding to firebase", error);
      });
  };

  // useEffect(() => {
  //   const userLogginedIn = localStorage.getItem("username");
  //   if (userLogginedIn) {
  //     return navigate("/vendor")

  //   } else {
  //     navigate("/");
  //   }
  // });

  const handleSignIn = () => {
    const { username, password } = signinData;

    const userRef = ref(database, "signupdata");
    if (!username || !password) {
      // Show fill details toast
      toast.error("Please fill in both username and password", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return; // Exit the function early if details are not filled
    }

    // Retrieve user data from Firebase
    get(userRef)
      .then((snapshot) => {
        const userData = snapshot.val();

        // Find the user with matching username
        const user = Object.values(userData).find(
          (user) => user.signupData && user.signupData.username === username
        );
        if (user) {
          const singleUserData = user.signupData;

          localStorage.setItem("username", signinData.username);
          if (singleUserData.username === username) {
            if (singleUserData.password === password) {
              // If both username and password match, show success toast
              toast.success("You are logged in successfully.", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              // Redirect to the appropriate page based on category
              // if (singleUserData.category === "vendor") {
              navigate("/vendor"); // Redirect to vendor page
              // } else if (singleUserData.category === "customer") {
              // navigate("/customer"); // Redirect to customer page
              // }
            } else {
              // If username matches but password is incorrect, show password incorrect toast
              toast.error("Password incorrect", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            // If username does not match, show invalid user toast
            toast.error("Invalid user", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          // If user with the given username does not exist, show username not found toast
          toast.error("Username not found", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleSigninChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpClick = () => {
    setShowPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="background">
        <div className="left-side">
          <img
            src={img}
            alt=""
            height="680px"
            width="1500px"
          />

          <div className="right-side">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="input1"
                name="username"
                onChange={handleSigninChange}
              ></input>
            </div>
            <div>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                placeholder="Password"
                className="input2"
                name="password"
                autoComplete="current-password"
                onChange={handleSigninChange}
              ></input>
            </div>

            <div className="right-content">
              <div className="check-box">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  value={showPassword}
                  onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
                ></input>
                <label htmlFor="checkbox" className="checkbox-label">
                  Show Password
                </label>
                <div className="forgot-password">
                  <p>Forgotten Password?</p>
                </div>
              </div>
            </div>
            <div className="line">
              <hr className="custom-line" />
            </div>

            <div className="button-layout">
              <button
                className="button"
                onClick={() => {
                  handleSignIn(); // Call handleSignIn function when the button is clicked
                }}
                style={{ textDecoration: "none" }}
              >
                Sign In
              </button>
            </div>
            <div className="account">
              <p>Do you have an account? </p>
              <div>
                <p className="account-para" onClick={handleSignUpClick}>
                  Sign Up
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div>
          <div className="overlay">
            <div className="popup">
              <div className="top-dashboard">
                <div>
                  <p className="top">Sign Up</p>
                </div>
                <div className="button-div">
                  <button
                    className="top-button"
                    onClick={() => setShowPopup(false)}
                  >
                    X
                  </button>
                </div>
              </div>

              <div className="bottomContainer">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-names"
                  name="firstName"
                  onChange={handleChange}
                ></input>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-names"
                  name="lastName"
                  onChange={handleChange}
                ></input>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input-username"
                    name="username"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <input
                    type={showsignupPassword ? "text" : "password"}
                    placeholder="password"
                    className="input-username"
                    name="password"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="checkbox-row">
                  <input
                    className="popup-checkbox"
                    type="checkbox"
                    onChange={() => setShowsignupPassword(!showsignupPassword)}
                  ></input>
                  <p>Show Password</p>
                </div>
                {/* <div className="category-dropdown">
                  <label htmlFor="category">Select Category:</label>
                  <select id="category" className="dropdown-input">
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="vendor">Vendor</option>
                    <option value="customer">Customer</option>
                  </select>
                </div> */}

                <div className="date-row">
                  <label className="date-label">Date of Birth:</label>
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    className="input-username-date"
                    name="date"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Occupation"
                    className="input-names"
                    name="occupation"
                    onChange={handleChange}
                  ></input>
                  <input
                    type="text"
                    placeholder="Education"
                    className="input-names"
                    name="education"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="button-layout1">
                  <button className="button1" onClick={handleSignUp}>
                    Sign Up
                  </button>
                </div>
                <div className="account-ending">
                  <div>
                    <p className="para">Already have an account ?</p>
                  </div>
                  <div className="para1" onClick={() => setShowPopup(false)}>
                    Sign In
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

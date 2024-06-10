// import React, { useState, useEffect } from "react";
// import "./Vendor.css";
// import "./Customer.css";
// import "./App";
// import axios from "axios";
// import { getDatabase, push, ref, onValue } from "firebase/database";
// import { database } from "./Firebase";

// const AddProductPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
//   const initialFormData = {
//     Upload_Image: null,
//     ProductName: "",
//     Price: "",
//     Category: "",
//     Quantity: "",
//     Selection: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [categories, setCategories] = useState([
//     "Electronics",
//     "Toys",
//     "Furniture",
//     "Clothing",
//   ]); // Add your categories here

//   useEffect(() => {
//     // Set initial form data when the popup opens for editing
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);




//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "Upload_Image" && files && files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData({
//           ...formData,
//           [name]: reader.result, // Set the result of FileReader as the image data
//         });
//       };
//       reader.readAsDataURL(files[0]); // Read the contents of the image file
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };




//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
    
//     // Check if any required field is empty
//     const requiredFields = ["ProductName", "Price", "Category", "Quantity"];
//     const isAnyFieldEmpty = requiredFields.some(field => !formData[field]);
    
//     if (isAnyFieldEmpty) {
//       alert("Please fill out all required fields.");
//       return; // Prevent form submission if any required field is empty
//     }
    
//     // Submit the form if all required fields are filled out
//     onSubmit(formData);
//     onClose();
  




//     const productRef = ref(database, `vendorProducts`);
//     push(productRef, { formData })
//       .then(() => {
//         // Reset form data to initial state after successful submission
//         setFormData(initialFormData);
//       })
//       .catch((error) => {
//         console.log("Error while adding to firebase", error);
//       });
//   };
  


  
//   return (
//     isOpen && (
//       <div className="popup">
//         <form >
//           <div className="popup-dashboard">
//             <p className="popup-top">Add products</p>
//             <button className="popup-top-button" onClick={onClose}>
//               X
//             </button>
//           </div>
//           <div className="bottom-popup">
//             <div className="row-row">
//               <label className="item-data">Upload Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 name="Upload_Image"
//                 onChange={handleChange}
//                 className="input-itemdata"
//               />
//             </div>
//             <div className="row-row">
//               <label className="item-data">Category</label>
//               <select
//                 name="Category"
//                 value={formData["Category"]}
//                 onChange={handleChange}
//                 className="input-itemdata"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((category, index) => (
//                   <option key={index} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* Render other input fields */}
//             {Object.keys(formData)
//               .filter(
//                 (key) =>
//                   key !== "Selection" &&
//                   key !== "Upload_Image" &&
//                   key !== "Category" &&
//                   key !== "id" // Exclude id field
//               )
//               .map((key, index) => (
//                 <div key={index} className="row-row">
//                   <label className="item-data">{key}</label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     className="input-itemdata"
//                   />
//                 </div>
//               ))}
//             <button type="submit" className="upload" onClick={handleSubmit}> {/* Submit button */}
//               Upload
//             </button>
//           </div>
//         </form> 
//       </div>
//     )
//   );
// };

// export default AddProductPopup;


// working code
// import React, { useState, useEffect } from "react";
// import "./Vendor.css";
// import "./Customer.css";
// import "./App";
// import axios from "axios";

// const AddProductPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
//   const initialFormData = {
//     Upload_Image: null,
//     ProductName: "",
//     Price: "",
//     Category: "",
//     Quantity: "",
//     Selection: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [categories, setCategories] = useState([
//     "Electronics",
//     "Toys",
//     "Furniture",
//     "Clothing",
//   ]); // Add your categories here

//   useEffect(() => {
//     // Set initial form data when the popup opens for editing
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "Upload_Image" && files && files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData({
//           ...formData,
//           [name]: reader.result, // Set the result of FileReader as the image data
//         });
//       };
//       reader.readAsDataURL(files[0]); // Read the contents of the image file
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//     onClose();
//   };

//   return (
//     isOpen && (
//       <div className="popup">
//         <div className="popup-dashboard">
//           <p className="popup-top">Add products</p>
//           <button className="popup-top-button" onClick={onClose}>
//             X
//           </button>
//         </div>
//         <div className="bottom-popup">
//           <div className="row-row">
//             <label className="item-data">Upload Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               name="Upload_Image"
//               onChange={handleChange}
//               className="input-itemdata"
//             />
//           </div>
//           <div className="row-row">
//             <label className="item-data">Category</label>
//             <select
//               name="Category"
//               value={formData["Category"]}
//               onChange={handleChange}
//               className="input-itemdata"
//             >
//               <option value="">Select Category</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Render other input fields */}
//           {Object.keys(formData)
//             .filter(
//               (key) =>
//                 key !== "Selection" &&
//                 key !== "Upload_Image" &&
//                 key !== "Category"
//             )
//             .map((key, index) => (
//               <div key={index} className="row-row">
//                 <label className="item-data">{key}</label>
//                 <input
//                   type="text"
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   className="input-itemdata"
//                 />
//               </div>
//             ))}
//           <button className="upload" onClick={handleSubmit}>
//             Upload
//           </button>
//         </div>
//       </div>
//     )
//   );
// };

// export default AddProductPopup;

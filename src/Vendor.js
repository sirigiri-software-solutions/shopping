// import React, { useState, useEffect } from "react";
// import { ref, onValue, remove, set, push } from "firebase/database";
// import { database } from "./Firebase";
// import { useNavigate } from "react-router-dom";
// import "./Vendor.css";
// import "./Customer.css";
// import Customer from "./Customer";

// const Vendor = () => {
//   const columns = [
//     "S.no",
//     "Upload Image",
//     "ProductName",
//     "Price",
//     "Category",
//     "Quantity",
//   ];

//   const initialFormData = {
//     Upload_Image: null,
//     ProductName: "",
//     Price: "",
//     Category: "",
//     Quantity: "",
//   };

//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [selectedRowId, setSelectedRowId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [formData, setFormData] = useState(initialFormData);
//   const [categories, setCategories] = useState([
//     "Electronics",
//     "Toys",
//     "Furniture",
//     "Clothing",
//   ]); // Add your categories here
//   const navigate = useNavigate();

//   useEffect(() => {
//     const productsRef = ref(database, "vendorProducts");
//     onValue(productsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.keys(data)
//           .map((key) => {
//             const formData = data[key]?.formData;
//             if (formData) {
//               return {
//                 id: key,
//                 ...formData,
//               };
//             }
//             return null; // or handle this case accordingly
//           })
//           .filter(Boolean); // Remove any null entries

//         setTableData(dataArray); // Set the fetched data to tableData state
//       }
//     });
//   }, []);

//   // useEffect(() => {
//   //   const isLogginedUser = localStorage.getItem("username");
//   //   console.log(isLogginedUser, "userInfo");
//   //   if (isLogginedUser === null) {
//   //     navigate("/");
//   //   }
//   // }, [navigate]);

//   const handleOpenPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedRowId(null);
//     setFormData(initialFormData);
//   };

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

//   const handleSubmitProduct = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     // Check if any required field is empty
//     const requiredFields = ["ProductName", "Price", "Category", "Quantity"];
//     const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

//     if (isAnyFieldEmpty) {
//       alert("Please fill out all required fields.");
//       return; // Prevent form submission if any required field is empty
//     }

//     if (selectedRowId !== null) {
//       // Editing an existing row
//       const updatedTableData = tableData.map((row) =>
//         row.id === selectedRowId ? { ...formData, id: selectedRowId } : row
//       );

//       // Update the data for the selected row in Firebase
//       const productRef = ref(
//         database,
//         `vendorProducts/${selectedRowId}/formData`
//       );
//       set(productRef, formData)
//         .then(() => {
//           console.log("Row updated successfully in Firebase");
//         })
//         .catch((error) => {
//           console.log("Error updating row in Firebase:", error);
//         });

//       // Update the table data after editing the row
//       setTableData(updatedTableData);
//     } else {
//       // Adding a new row
//       const productRef = ref(database, "vendorProducts");
//       push(productRef, { formData })
//         .then(() => {
//           console.log("New data added successfully to Firebase");
//           // Refresh table data after adding new product
//           const productsRef = ref(database, "vendorProducts");
//           onValue(productsRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//               const dataArray = Object.keys(data)
//                 .map((key) => {
//                   const formData = data[key]?.formData;
//                   if (formData) {
//                     return {
//                       id: key,
//                       ...formData,
//                     };
//                   }
//                   return null; // or handle this case accordingly
//                 })
//                 .filter(Boolean); // Remove any null entries

//               setTableData(dataArray); // Set the fetched data to tableData state
//             }
//           });
//         })
//         .catch((error) => {
//           console.log("Error adding new data to Firebase:", error);
//         });
//     }

//     handleClosePopup();
//   };

//   const handleEdit = (id) => {
//     setSelectedRowId(id);
//     const rowData = tableData.find((row) => row.id === id);
//     setFormData(rowData);
//     setIsPopupOpen(true);
//   };

//   const handleDelete = (id) => {
//     console.log("Deleting row with ID:", id);
//     const updatedTableData = tableData.filter((row) => row.id !== id);
//     setTableData(updatedTableData);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handlelogout = () => {
//     // const isuserLoggedIn = localStorage.getItem("username");
//     // if (isuserLoggedIn) {
//     //   localStorage.removeItem("username");
//     navigate("/");
//     // }
//   };

//   const filteredTableData = tableData.filter((row) =>
//     Object.values(row).some((value) => {
//       if (value === null || value === undefined) {
//         return false; // Exclude null and undefined values from the search
//       }
//       const lowerCaseValue = value.toString().toLowerCase();
//       const lowerCaseSearchQuery = searchQuery.toLowerCase();
//       return lowerCaseValue.includes(lowerCaseSearchQuery);
//     })
//   );

//   const sendDataToButton = (data) => {
//     console.log(data, "customerBtn");
//     if (selectedRowId !== null) {
//       // Update existing data in the Firebase database for edit action
//       const productRef = ref(
//         database,
//         `vendorProducts/${selectedRowId}/formData`
//       );
//       set(productRef, data)
//         .then(() => {
//           console.log("Data updated successfully in Firebase");
//         })
//         .catch((error) => {
//           console.log("Error updating data in Firebase:", error);
//         });
//     } else {
//       // Add new data to the Firebase database for add action
//       // Add new data to the Firebase database for add action
//       const productRef = ref(database, "products");

//       push(productRef, data)
//         .then(() => {
//           console.log("New data added successfully to Firebase");
//         })
//         .catch((error) => {
//           console.log("Error adding new data to Firebase:", error);
//         });
//     }
//   };
//   // const sendDataToButton = (data) => {
//   //   // Redirect to the Customer page and pass the data as props
//   //   navigate("/customer", { state: { tableData: data } });
//   // };

//   return (
//     <div className="main-bg">
//       <div className="dashboard">
//         <div>
//           <img
//             src={require("./Images/icon.png")}
//             alt=""
//             height="80px"
//             width="80px"
//             className="image"
//           />
//         </div>
//         <div>
//           <p onClick={handleOpenPopup}>+ Add products</p>
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Search for items...."
//             className="input-items"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div>
//         <div>
//           {" "}
//           <button className="logout-button" onClick={handlelogout}>
//             LogOut
//           </button>
//         </div>
//       </div>
//       <div>
//         <div className="content">
//           <table className="table">
//             <thead>
//               <tr>
//                 {columns.map((column, index) => (
//                   <th key={index}>{column}</th>
//                 ))}
//                 <th>Selection</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTableData.map((row, index) => (
//                 <tr key={row && row.id} className="table-body">
//                   <td>{index + 1}</td>
//                   <td>
//                     <img
//                       src={row.Upload_Image}
//                       alt="Product"
//                       height="50"
//                       width="50"
//                     />
//                   </td>
//                   <td>{row && row.ProductName}</td>
//                   <td>{row && row.Price}</td>
//                   <td>{row && row.Category}</td>
//                   <td>{row && row.Quantity}</td>
//                   <td>
//                     <button
//                       className="button-violet"
//                       onClick={() => handleEdit(row && row.id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="button-delete"
//                       onClick={() => handleDelete(row && row.id)}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="button-violet"
//                       onClick={() => sendDataToButton(row)}
//                     >
//                       customer
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {isPopupOpen && (
//         <div className="popup">
//           <form>
//             <div className="popup-dashboard">
//               <p className="popup-top">Add products</p>
//               <button className="popup-top-button" onClick={handleClosePopup}>
//                 X
//               </button>
//             </div>
//             <div className="bottom-popup">
//               <div className="row-row">
//                 <label className="item-data">Upload Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   name="Upload_Image"
//                   onChange={handleChange}
//                   className="input-itemdata"
//                 />
//               </div>
//               <div className="row-row">
//                 <label className="item-data">Category</label>
//                 <select
//                   name="Category"
//                   value={formData["Category"]}
//                   onChange={handleChange}
//                   className="input-itemdata"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category, index) => (
//                     <option key={index} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* Render other input fields */}
//               {Object.keys(formData)
//                 .filter(
//                   (key) =>
//                     key !== "Selection" &&
//                     key !== "Upload_Image" &&
//                     key !== "Category" &&
//                     key !== "id" // Exclude id field
//                 )
//                 .map((key, index) => (
//                   <div key={index} className="row-row">
//                     <label className="item-data">{key}</label>
//                     <input
//                       type="text"
//                       name={key}
//                       value={formData[key]}
//                       onChange={handleChange}
//                       className="input-itemdata"
//                     />
//                   </div>
//                 ))}
//               <button
//                 type="submit"
//                 className="upload"
//                 onClick={handleSubmitProduct}
//               >
//                 upload
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Vendor;

// 18/05/2024

// import React, { useState, useEffect } from "react";
// import { ref, onValue, remove, set, push } from "firebase/database";
// import { database } from "./Firebase";
// import { useNavigate } from "react-router-dom";
// import "./Vendor.css";
// import "./Customer.css";
// import Customer from "./Customer";
// import { useParams } from "react-router-dom";

// const Vendor = () => {
//   const [rowData, setRowData] = useState(null);
//   useEffect(() => {
//     // Fetch the data of the selected row here
//     // For demonstration purposes, I'm setting dummy data here
//     const dummyRowData = {
//       Upload_Image: "dummy_image_url",
//       Category: "Furniture",
//       ProductName: "Example Product",
//       Price: 1000,
//     };
//     setRowData(dummyRowData);
//   }, []);

//   const { productId } = useParams();

//   const [imageFields, setImageFields] = useState([{ id: Date.now() }]);
//   const addImageField = (e) => {
//     e.preventDefault();
//     setImageFields([...imageFields, { id: Date.now() }]);
//   };

//   const handleGenerateLink = (rowData) => {
//     if (rowData) {
//       const domain = window.location.hostname;
//       const productLink =
//         domain === "localhost"
//           ? `http://localhost:3000/customer?data=${encodeURIComponent(
//               JSON.stringify(rowData)
//             )}`
//           : `https://${domain}/customer?data=${encodeURIComponent(
//               JSON.stringify(rowData)
//             )}`;
//       console.log("Generated Link:", productLink);
//     }
//   };

//   const handleCopyLink = (link) => {
//     navigator.clipboard
//       .writeText(link)
//       .then(() => {
//         console.log("Link copied to clipboard");
//         // You can also provide feedback to the user that the link has been copied
//       })
//       .catch((error) => {
//         console.error("Error copying link:", error);
//       });
//   };

//   const columns = [
//     "S.no",
//     "Upload Image",
//     "ProductName",
//     "Price",
//     "Category",
//     "Quantity",
//   ];

//   const initialFormData = {
//     Upload_Image: null,
//     ProductName: "",
//     Price: "",
//     Category: "",
//     Quantity: "",
//   };

//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [tableData, setTableData] = useState([]);

//   const [selectedRowId, setSelectedRowId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [formData, setFormData] = useState(initialFormData);
//   const [categories, setCategories] = useState([
//     "Electronics",
//     "Toys",
//     "Furniture",
//     "Clothing",
//   ]); // Add your categories here
//   const [newCategory, setNewCategory] = useState(""); // State for new category input
//   const navigate = useNavigate();

//   useEffect(() => {
//     const productsRef = ref(database, "vendorProducts");
//     onValue(productsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.keys(data)
//           .map((key) => {
//             const formData = data[key]?.formData;
//             if (formData) {
//               return {
//                 id: key,
//                 ...formData,
//               };
//             }
//             return null;
//           })
//           .filter(Boolean);

//         setTableData(dataArray);
//       }
//     });
//   }, []);

//   const handleOpenPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedRowId(null);
//     setFormData(initialFormData);
//     setImageFields([{ id: Date.now() }]); // Reset image fields
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name.startsWith("Upload_Image") && files && files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData({
//           ...formData,
//           [name]: reader.result,
//         });
//       };
//       reader.readAsDataURL(files[0]);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleNewCategoryChange = (e) => {
//     setNewCategory(e.target.value);
//   };

//   const handleAddCategory = (e) => {
//     e.preventDefault();
//     if (newCategory.trim() !== "") {
//       setCategories([...categories, newCategory.trim()]);
//       setNewCategory(""); // Clear the input field after adding the category
//     }
//   };

//   const handleSubmitProduct = (e) => {
//     e.preventDefault();

//     const requiredFields = ["ProductName", "Price", "Category", "Quantity"];
//     const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

//     if (isAnyFieldEmpty) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     if (selectedRowId !== null) {
//       const updatedTableData = tableData.map((row) =>
//         row.id === selectedRowId ? { ...formData, id: selectedRowId } : row
//       );

//       const productRef = ref(
//         database,
//         `vendorProducts/${selectedRowId}/formData`
//       );
//       set(productRef, formData)
//         .then(() => {
//           console.log("Row updated successfully in Firebase");
//         })
//         .catch((error) => {
//           console.log("Error updating row in Firebase:", error);
//         });

//       setTableData(updatedTableData);
//     } else {
//       const productRef = ref(database, "vendorProducts");
//       push(productRef, { formData })
//         .then(() => {
//           console.log("New data added successfully to Firebase");
//           const productsRef = ref(database, "vendorProducts");
//           onValue(productsRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//               const dataArray = Object.keys(data)
//                 .map((key) => {
//                   const formData = data[key]?.formData;
//                   if (formData) {
//                     return {
//                       id: key,
//                       ...formData,
//                     };
//                   }
//                   return null;
//                 })
//                 .filter(Boolean);

//               setTableData(dataArray);
//             }
//           });
//         })
//         .catch((error) => {
//           console.log("Error adding new data to Firebase:", error);
//         });
//     }

//     handleClosePopup();
//   };

//   const handleEdit = (id) => {
//     setSelectedRowId(id);
//     const rowData = tableData.find((row) => row.id === id);
//     setFormData(rowData);
//     console.log(rowData, "singleRowData");
//     setIsPopupOpen(true);
//   };

//   const handleDelete = (id) => {
//     console.log("Deleting row with ID:", id);
//     const updatedTableData = tableData.filter((row) => row.id !== id);
//     setTableData(updatedTableData);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const filteredTableData = tableData.filter((row) =>
//     Object.values(row).some((value) => {
//       if (value === null || value === undefined) {
//         return false;
//       }
//       const lowerCaseValue = value.toString().toLowerCase();
//       const lowerCaseSearchQuery = searchQuery.toLowerCase();
//       return lowerCaseValue.includes(lowerCaseSearchQuery);
//     })
//   );

//   // const sendDataToButton = (data) => {
//   //   console.log(data, "customerBtn");
//   //   if (selectedRowId !== null) {
//   //     const productRef = ref(
//   //       database,
//   //       `vendorProducts/${selectedRowId}/formData`
//   //     );
//   //     set(productRef, data)
//   //       .then(() => {
//   //         console.log("Data updated successfully in Firebase");
//   //       })
//   //       .catch((error) => {
//   //         console.log("Error updating data in Firebase:", error);
//   //       });
//   //   } else {
//   //     const productRef = ref(database, "products");
//   //     push(productRef, data)
//   //       .then(() => {
//   //         console.log("New data added successfully to Firebase");
//   //       })
//   //       .catch((error) => {
//   //         console.log("Error adding new data to Firebase:", error);
//   //       });
//   //   }
//   // };

//   return (
//     <div className="main-bg">
//       <div className="dashboard">
//         <div>
//           <img
//             src={require("./Images/icon.png")}
//             alt=""
//             height="80px"
//             width="80px"
//             className="image"
//           />
//         </div>
//         <div>
//           <p onClick={handleOpenPopup}>+ Add products</p>
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Search for items...."
//             className="input-items"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div>
//         <div>
//           <button className="logout-button" onClick={handleLogout}>
//             LogOut
//           </button>
//         </div>
//       </div>
//       <div>
//         <div className="content">
//           <table className="table">
//             <thead>
//               <tr>
//                 {columns.map((column, index) => (
//                   <th key={index}>{column}</th>
//                 ))}
//                 <th>Selection</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTableData.map((row, index) => (
//                 <tr key={row && row.id} className="table-body">
//                   <td>{index + 1}</td>
//                   <td>
//                     <img
//                       src={row.Upload_Image_0}
//                       alt="Product"
//                       height="50"
//                       width="50"
//                     />
//                   </td>
//                   <td>{row && row.ProductName}</td>
//                   <td>{row && row.Price}</td>
//                   <td>{row && row.Category}</td>
//                   <td>{row && row.Quantity}</td>
//                   <td>
//                     <button
//                       className="button-violet"
//                       onClick={() => handleEdit(row && row.id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="button-delete"
//                       onClick={() => handleDelete(row && row.id)}
//                     >
//                       Delete
//                     </button>

//                     <button
//                       className="button-violet"
//                       onClick={() => handleGenerateLink(row.id)}
//                     >
//                       Generate Link
//                     </button>
//                     <button
//                       className="button-violet"
//                       onClick={() => handleCopyLink(handleGenerateLink(row.id))}
//                     >
//                       Copy Link
//                     </button>

//                     {/* <button
//                       className="button-violet"
//                       onClick={() => sendDataToButton(row)}
//                     >
//                       customer
//                     </button> */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {isPopupOpen && (
//         <div className="popup">
//           <form>
//             <div className="popup-dashboard">
//               <p className="popup-top">Add products</p>
//               <button className="popup-top-button" onClick={handleClosePopup}>
//                 X
//               </button>
//             </div>
//             <div className="bottom-popup">
//               {imageFields.map((field, index) => (
//                 <div key={field.id} className="image-field">
//                   <label className="item-data">Upload Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     name={`Upload_Image_${index}`}
//                     onChange={handleChange}
//                     className="input-itemdata"
//                   />
//                 </div>
//               ))}
//               <button onClick={addImageField} className="add-button">
//                 Add Another Image
//               </button>
//               <div className="row-row">
//                 <label className="item-data">Category</label>
//                 <select
//                   name="Category"
//                   value={formData["Category"]}
//                   onChange={handleChange}
//                   className="input-itemdata"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category, index) => (
//                     <option key={index} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   placeholder="New Category"
//                   value={newCategory}
//                   onChange={handleNewCategoryChange}
//                   className="input-itemdata"
//                 />
//                 <button onClick={handleAddCategory} className="add-button">
//                   Add Category
//                 </button>
//               </div>
//               {Object.keys(formData)
//                 .filter(
//                   (key) =>
//                     key !== "Selection" &&
//                     !key.includes("Upload_Image") &&
//                     key !== "Category" &&
//                     key !== "id"
//                 )
//                 .map((key, index) => (
//                   <div key={index} className="row-row">
//                     <label className="item-data">{key}</label>
//                     <input
//                       type="text"
//                       name={key}
//                       value={formData[key]}
//                       onChange={handleChange}
//                       className="input-itemdata"
//                     />
//                   </div>
//                 ))}
//               <button
//                 type="submit"
//                 className="upload"
//                 onClick={handleSubmitProduct}
//               >
//                 upload
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Vendor;

//20-05-2024 working code
// import React, { useState, useEffect } from "react";
// import {
//   ref,
//   onValue,
//   remove,
//   set,
//   push,
//   getDatabase,
// } from "firebase/database";
// import { database } from "./Firebase";
// import { useNavigate, useParams } from "react-router-dom";
// import "./Vendor.css";
// import "./Customer.css";

// const Vendor = () => {
//   const [imageFields, setImageFields] = useState([{ id: Date.now() }]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [selectedRowId, setSelectedRowId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [formData, setFormData] = useState({
//     Upload_Image: null,
//     ProductName: "",
//     Price: "",
//     Category: "",
//     Quantity: "",
//   });
//   const [categories, setCategories] = useState([
//     "Electronics",
//     "Toys",
//     "Furniture",
//     "Clothing",
//   ]);
//   const [newCategory, setNewCategory] = useState("");
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (productId) {
//       const productRef = ref(
//         getDatabase(),
//         `vendorProducts/${productId}/formData`
//       );
//       onValue(productRef, (snapshot) => {
//         const data = snapshot.val();
//         setFormData(data || {});
//       });
//     }
//   }, [productId]);

//   useEffect(() => {
//     const productsRef = ref(database, "vendorProducts");
//     onValue(productsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key].formData,
//         }));
//         setTableData(dataArray);
//       } else {
//         setTableData([]);
//       }
//     });
//   }, []);

//   const handleOpenPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedRowId(null);
//     setFormData({
//       Upload_Image: null,
//       ProductName: "",
//       Price: "",
//       Category: "",
//       Quantity: "",
//     });
//     setImageFields([{ id: Date.now() }]);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name.startsWith("Upload_Image") && files && files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: reader.result,
//         }));
//       };
//       reader.readAsDataURL(files[0]);
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleNewCategoryChange = (e) => {
//     setNewCategory(e.target.value);
//   };

//   const handleAddCategory = (e) => {
//     e.preventDefault();
//     if (newCategory.trim() !== "") {
//       setCategories((prev) => [...prev, newCategory.trim()]);
//       setNewCategory("");
//     }
//   };

//   const handleSubmitProduct = (e) => {
//     e.preventDefault();

//     const requiredFields = ["ProductName", "Price", "Category", "Quantity"];
//     const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

//     if (isAnyFieldEmpty) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     if (selectedRowId !== null) {
//       const updatedTableData = tableData.map((row) =>
//         row.id === selectedRowId ? { ...formData, id: selectedRowId } : row
//       );

//       const productRef = ref(
//         database,
//         `vendorProducts/${selectedRowId}/formData`
//       );
//       set(productRef, formData)
//         .then(() => {
//           setTableData(updatedTableData);
//         })
//         .catch((error) => {
//           console.log("Error updating row in Firebase:", error);
//         });
//     } else {
//       const productRef = ref(database, "vendorProducts");
//       push(productRef, { formData })
//         .then(() => {
//           const productsRef = ref(database, "vendorProducts");
//           onValue(productsRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//               const dataArray = Object.keys(data).map((key) => ({
//                 id: key,
//                 ...data[key].formData,
//               }));
//               setTableData(dataArray);
//             }
//           });
//         })
//         .catch((error) => {
//           console.log("Error adding new data to Firebase:", error);
//         });
//     }

//     handleClosePopup();
//   };

//   const handleEdit = (id) => {
//     setSelectedRowId(id);
//     const rowData = tableData.find((row) => row.id === id);
//     setFormData(rowData);
//     setIsPopupOpen(true);
//   };

//   const handleDelete = (id) => {
//     const updatedTableData = tableData.filter((row) => row.id !== id);
//     setTableData(updatedTableData);
//     const productRef = ref(database, `vendorProducts/${id}`);
//     remove(productRef)
//       .then(() => {
//         console.log("Row deleted successfully from Firebase");
//       })
//       .catch((error) => {
//         console.log("Error deleting row from Firebase:", error);
//       });
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleGenerateLink = (rowData) => {
//     if (rowData) {
//       const domain = window.location.hostname;
//       const port = window.location.port ? `:${window.location.port}` : '';
//       const productLink = `http://${domain}${port}/#/customer/${rowData}`;
//       navigator.clipboard.writeText(productLink)
//         .then(() => {
//           console.log("Generated Link:", productLink);
//           alert("Link copied to clipboard");
//         })
//         .catch((err) => {
//           console.error("Failed to copy link: ", err);
//         });
//     }
//   };

//   const addImageField = (e) => {
//     e.preventDefault();
//     setImageFields([...imageFields, { id: Date.now() }]);
//   };

//   const filteredTableData = tableData.filter((row) =>
//     Object.values(row).some((value) => {
//       if (value === null || value === undefined) {
//         return false;
//       }
//       return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
//     })
//   );

//   return (
//     <div className="main-bg">
//       <div className="dashboard">
//         <div>
//           <img
//             src={require("./Images/icon.png")}
//             alt=""
//             height="80px"
//             width="80px"
//             className="image"
//           />
//         </div>
//         <div>
//           <p onClick={handleOpenPopup}>+ Add products</p>
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Search for items...."
//             className="input-items"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div>
//         <div>
//           <button className="logout-button" onClick={handleLogout}>
//             LogOut
//           </button>
//         </div>
//       </div>
//       <div className="content">
//         <table className="table">
//           <thead>
//             <tr>
//               {[
//                 "S.no",
//                 "Upload Image",
//                 "ProductName",
//                 "Price",
//                 "Category",
//                 "Quantity",
//               ].map((column, index) => (
//                 <th key={index}>{column}</th>
//               ))}
//               <th>Selection</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTableData.map((row, index) => (
//               <tr key={row.id} className="table-body">
//                 <td>{index + 1}</td>
//                 <td>
//                   <img
//                     src={row.Upload_Image_0}
//                     alt="Product"
//                     height="50"
//                     width="50"
//                   />
//                 </td>
//                 <td>{row.ProductName}</td>
//                 <td>{row.Price}</td>
//                 <td>{row.Category}</td>
//                 <td>{row.Quantity}</td>
//                 <td>
//                   <button
//                     className="button-violet"
//                     onClick={() => handleEdit(row.id)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="button-delete"
//                     onClick={() => handleDelete(row.id)}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="button-violet"
//                     onClick={() => handleGenerateLink(row.id)}
//                   >
//                     Generate Link
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {isPopupOpen && (
//         <div className="popup">
//           <form>
//             <div className="popup-dashboard">
//               <p className="popup-top">Add products</p>
//               <button className="popup-top-button" onClick={handleClosePopup}>
//                 X
//               </button>
//             </div>
//             <div className="bottom-popup">
//               {imageFields.map((field, index) => (
//                 <div key={field.id} className="image-field">
//                   <label className="item-data">Upload Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     name={`Upload_Image_${index}`}
//                     onChange={handleChange}
//                     className="input-itemdata"
//                   />
//                 </div>
//               ))}
//               <button onClick={addImageField} className="add-button">
//                 Add Another Image
//               </button>
//               <div className="row-row">
//                 <label className="item-data">Category</label>
//                 <select
//                   name="Category"
//                   value={formData.Category}
//                   onChange={handleChange}
//                   className="input-itemdata"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category, index) => (
//                     <option key={index} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   placeholder="New Category"
//                   value={newCategory}
//                   onChange={handleNewCategoryChange}
//                   className="input-itemdata"
//                 />
//                 <button onClick={handleAddCategory} className="add-button">
//                   Add Category
//                 </button>
//               </div>
//               {Object.keys(formData)
//                 .filter(
//                   (key) =>
//                     key !== "Selection" &&
//                     !key.includes("Upload_Image") &&
//                     key !== "Category" &&
//                     key !== "id"
//                 )
//                 .map((key, index) => (
//                   <div key={index} className="row-row">
//                     <label className="item-data">{key}</label>
//                     <input
//                       type="text"
//                       name={key}
//                       value={formData[key]}
//                       onChange={handleChange}
//                       className="input-itemdata"
//                     />
//                   </div>
//                 ))}
//               <button
//                 type="submit"
//                 className="upload"
//                 onClick={handleSubmitProduct}
//               >
//                 upload
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Vendor;
import React, { useState, useEffect } from "react";
import {
  ref,
  onValue,
  remove,
  set,
  push,
  getDatabase,
} from "firebase/database";
import { database } from "./Firebase";
import { useNavigate, useParams } from "react-router-dom";
import "./Vendor.css";
import "./Customer.css";

const Vendor = () => {
  const [imageFields, setImageFields] = useState([
    { id: Date.now(), image: null },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    Upload_Image: null,
    ProductName: "",
    Price: "",
    Category: "",
    Quantity: "",
    isChecked: false,
  });
  const [categories, setCategories] = useState([
    "Electronics",
    "Toys",
    "Furniture",
    "Clothing",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      const productRef = ref(
        getDatabase(),
        `vendorProducts/${productId}/formData`
      );
      onValue(productRef, (snapshot) => {
        const data = snapshot.val();
        setFormData(data || {});
      });
    }
  }, [productId]);

  useEffect(() => {
    const productsRef = ref(database, "vendorProducts");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key].formData,
        }));
        setTableData(dataArray);
      } else {
        setTableData([]);
      }
    });
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedRowId(null);
    setFormData({
      Upload_Image: null,
      ProductName: "",
      Price: "",
      Category: "",
      Quantity: "",
      isChecked: false,
    });
    setImageFields([{ id: Date.now(), image: null }]);
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name.startsWith("Upload_Image") && files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImageFields = imageFields.map((field) =>
          field.id === parseInt(name.split("_")[2], 10)
            ? { ...field, image: reader.result }
            : field
        );
        setImageFields(newImageFields);
      };
      reader.readAsDataURL(files[0]);
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== "") {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    const requiredFields = ["ProductName", "Price", "Category", "Quantity"];
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldEmpty) {
      alert("Please fill out all required fields.");
      return;
    }

    const imagesData = {};
    imageFields.forEach((field, index) => {
      imagesData[`Upload_Image_${index}`] = field.image;
    });

    const finalFormData = { ...formData, ...imagesData };

    if (selectedRowId !== null) {
      const updatedTableData = tableData.map((row) =>
        row.id === selectedRowId ? { ...finalFormData, id: selectedRowId } : row
      );

      const productRef = ref(
        database,
        `vendorProducts/${selectedRowId}/formData`
      );
      set(productRef, finalFormData)
        .then(() => {
          setTableData(updatedTableData);
        })
        .catch((error) => {
          console.log("Error updating row in Firebase:", error);
        });
    } else {
      const productRef = ref(database, "vendorProducts");
      push(productRef, { formData: finalFormData })
        .then(() => {
          const productsRef = ref(database, "vendorProducts");
          onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const dataArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key].formData,
              }));
              setTableData(dataArray);
            }
          });
        })
        .catch((error) => {
          console.log("Error adding new data to Firebase:", error);
        });
    }

    handleClosePopup();
  };

  const handleEdit = (id) => {
    setSelectedRowId(id);
    const rowData = tableData.find((row) => row.id === id);
    setFormData(rowData);
    setImageFields(
      Object.keys(rowData)
        .filter((key) => key.startsWith("Upload_Image"))
        .map((key) => ({
          id: parseInt(key.split("_")[2], 10),
          image: rowData[key],
        }))
    );
    setIsPopupOpen(true);
  };

  const handleDelete = (id) => {
    const updatedTableData = tableData.filter((row) => row.id !== id);
    setTableData(updatedTableData);
    const productRef = ref(database, `vendorProducts/${id}`);
    remove(productRef)
      .then(() => {
        console.log("Row deleted successfully from Firebase");
      })
      .catch((error) => {
        console.log("Error deleting row from Firebase:", error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleCheckboxChange = (id) => {
    const updatedTableData = tableData.map((row) =>
      row.id === id ? { ...row, isChecked: !row.isChecked } : row
    );
    setTableData(updatedTableData);
    const productRef = ref(database, `vendorProducts/${id}/formData`);
    set(productRef, {
      ...tableData.find((row) => row.id === id),
      isChecked: !tableData.find((row) => row.id === id).isChecked,
    })
      .then(() => {
        console.log("Checkbox status updated successfully in Firebase");
      })
      .catch((error) => {
        console.log("Error updating checkbox status in Firebase:", error);
      });
  };

  const generateLink = () => {
    const selectedRowIds = tableData
      .filter((row) => row.isChecked)
      .map((row) => row.id);

    if (selectedRowIds.length === 0) {
      alert("Please select products");
      return;
    }

    const domain = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : "";
    const link = `http://${domain}${port}/#/customer?ids=${selectedRowIds.join(
      ","
    )}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Generated Link:", link);
        alert("Link copied to clipboard");
        const updatedTableData = tableData.map((row) => ({
          ...row,
          isChecked: false,
        }));
        setTableData(updatedTableData);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const addImageField = (e) => {
    e.preventDefault();
    setImageFields([...imageFields, { id: Date.now(), image: null }]);
  };

  const removeImageField = (id) => {
    const updatedImageFields = imageFields.filter((field) => field.id !== id);
    setImageFields(updatedImageFields);
  };

  const filteredTableData = tableData.filter((row) =>
    Object.values(row).some((value) => {
      if (value === null || value === undefined) {
        return false;
      }
      return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  return (
    <div className="main-bg">
      <div className="dashboard">
        <div className="logout-responsive">
          <div>
            <img
              src={
                "https://p1.hiclipart.com/preview/234/537/305/digital-marketing-ecommerce-shopping-cart-software-online-shopping-drop-shipping-web-design-retail-business-png-clipart.jpg"
              }
              alt=""
              height="80px"
              width="80px"
              className="image"
            />
          </div>
          <div>
            <button className="logout-button-res" onClick={handleLogout}>
              LogOut
            </button>
          </div>
        </div>

        <div className="add-button-product">
          <div className="product-add" onClick={handleOpenPopup}>
            <img
              src="https://icons.veryicon.com/png/o/commerce-shopping/merchant-product-icon-library/add-55.png"
              alt=""
              height="40px"
              width="40px"
            ></img>
            <p onClick={handleOpenPopup} className="product-heading">
              Add products
            </p>
          </div>
          <div>
            <button
              className="link-button"
              onClick={() => generateLink(selectedRows)}
            >
              Generate Link
            </button>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search for items...."
            className="input-items"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search for items...."
            className="input-items-res"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div>
          <button className="logout-button" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>
      <div className="content">
        <table className="table">
          <thead>
            <tr>
              {[
                "S.no",
                "Upload Image",
                "ProductName",
                "Price",
                "Category",
                "Quantity",
                "Select Products",
                "Actions",
              ].map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map((row, index) => (
              <tr key={row.id} className="table-body">
                <td>{index + 1}</td>
                <td>
                  <img
                    src={row.Upload_Image_0}
                    alt="Product"
                    height="50"
                    width="50"
                  />
                </td>
                <td>{row.ProductName}</td>
                <td>{row.Price}</td>
                <td>{row.Category}</td>
                <td>{row.Quantity}</td>
                <td>
                  <input
                    type="checkbox"
                    className="check-style"
                    name="isChecked"
                    onChange={() => handleCheckboxChange(row.id)}
                    checked={row.isChecked}
                  />
                </td>
                <td>
                  <button
                    className="button-violet"
                    onClick={() => handleEdit(row.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Card view for mobile screens */}
        <div className="mobileView">
          {filteredTableData.map((row, index) => (
            <div key={row.id} className="product-card">
              <div className="heading-flex">
                <div className="heading-data">
                  <label className="size-headings">S.no</label>
                </div>
                <div className="end-flex">
                  <span className="card-answer">{index + 1}</span>
                </div>
              </div>
              <div className="heading-flex">
                <h1 className="size-headings">Uploaded Image</h1>
                <div className="end-flex">
                  <img
                    src={row.Upload_Image_0}
                    alt="Product"
                    height="80px"
                    width="100px"
                    className="res-image"
                  />
                </div>
              </div>
              <div className="heading-flex">
                <h1 className="size-headings">Product Name</h1>
                <div className="end-flex">
                  <span>{row.ProductName}</span>
                </div>
              </div>
              <div className="heading-flex">
                <h1 className="size-headings">Price</h1>
                <div className="end-flex">
                  <span>{row.Price}</span>
                </div>
              </div>
              <div className="heading-flex">
                <h1 className="size-headings">Category</h1>
                <div className="end-flex">
                  <span>{row.Category}</span>
                </div>
              </div>
              <div className="heading-flex">
                <h1 className="size-headings">Quantity</h1>
                <div className="end-flex">
                  <span>{row.Quantity}</span>
                </div>
              </div>
              <div className="heading-flex">
                <h1 className="size-headings">Select Products</h1>
                <div className="end-flex">
                  <input
                    type="checkbox"
                    className="check-style"
                    name="isChecked"
                    onChange={() => handleCheckboxChange(row.id)}
                    checked={row.isChecked}
                  />
                </div>
              </div>
              <div className="actions">
                <button
                  className="button-violet"
                  onClick={() => handleEdit(row.id)}
                >
                  Edit
                </button>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <form>
            <div className="popup-dashboard">
              <p className="popup-top">Add products</p>
              <button
                className="popup-top-button-dash"
                onClick={handleClosePopup}
              >
                X
              </button>
            </div>
            <div className="bottom-popup-dash">
              {imageFields.map((field, index) => (
                <div key={field.id} className="image-field-dash">
                  <div className='upload-text'><label className="item-data-dash">Upload Image </label></div>
                  <input
                    type="file"
                    accept="image/*"
                    name={`Upload_Image_${field.id}`}
                    onChange={handleChange}
                    className="input-itemdata"
                  />

                  {field.image && (
                    <div className="image-preview">
                      <img
                        src={field.image}
                        alt="Preview"
                        height="50"
                        width="50"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageField(field.id)}
                        className="remove-image-button"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div className="plus-symbol">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5mrk_5fO3EOtB4giTg16pQ_kJcVdSlnvr_-UA6n6IvY0ej24t9LaMm_ooyX9uKf2apYQ&usqp=CAU"
                  alt=""
                  height="30px"
                  width="30px"
                  onClick={addImageField}
                ></img>
              </div>
              <div className="row-row">
                <label className="item-data-dash">Category</label>
                <select
                  name="Category"
                  value={formData.Category}
                  onChange={handleChange}
                  className="input-itemdata"
                >
                  <option value="">Select Category </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                  className="input-itemdata"
                />
                <button onClick={handleAddCategory} className="add-button-dash">
                  Add
                </button>
              </div>
              {Object.keys(formData)
                .filter(
                  (key) =>
                    key !== "Selection" &&
                    !key.includes("Upload_Image") &&
                    key !== "Category" &&
                    key !== "id" &&
                    key !== "isChecked"
                )
                .map((key, index) => (
                  <div key={index} className="row-row">
                    <label className="item-data-dash">{key}</label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="input-itemdata"
                    />
                  </div>
                ))}
              <button
                type="submit"
                className="upload-dash"
                onClick={handleSubmitProduct}
              >
                upload
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Vendor;

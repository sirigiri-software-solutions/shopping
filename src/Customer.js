// import React, { useState, useEffect } from "react";
// import { getDatabase, ref, onValue } from "firebase/database";
// import icon from "./Images/icon.png";
// import './Customer.css'

// const Customer = () => {
//   const [productData, setProductData] = useState([]);

//   useEffect(() => {
//     // Reference to the 'products' node in your Firebase database
//     const productsRef = ref(getDatabase(), "products");

//     // Listen for changes to the data at this location
//     onValue(productsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         // Convert the Firebase object to an array
//         const dataArray = Object.values(data); // Extract values from the object
//         setProductData(dataArray.reverse());
//       } else {
//         // Handle case where there is no data
//         setProductData([]);
//       }
//     });

//     // Cleanup function to remove the listener when component unmounts
//   }, []); // Run this effect only once after the component mounts

//   console.log(productData, "All products");

//   return (
//     <div className="main-bg1">
//       <div className="dashboard1">
//         <div>
//           <img src={icon} alt="" height="80px" width="80px" className="image" />
//         </div>
//         <div>
//           <p>Category</p>
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Search for items...."
//             className="input-items1"
//           />
//         </div>
//       </div>
//       <div>

//         <div className="overall-background">
//           {/* Render the fetched product data */}
//           {productData.map((product) => (
//             <div key={product.id} >
//               {/* Check if product.data is defined before accessing properties */}
//               {product.data && (
//                 <div className="item-background">
//                  <div className="product-image"> <img
//                     src={product.data.Upload_Image}
//                     alt="Product"
//                     style={{ width: "180px",  height:'120px'}}
//                   /></div>
//                   <div className="item-productname"><p className="product-heading">{product.data.Category}</p></div>
//                   <div className="item-productname1"><p className="product-heading1">{product.data.ProductName}</p></div>
//                   <div className="item-productname2"><p className="product-heading1">₹{product.data.Price}</p></div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Customer;
// Customer.js
// import React, { useState, useEffect } from "react";
// import { getDatabase, ref, onValue, remove } from "firebase/database";
// import icon from "./Images/icon.png";
// import { useNavigate } from "react-router-dom";
// import "./Customer.css";
// // import { useNavigate } from "react-router-dom";

// const Customer = () => {
//   const [productData, setProductData] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const productsRef = ref(getDatabase(), "products");

//     onValue(productsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const dataArray = Object.values(data);
//         setProductData(dataArray.reverse());
//         console.log("Data fetching customer", dataArray);
//       } else {
//         setProductData([]);
//         console.log("data not fetching");
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

//   const handleSearch = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handlelogout = () => {
//     const isuserLoggedIn = localStorage.getItem("username");
//     if (isuserLoggedIn) {
//       localStorage.removeItem("username");
//       navigate("/");
//     }
//   };

//   return (
//     <div className="main-bg1">
//       <div className="dashboard1">
//         <div>
//           <img src={icon} alt="" height="80px" width="80px" className="image" />
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder="Search for items...."
//             className="input-items1"
//             value={searchInput}
//             onChange={handleSearch}
//           />
//         </div>
//         <button className="logout-button1" onClick={handlelogout}>
//           LogOut
//         </button>
//       </div>
//       <div>
//         <div className="overall-background">
//           {productData.map((product) => (
//             <div key={product.id}>
//               {product &&
//                 // Only display the item if its category matches the search input
//                 product.Category &&
//                 product.Category.toLowerCase().includes(
//                   searchInput.toLowerCase()
//                 ) && (
//                   <div className="item-background">
//                     <div className="product-image">
//                       <img
//                         src={product.Upload_Image}
//                         alt="Product"
//                         style={{ width: "180px", height: "120px" }}
//                       />
//                     </div>
//                     <div className="item-productname">
//                       <p className="product-heading">{product.Category}</p>
//                     </div>
//                     <div className="item-productname1">
//                       <p className="product-heading1">{product.ProductName}</p>
//                     </div>
//                     <div className="item-productname2">
//                       <p className="product-heading1">₹{product.Price}</p>
//                     </div>
//                   </div>
//                 )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Customer;

// customer page working code
//20-05-2024 working

// import React, { useState, useEffect } from "react";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { useParams } from "react-router-dom";
// import icon from "./Images/icon.png";
// import "./Customer.css";

// const Customer = () => {
//   const { ProductId } = useParams();
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageLinks, setImageLinks] = useState([]);

//   useEffect(() => {
//     if (ProductId) {
//       const productRef = ref(
//         getDatabase(),
//         `vendorProducts/${ProductId}/formData`
//       );
//       onValue(
//         productRef,
//         (snapshot) => {
//           const data = snapshot.val();
//           if (data) {
//             setProductData(data);
//             console.log(data, "uniqueData");
//             setLoading(false);

//              // Extract image links
//              const links = Object.values(data)
//              .filter(value => typeof value === 'string' && value.startsWith('data:image'));
//            setImageLinks(links);
//           } else {
//             setError("No data found for the specified product ID.");
//             setLoading(false);
//           }
//         },
//         (error) => {
//           console.error("Error fetching data:", error);
//           setError("Error fetching data. Please try again later.");
//           setLoading(false);
//         }
//       );
//     } else {
//       setError("Invalid product ID.");
//       setLoading(false);
//     }
//   }, [ProductId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!productData) {
//     return <div>No product data available.</div>;
//   }

//   return (
//     <div className="main-bg1">
//       <div className="dashboard1">
//         <div>
//           <img
//             src={icon}
//             alt="icon"
//             height="80px"
//             width="80px"
//             className="image"
//           />
//         </div>
//       </div>
//       <div>
//         <div className="overall-background">
//           <div className="item-background">
//             <div className="product-image">
//               <img
//                 src={productData.Upload_Image_0}
//                 alt="Product"
//                 style={{ width: "180px", height: "120px" }}
//               />
//             </div>
//             <div className="item-productname">
//               <p className="product-heading">{productData.Category}</p>
//             </div>
//             <div className="item-productname1">
//               <p className="product-heading1">{productData.ProductName}</p>
//             </div>
//             <div className="item-productname2">
//               <p className="product-heading1">₹{productData.Price}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Customer;

//21-05-2024

// import React, { useState, useEffect } from "react";
// import { ref, onValue } from "firebase/database";
// import { useLocation } from "react-router-dom";
// import { database } from "./Firebase";
// import "./Customer.css"; // Assuming you have a CSS file for styling
// import icon from "./Images/icon.png"; // Make sure the icon path is correct

// const Customer = () => {
//   const [selectedData, setSelectedData] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const ids = query.get("ids");

//     if (ids) {
//       const idArray = ids.split(",");

//       const fetchData = async () => {
//         const dataPromises = idArray.map((id) => {
//           return new Promise((resolve) => {
//             const productRef = ref(database, `vendorProducts/${id}/formData`);
//             onValue(productRef, (snapshot) => {
//               const data = snapshot.val();
//               resolve({ id, ...data });
//             });
//           });
//         });

//         const results = await Promise.all(dataPromises);
//         setSelectedData(results.filter((result) => result !== null));
//       };

//       fetchData();
//     }
//   }, [location]);

//   return (
//     <div className="main-bg1">
//       <div className="dashboard1">
//         <div>
//           <img
//             src='https://p1.hiclipart.com/preview/234/537/305/digital-marketing-ecommerce-shopping-cart-software-online-shopping-drop-shipping-web-design-retail-business-png-clipart.jpg'
//             alt="icon"
//             height="80px"
//             width="80px"
//             className="image"
//           />
//         </div>
//         <p className="quote">If You can't stop Thinking about it......Then Buy it....</p>
//       </div>
//       <div className="overall-background">
//         {selectedData.length > 0 ? (
//           selectedData.map((productData) => (
//             <div key={productData.id} className="item-background">
//               <div className="product-image">
//                 <img
//                   src={productData.Upload_Image_0}
//                   alt="Product"
//                   style={{ width: "180px", height: "120px" }}
//                 />
//               </div>
//               <div className="item-productname">
//                 <p className="product-heading">{productData.Category}</p>
//               </div>
//               <div className="item-productname1">
//                 <p className="product-heading1">{productData.ProductName}</p>
//               </div>
//               <div className="item-productname2">
//                 <p className="product-heading1">₹{productData.Price}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products selected.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Customer;










import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { useLocation } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { database } from "./Firebase";
import "./Customer.css"; // Assuming you have a CSS file for styling

const Customer = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [popupData, setPopupData] = useState(null); // State for popup data
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const ids = query.get("ids");

    if (ids) {
      const idArray = ids.split(",");

      const fetchData = async () => {
        const dataPromises = idArray.map((id) => {
          return new Promise((resolve) => {
            const productRef = ref(database, `vendorProducts/${id}/formData`);
            onValue(productRef, (snapshot) => {
              const data = snapshot.val();
              resolve({ id, ...data });
            });
          });
        });

        const results = await Promise.all(dataPromises);
        setSelectedData(results.filter((result) => result !== null));
      };

      fetchData();
    }
  }, [location]);

  const handleProductClick = (productData) => {
    setPopupData(productData);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const renderCarouselImages = (productData) => {
    const imageKeys = Object.keys(productData).filter(key => key.startsWith("Upload_Image_"));
    return imageKeys.map((key, index) => (
      <div key={index}>
        <img src={productData[key]} alt={`Product ${index}`} className="carousel-image" />
      </div>
    ));
  };

  return (
    <div className="main-bg1">
      <div className="dashboard1">
        <div>
          <img
            src="https://p1.hiclipart.com/preview/234/537/305/digital-marketing-ecommerce-shopping-cart-software-online-shopping-drop-shipping-web-design-retail-business-png-clipart.jpg"
            alt="icon"
            height="80px"
            width="80px"
            className="image"
          />
        </div>
        <p className="quote">
          If You can't stop Thinking about it......Then Buy it....
        </p>
      </div>
      <div className="products">
      <div className="overall-background">
        {selectedData.length > 0 ? (
          selectedData.map((productData) => (
            <div
              key={productData.id}
              className="item-background"
              onClick={() => handleProductClick(productData)}
            >
              <div className="product-image">
                <img
                  src={productData.Upload_Image_0}
                  alt="Product"
                  className="product-list-image"
                />
              </div>
              <div className="item-productname">
                <p className="product-heading">{productData.Category}</p>
              </div>
              <div className="item-productname1">
                <p className="product-heading1">{productData.ProductName}</p>
              </div>
              <div className="item-productname2">
                <p className="product-heading1">₹{productData.Price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
      </div>

      {popupData && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-div">
            <span className="popup-close" onClick={closePopup}>
              &times;
            </span>
            </div>
            <div className="popup-fulldetails">
              <div className="popup-product-image">
                <Carousel className="cau-image">
                  {renderCarouselImages(popupData)}
                </Carousel>
              </div>
              <div className="popup-product-details">
                <p className="popup-product-category">{popupData.Category}</p>
                <p className="popup-product-name">{popupData.ProductName}</p>
                <p className="popup-product-price">₹{popupData.Price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;

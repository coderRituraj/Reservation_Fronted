// import React, {useState} from 'react';
// import axios from 'axios';
// import Transport from './Transport';
// import {

//     Box,
//     Button,

    

//   } from '@chakra-ui/react'
// import { chakra } from '@chakra-ui/react';
// function FareDetails(){
//     const[vehicle, setVehicle]=useState('');
//     const[FareDetails, setFareDetails]=useState('');
//     const [showPopup, setShowPopup] = useState(false);
//     const [bookingConfirmed, setBookingConfirmed] = useState(false);   
//     const handleBooking = () => {
//       setBookingConfirmed(true);
//     };

//     const [showBookButton, setShowBookButton] = useState(false);  
//      const handleGetFare = () => {
//        setShowBookButton(true);
//      };
    

      
//     const handleVehicleChange=(event)=>{
//         setVehicle(event.target.value);
//     }
//     const fetchFareDetails=()=>{
//         setShowBookButton(true);

//         axios.get(`http://localhost:8081/fare/${vehicle}/5`)
//         .then(response => {
//             setFareDetails(response.data);
//             console.log(response);
//         }
        
//         )
//         .catch(error=>{
          
//             console.error(error);
//         });

//     };


//     return (
//       <div>
//         <select
//           className=" border-gray-600 border-2"
//           value={vehicle}
//           onChange={handleVehicleChange}
//         >
//           <option disabled value="">
//             Select a vehicle
//           </option>
//           <option value="Suv">Suv</option>
//           <option value="Hatchback">Hatchback</option>
//           <option value="Sedan">Sedan</option>
//           <option value="Bike">Bike</option>
//           <option value="Auto">Auto</option>
//         </select>

//         {/* <button
//           onClick={fetFareDetails}
//           className="ml-40 font-serif mt-2 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-400 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-200"
//         >
//           Get Fare
//         </button> */}
//         <button onClick={fetchFareDetails} className="ml-40 font-serif mt-2 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-400 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-200">Get Fare</button>
//         {showBookButton && !bookingConfirmed && (
//           <button onClick={handleBooking} className="ml-40 font-serif mt-2 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-400 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-200">
//             Book </button>
            
//         )
//         }
//         {bookingConfirmed && <p>Your ride is booked</p>}

//         {/* {bookingConfirmed && <p>Your ride is booked!</p>}
//         <button onClick={handleBooking}>Book Cab</button>
//         {bookingConfirmed && <p>Your ride is booked!</p>} */}

//         {FareDetails && (
//           <div className="">
//             <h3>{FareDetails.vehicle}</h3>
//             <p>Fare: {FareDetails.fare}</p>
//           </div>
//         )}
//       </div>
//     );

// }




// export default FareDetails;
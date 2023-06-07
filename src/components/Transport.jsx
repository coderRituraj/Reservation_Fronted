import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  position,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes ,FaBusAlt} from 'react-icons/fa'
import {BsClockFill} from 'react-icons/bs'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import Navbars from './Navbars'
import React, {useEffect} from 'react';
import axios from 'axios';

const center = { lat: 28.6100966, lng: 77.4233416 }


function Transport() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [buttonClicked, setButtonClicked]=useState(false);
  const[vehicle, setVehicle]=useState('');
  const[FareDetails, setFareDetails]=useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false); 
  const [fare, setFare] = useState([]); 
  const [isFetchingData, setFetchingData] = useState(false);
  const [showBookButton, setShowBookButton] = useState(false);  
  

  const handleButtonClick=()=>{
    setButtonClicked(true);
  };

  useEffect(() => {
    const fetchFare = async () => {
      try{
        const response = await axios.get(`http://localhost:8081/fare/${vehicle}/${distance}`);
        const fareValue = response.data;
        setFare(fareValue);
      }catch(error){
        console.error(error);
      }
    };
    if(isFetchingData){
      fetchFare();
    }
  }, [isFetchingData]);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    setButtonClicked(true);
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setButtonClicked(false)
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  

  const handleBooking = () => {
    setBookingConfirmed(true);
  };

   const handleGetFare = () => {
     setShowBookButton(true);
   };

  const handleVehicleChange=(event)=>{
      setVehicle(event.target.value);
  }

  const handleFetchButton=()=>{
      setShowBookButton(true);
      setFetchingData(true);
  };

  


  return (
    <div>
      <Navbars />

      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          {/* Google Map Box */}

          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,

              streetViewControl: false,

              mapTypeControl: false,

              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />

            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>

        <Box
          p={4}
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          minW="container.md"
          zIndex="1"
        >
          <HStack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              <Autocomplete>
                <Input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </Box>

            <Box flexGrow={1}>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>

            <ButtonGroup>
              <Button
                colorScheme="pink"
                type="submit"
                onClick={calculateRoute}
              >
                Search
              </Button>

              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
          {buttonClicked && (
            <div>
              <HStack spacing={4} mt={4} justifyContent="space-between">
                <Text>
                  Distance: {distance} <FaBusAlt />
                </Text>

                <Text>
                  Duration: {duration} <BsClockFill />
                </Text>

                <IconButton
                  aria-label="center back"
                  icon={<FaLocationArrow />}
                  isRound
                  onClick={() => {
                    map.panTo(center);

                    map.setZoom(15);
                  }}
                />
              </HStack>

              <div>
                <select
                  className=" border-gray-600 border-2"
                  value={vehicle}
                  onChange={handleVehicleChange}
                >
                  <option disabled value="">
                    Select a vehicle
                  </option>
                  <option value="Suv">Suv</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Bike">Bike</option>
                  <option value="Auto">Auto</option>
                </select>

                {/* <button

        onClick={fetFareDetails}

        className="ml-40 font-serif mt-2 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-400 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-200"

      >

        Get Fare

      </button> */}

                <button
                  onClick={handleFetchButton}
                  className="ml-40 font-serif mt-2 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-400 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-200"
                >
                  Get Fare
                </button>

                {isFetchingData && fare !== null && <p>Fare: {fare}</p>}

                {showBookButton && !bookingConfirmed && (
                  <button
                    onClick={handleBooking}
                    className="ml-40 font-serif mt-2 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-400 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-200"
                  >
                    Book Ride
                  </button>
                )}

                {bookingConfirmed && <p>Your ride is booked!</p>}

                {FareDetails && (
                  <div className="">
                    <h3>{FareDetails.vehicle}</h3>
                    <p>Fare: {FareDetails.fare}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Box>
      </Flex>
    </div>
  );
}

export default Transport

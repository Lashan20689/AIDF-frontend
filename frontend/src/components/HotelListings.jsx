import { useGetHotelsforSearchQueryQuery} from "@/lib/api";
import {useState } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";
//import { Skeleton } from "@/component/ui/skeleton";





//state variables memory slots react use instead of the we use state management like using store
// export default function HotelListings() {
//     const [hotels, setHotels] = useState([]);
//     const [isLoading, setIsLoading] =useState(true);
//     const [isError, setIsError] = useState(false);
//     const [error, setError] = useState("");

export default function HotelListings() {

  //get the search from the redux store using the useSelector hook and pass it as a query parameter to the useGetHotelsforSearchQuery hook to fetch the hotels that match the search query and also handle the loading and error states for the search query and display the hotels that match the search query on the screen
  const searchValue = useSelector((state) => state.search.value);
  //fetch hotel data based on search query using rtk query


  const {data: hotels, isLoading, isError, error} = useGetHotelsforSearchQueryQuery(
    {query: searchValue,
      
    }
    

);

//location filtering user click handleSelectedLocation updates the screen
    const locations = ["ALL", "France", "Italy", "Australia", "Japan"];

    const [selectedLocation, setSelectedLocation] = useState("ALL");
    //handler for location tab selection
    const handleSelectedLocation = (location) => {
        setSelectedLocation(location);
    };
    //.map = looping through arrays here it loops through the location array and for each location create an location tab
if (isLoading) {
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {locations.map((location, i) => {
          return (
            <LocationTab
              key={i}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectedLocation}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        <p>Loading...</p>
      </div>
    </section>
  );
}
//error state UI
if (isError) {
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {locations.map((location, i) => {
          return (
            <LocationTab
              key={i}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectedLocation}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        <p className="text-red-500">{error?.toString() || "An error occurred while loading hotels."}</p>
      </div>
    </section>
  );
}

//filtered logic (this is like shorthand if/else statement) if selected location is ALL then show all hotels otherwise filter the hotels based on the selected location and return the filtered list of hotels to be displayed on the screen

    const filteredHotels  = selectedLocation === "ALL" 
     ? hotels || []
     : (hotels|| []).filter(({hotel}) => 
         hotel.location
            .toLowerCase()
            .includes(selectedLocation.toLowerCase())
     );

//fetching data runs once when the component mounts and updates the hotels state variable with the fetched data and also handles loading and error states
//side effect we dont want use this bcs we use the state to handle the loading and error states and also we use the useGetHotelsQuery hook to fetch the data and it already handles the loading and error states for us so we dont need to use the useEffect hook to fetch the data and update the state variables manually

    // useEffect(()=> {
    //     getHotels()
    //         .then((data)=>{
    //             setHotels(data);
    //         })
    //         .catch((error) => {
    //             setIsError(true);
    //             setError(error.message);
    //         })
    //         .finally(()=>{
    //             setIsLoading(false);
    //         });

    // }, []);//this runs once when component first loads because of empty [] called it as a dependancy array



  //main UI Display hotel after data is loaded
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {locations.map((location, i) => {
          return (
            <LocationTab
              key={i}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectedLocation}
            />
          );
        })}
      </div>
      {/*hotel card grid destructures hotel and confidenece from each item  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {(filteredHotels || []).map(({hotel, confiedence}) => {
          return <HotelCard key={hotel._id}
                   hotel={hotel}
                   confiedence={confiedence}
                   routerPrefix="/hotels/" />;//hotel card grid 
        })}
      </div>
    </section>
  );
}
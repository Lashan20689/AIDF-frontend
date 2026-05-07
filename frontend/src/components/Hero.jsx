import { Sparkles } from "lucide-react";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { submit } from "@/lib/features/searchSlice";



export default function Hero() {
    //access redux store dispatch function to dispatch actions to the store
    const dispatch = useDispatch();

    // function to handle search using also for stop reloads the page on submit use an event(e)
    const handleSubmit = (e) =>{

        e.preventDefault();
        const searchQuery = e.target.search.value;
        console.log("Search query:", searchQuery);
        //udpate redux store with the seacrh query
        dispatch(submit(searchQuery));

    };

    return (
        <div className="">
            {/* Hero section */}
            <div className="relative z-10 flex flex-col items-center text white justify-center px-8 pt-32 pb-32">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center  ">
                    Find Your Best Staycation
                </h1>

                <p className="text-xl mb-12 text-center max-w-2xl  text-white">
                    Describe your dream staycation and let our AI-powered search find the perfect match for you.
                </p>

                {/* Search form */}
                <form
                    onSubmit={handleSubmit} 
                    className="w-full max-w-3xl bg-black/10 backdrop-blur-md lg:h-16 rounded-full p-2 flex items-center"
                    >
                        <Input
                        type="text"
                        name="search"   
                        placeholder="Describe your ideal staycation..."
                        className="flex-grow bg-transparent lg:text-lg text-white placeholder:text-white/50 border:none outline-none focus:border-none focus-visible:ring-0 focus:outline-none px-6 lg:px-8 py-4 lg:py-0 rounded-full"
                        />
                        <Button
                            type="submit"
                            variant="default"   
                            className="rounded-full w-48 flex items-center gap-x-2 lg:h-12"
                        >
                            <Sparkles
                                style={{width: "20px", height: "20px"}}
                                className="mr-2 animate-pulse text-sky-400"
                                />
                                <span className="lg:text-lg">AI Search</span>
                        </Button>

                        


                </form>

            </div>
        </div>
    );


}
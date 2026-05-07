import {  Globe } from "lucide-react";
import{Button} from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";




function Navigation() {

    const user = useUser();

    return(
        <nav className="z-10 bg-black flex items-center justify-between px-8 text-white py-4">
            <div className="flex items-center space-x-8">
                <Link to="/" className="text-2xl font-bold">
                Horizone    
                </Link>
                <div className="hidden md:flex space-x-6">
                    <Link to={'/'} className="transition-colors">
                    Home
                    </Link>
                    
                    {user?.publicMetadata?.role ==="admin" &&(<Link to={'/hotels/create'} className="transition-colors hover:text-gray-300">
                      Create Hotel 
                    </Link>)}   
                </div>
            </div>

            <div className=" flex items-center space-x-4">
                <Button variant="ghost" className="">
                    <Globe className="h-5 w-5 mr-2"/>
                    EN
                </Button>
                <SignedOut>
                    <Button variant ="ghost" asChild>
                        <Link to="/sign-in">Log in</Link>
                    </Button>
                    <Button asChild>
                        <Link to="/sign-up">Sign up</Link>
                    </Button>

                </SignedOut>
                <SignedIn>
                    <UserButton />
                    <Button asChild>
                        <Link to="/account">Account</Link>
                    </Button>
                </SignedIn>
                
                
            </div>
        </nav>
    );
};

export default Navigation;
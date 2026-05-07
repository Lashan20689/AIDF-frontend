import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,

} from "@/components/ui/form";
import { useCreateHotelMutation } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {Textarea} from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";




const formSchema = z.object({
    name: z.string().min(1, {message:"Hotel name is required"}),
    location: z.string().min(1, {message:"Hotel location is required"}),
    image: z.string().min(1, {message:"Hotel image is required"}),
    price: z.number().min(1, {message:"Hotel price is required"}),
    description: z.string().min(1, {message:"Hotel description is required"}),
});

const CreateHotelForm = () => {
    const [createHotel, {isLoading}] = useCreateHotelMutation();
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    

    const handlesubmit = async (values) => {
      try {
        toast.loading("Creating hotel...");
        await createHotel({
          name,
          location,
          image,
          price,
          description,
        }).unwrap();
        toast.success("Hotel created successfully");
      } catch (error) {
        toast.error("Hotel creation failed");
      }
    };

    return(
        <Form {...form}>
            <form className="w-1/2 justify-center  " onSubmit={form.handleSubmit(handlesubmit)}>
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hotel Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Hotel Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="Image" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input 
                                            type="number"
                                        placeholder="Price"
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                        
                                        
                                        valur={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        </div>

                        <div className="mt-4">
                            <Button type="submit">Create Hotel</Button>
                        </div>
                        </form>


        </Form>


    );
  
};

export default CreateHotelForm;



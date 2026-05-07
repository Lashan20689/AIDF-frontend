import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useCreateBookingMutation } from "@/lib/api";
import { format, differenceInDays } from "date-fns";
import { useNavigate } from "react-router"; // ADD THIS IMPORT
import { toast } from "sonner"; // ADD THIS IMPORT

const generateRoomNumber = () => Math.floor(Math.random() * 900) + 100;

export default function BookingForm({ hotel, isOpen, onClose }) {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [assignedRoom, setAssignedRoom] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const navigate = useNavigate(); // ADD THIS

    const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
    const totalCost = nights * (hotel?.price || 0);

    const handleBook = async () => {
        if (!checkIn || !checkOut || nights <= 0) return;

        const roomNumber = generateRoomNumber();

        try {
            const booking = await createBooking({
                hotelId: hotel._id,
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
                roomNumber: roomNumber,
            }).unwrap();

            setAssignedRoom(roomNumber);
            setBookingSuccess(true);
            
            // ADD THIS - Navigate to payment after a short delay
            setTimeout(() => {
                navigate(`/booking/payment?bookingId=${booking._id}`);
                toast.success("Booking created! Proceed to payment.");
                onClose(); // Close the dialog
            }, 1500); // Shows success message briefly before navigating
            
        } catch (error) {
            console.error(error);
            toast.error("Booking failed. Please try again."); // ADD THIS
        }
    };

    const handleClose = () => {
        setCheckIn(null);
        setCheckOut(null);
        setAssignedRoom(null);
        setBookingSuccess(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {bookingSuccess ? "Booking Confirmed! 🎉" : `Book ${hotel?.name}`}
                    </DialogTitle>
                </DialogHeader>

                {/* Success State */}
                {bookingSuccess ? (
                    <div className="flex flex-col items-center gap-4 py-6">
                        <div className="text-6xl">✅</div>
                        <p className="text-center text-muted-foreground">
                            Your booking has been confirmed! Redirecting to payment...
                        </p>
                        <div className="w-full bg-muted rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Hotel</span>
                                <span className="font-medium">{hotel?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Check In</span>
                                <span className="font-medium">{format(checkIn, "PPP")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Check Out</span>
                                <span className="font-medium">{format(checkOut, "PPP")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Room Assigned</span>
                                <span className="font-medium">#{assignedRoom}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 mt-2">
                                <span className="font-bold">Total Cost</span>
                                <span className="font-bold text-primary">${totalCost}</span>
                            </div>
                        </div>
                        <Button className="w-full" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6 py-4">
                        {/* Check In Date */}
                        <div className="space-y-2">
                            <Label>Check In Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {checkIn ? format(checkIn, "PPP") : "Select check in date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={checkIn}
                                        onSelect={setCheckIn}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Check Out Date */}
                        <div className="space-y-2">
                            <Label>Check Out Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {checkOut ? format(checkOut, "PPP") : "Select check out date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={checkOut}
                                        onSelect={setCheckOut}
                                        disabled={(date) => date <= (checkIn || new Date())}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Auto assigned room notice */}
                        <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
                            🏨 A room will be automatically assigned to you upon booking.
                        </div>

                        {/* Cost Summary */}
                        {nights > 0 && (
                            <Card className="bg-muted">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            ${hotel?.price} x {nights} night{nights > 1 ? "s" : ""}
                                        </span>
                                        <span>${totalCost}</span>
                                    </div>
                                    <div className="flex justify-between font-bold border-t pt-2">
                                        <span>Total</span>
                                        <span className="text-primary">${totalCost}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Confirm Button */}
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleBook}
                            disabled={!checkIn || !checkOut || nights <= 0 || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Booking...
                                </>
                            ) : (
                                `Confirm Booking — $${totalCost}`
                            )}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
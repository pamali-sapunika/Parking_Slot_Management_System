import { Container, HStack, Button, Box, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axios from "axios"

const Home = () => {

    const [newRecord, setNewRecord] = useState({
        slot_id : "",
        date_time : "",
        vehicle_status: "",
        admin_id: "100"
    });

    const [ dailySlots, setDailySlots ] = useState([]);
    const [ slots, setSlots ] = useState([]);
    const [ selectedSlot, setSelectedSlot] = useState(null);
    const [ status, setStatus] = useState(4);
    const [ clicked, setClicked] = useState(1);
    const [ selectedButton, setSelectedButton ] = useState();

    //Color changing DONE
    const getColor = (remainingSlots) => {
        if (remainingSlots === 0) return "red.400"; 
        if (remainingSlots === 1 || remainingSlots === 2) return "yellow.400"; 
        if (remainingSlots > 2) return "#D3E671";
        return "gray.400"; 
    };


    //FETCH DAILY SLOTS
    useEffect(() => {

        const fetchDailySlots = () => {
          axios.get("http://localhost:5000/api/dailyslots/").then((res) => {
            console.log("Fetched daily slots" + res.data);
            setDailySlots(res.data);
          }).catch((error) => {
            console.log(`Erro fetching daily slots ${error}`)
          })
        }
    
        fetchDailySlots();
    
    }, []);

    //FETCH SLOTS
    useEffect(() => {

        const fetchSlots = () => {
          axios.get("http://localhost:5000/api/slots/").then((res) => {
            console.log("Slots fetched successfully" + res.data);
            setSlots(res.data);
          }).catch((error) => {
            console.log(`Erro fetching slots ${error}`);
          })
        }
    
        fetchSlots();
    
    }, []);
    

    // Load selected button from localStorage
    useEffect(() => {
        const savedSelection = localStorage.getItem("selectedSlot");
        if (savedSelection) {
            setSelectedSlot(savedSelection);
        }
    }, []);


    // Fetch slots and auto-select first button
    useEffect(() => {
        axios.get("http://localhost:5000/api/slots/")
            .then((res) => {
                setSlots(res.data);

                // Auto-select first slot if nothing is selected
                if (!selectedSlot && res.data.length > 0) {
                    setSelectedSlot(res.data[0]._id);
                    localStorage.setItem("selectedSlot", res.data[0]._id);
                }
            })
            .catch((error) => console.log(`Error fetching slots: ${error}`));
    }, [selectedSlot]);

    
    // HANDLE BUTTON CLICK
    const handleSlotClick = (slotId) => {
        setSelectedSlot(slotId);
        localStorage.setItem("selectedSlot", slotId);
    };





    const buttonSelectedSlotDetails = slots.find((slot) => slot._id === selectedSlot);

    //selected slotid find dailyslotid and fetch all data
    const buttonSelectedDailySlotDetails = dailySlots.find((dailySlot) => dailySlot.slot_id === selectedSlot);


    return (

        <Container maxW={"container.sm"}>

            {slots.length > 0 ? (
                <Box>
                    <HStack justifyContent="center" alignItems="center" mt="20px" mb="40px">
                        {slots.map((slot, index) => (  
                            <Button
                                key={slot._id}
                                onClick={() => handleSlotClick(slot._id)}
                                colorScheme={selectedSlot === slot._id ? "teal" : "gray"}
                            >
                                {slot.category}
                            </Button>
                        ))}
                    </HStack>
                </Box>
            ) : "No category"}

    
            {buttonSelectedSlotDetails && buttonSelectedDailySlotDetails && (
                <Box 
                bgColor={getColor(buttonSelectedDailySlotDetails.remaining_slots)} 
                padding={"24px"}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                >
                    <Text textAlign={"center"} >
                        {buttonSelectedSlotDetails.category}
                    </Text>

                    <Text textAlign={"center"} fontSize={"20px"}>
                        Category <Text as="span" fontSize={"35px"}>{buttonSelectedSlotDetails.slot_name}</Text> 
                    </Text>

                    <Box 
                        bgColor={"gray.500"} 
                        mt={"10px"} 
                        padding={"24px"}
                        borderRadius="lg"
                        >
                        <Text 
                            textAlign={"center"} 
                            mb={"10px"}
                        >No of Remaning slots</Text>
                        <Box textAlign="center">
                            <Text fontSize={"80px"} color={getColor(buttonSelectedDailySlotDetails.remaining_slots)}>{buttonSelectedDailySlotDetails.remaining_slots}</Text>
                            <Text fontSize={"30px"}  color={getColor(buttonSelectedDailySlotDetails.remaining_slots)}>Remaining</Text>
                        </Box>
                    </Box>

                </Box>

            )}

        </Container>

    )
}

export default Home
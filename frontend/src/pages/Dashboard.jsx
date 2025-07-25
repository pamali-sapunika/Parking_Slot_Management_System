import { Container, Box, Text, Stack, SimpleGrid, Button } from "@chakra-ui/react"
import axios from 'axios'
import React, { useEffect, useState } from "react"
// import { fetchSlots } from "../services/slot.service";

const Dashboard = () => {

    const [slots, setSlots] = useState([]);
    const [dailySlots, setDailySlots] = useState([]);


    //FETCH SLOTS
    useEffect(() => {

    const fetchSlots = () => {
      axios.get("http://localhost:5000/api/slots/").then((res) => {
        console.log(res.data);
        setSlots(res.data);
      }).catch((error) => {
        console.log(`Erro fetching slots ${error}`);
      })
    }

    fetchSlots();

    }, []);

    //FETCH DAILY SLOTS
    useEffect(() => {

      const fetchDailySlots = () => {
        axios.get("http://localhost:5000/api/dailyslots/").then((res) => {
          console.log(res.data);
          setDailySlots(res.data);
        }).catch((error) => {
          console.log(`Erro fetching daily slots ${error}`)
        })
      }
  
      fetchDailySlots();
  
      }, []);

    //GET FILLED DAILY SLOTS
    const getFilledDailySlots = (slotId) => {
      const dailySlot = dailySlots.find((dSlot) => dSlot.slot_id === slotId);
      return dailySlot ? dailySlot.remaining_slots : 0;
    };


    //CREATE RECORDS WITH UPDATING DAILY SLOTS
    const createRecordss = async (slotId, status) => {
      try {

          const updatedDailySlots = [...dailySlots];
          const dailySlot = updatedDailySlots.find((dSlot) => dSlot.slot_id === slotId);
          
          //TODO: to update the user UI at that time 
          if (dailySlot) {
            if (status === "Arrival") {
              dailySlot.remaining_slots += 1;
            } else if (status === "Departure") {
              dailySlot.remaining_slots -= 1;
            }
          }


          setDailySlots(updatedDailySlots);

          const recordData = {
              date_time: new Date(),
              vehicle_status: status,
              admin_id: "0011" 
          };

          await axios.post(`http://localhost:5000/api/records/${slotId}`, recordData);

          alert(`${status} record created successfully for Slot ID: ${slotId}`);
          console.log("New record created with updating daily slot API" + slotId);
      } catch (error) {
          console.error("Error creating record:", error);
          alert("Error creating record.");
      }
    };


    //ADD SLOT (RIGHT SIDE + BUTTON)
    const addSlot = (slotid) => {
      axios.patch(`http://localhost:5000/api/slots/slotadd/${slotid}`).then((res) => {
        console.log("Slot added" + res.data);
        alert("A new slot added to " + slotid);
      }).catch((error) => {
        console.log("Error updating slots" + error);
      })
    }


    //REMOVE SLOT (RIGHT SIDE - BUTTON)
    const removeSlot = (slotid) => {
      axios.patch(`http://localhost:5000/api/slots/slotremove/${slotid}`).then((res) => {
        console.log("Slot removed" + res.data);
      }).catch((error) => {
        console.log("Error removing slot" + error);
      })
    }


    return (
    
      <Container maxW="100vw" centerContent>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w={"full"} mt={6}>

                {slots.length > 0 ? (
                    slots.map((slot, index) => (
                        <Box
                            key={index}
                            p={4}
                            borderWidth="1px"
                            borderRadius="lg"
                            boxShadow="lg"
                            bg="white"
                            w={"100%"}
                            h={{ base: "auto", md: "250px", lg: "400px" }}
                            display="flex"
                            flexDirection="column"
                            alignItems="center" 
                            justifyContent="flex-start" 
                            textAlign="center"
                            >
                            <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mt={2}>
                              {slot.category || "No description available"}
                            </Text>
                            <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} fontWeight="bold" mt={2}>Cat
                                {slot.slot_name || `Slot ${index + 1}`}
                            </Text>

                            <Box 
                              flex="1" 
                              display="flex" 
                              alignItems="center" 
                              justifyContent="center"  
                              w="100%"
                              p={3}
                              position="relative"
                            >
                              <Text 
                                fontSize={{ base: "60px", md:"50px", lg: "70px" }} 
                                fontWeight="bold" 
                                position="absolute"
                                left="50%" 
                                transform="translateX(-50%)"
                                
                              >
                                {getFilledDailySlots(slot._id)} / {slot.noofslots}
                              </Text>

                              <Text color={"red.400"}>Hello Pamali work hard anith aya dakinkn...hondt oluwt aran wd krnna Pamali..Mn asai oya anith ayata adarshayk and hondt igengnna..hinawena ayata..Docker start krnw..Wish krnw honda Research group ekk hmbenna kiyl</Text>

                              <Box display="flex" flexDirection="column" ml="auto" justifyContent={"flex-end"} >
                                <Button 
                                  fontSize={"30px"} 
                                  backgroundColor={"black"} 
                                  mb={2} 
                                  color={"white"} 
                                  height={"50px"} 
                                  alignSelf={"flex-end"} 
                                  width={{base: "70px", lg:"60px"}}
                                  onClick={() => addSlot(slot._id)}
                                  >
                                  +
                                </Button>
                                <Button 
                                  fontSize={"30px"} 
                                  backgroundColor={"black"} 
                                  color={"white"} 
                                  height={"50px"} 
                                  alignSelf={"flex-end"} 
                                  width={{base: "70px", lg:"60px"}}
                                  onClick={() => removeSlot(slot._id)}
                                >
                                  -
                                </Button>
                              </Box>
                            </Box>


                            <Box 
                                flex="1" 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center" 
                                w="100%"
                                flexDirection="column"
                            >
                                <Text fontSize={"19px"} fontWeight={"light"}>
                                    Filled slots / Total slots
                                </Text>
                            </Box>
                            <Box 
                                flex="1" 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center" 
                                w="100%"
                                flexDirection="row"
                                mt={"10px"}
                            >
                                <Button 
                                  backgroundColor={"green.500"} 
                                  width={"50%"} 
                                  h={{base: "40px", lg:"50px"}}
                                  mr={"2"} 
                                  fontSize={"30px"}
                                  onClick={() => createRecordss(slot._id, "Arrival")} >
                                  +
                                </Button>
                                <Button 
                                  backgroundColor={"red.400"} 
                                  width={"50%"} 
                                  h={{base: "40px", lg:"50px"}}
                                  fontSize={"30px"} 
                                  onClick={() => createRecordss(slot._id, "Departure")} >
                                  -
                                </Button>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Text fontSize="lg" fontWeight="bold" color="gray.500">
                        No slots available
                    </Text>
                )}

          </SimpleGrid>

        

      </Container>
    )
}

export default Dashboard
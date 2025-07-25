import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { LuMoon, LuSun } from "react-icons/lu"

const Navbar = () => {

    //Color themes DONE
    const{ colorMode, toggleColorMode } = useColorMode();

    return (

        <div>
            <Container maxWidth={"container.2xl"} px={4} backgroundColor={"yellow.400"}>
                <Flex h={20} alignItems={"center"} justifyContent={"space-between"} flexDir={{base: "column", sm:"row"}}>
                    
                    <Link to={"/"} fontSize={{base: "22", sm: "19"}} color={"grey.800"}>Parking Lot</Link>

                    <HStack spacing={2} alignItems={"center"}>
                        <Link to={"/dashboard"}  fontSize={{base: "12", sm: "12"}} >Dashboard</Link>
                        <Link to={"/report"} fontSize={{base: "12", sm: "12"}}>Report</Link>
                        <Button onClick={toggleColorMode} size={['sm', 'md']}>
                            {colorMode === "light" ?  <LuMoon/>: <LuSun size={18}/>}
                        </Button>
                    </HStack>

                </Flex>
            </Container>
        </div>
    )
}

export default Navbar
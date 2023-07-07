import React from 'react'
import Navbar from '../navbar/Navbar'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { useState } from "react";

const Sales = () => {
  const [loadno, setLoadno] = useState('');
  const [agentno, setAgentno] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [consignments, setConsignments] = useState([]);



//   const handleSubmit = (event) => {
//     // console.log(sex?.value, breed?.value, weight, photoUrl);
//     const data = { load_id: loadno, agent_id: agentno, source: source, destination:destination};
//     const url = "http://localhost:8000/sales/addConsign/"
//     postJSON(url, data);
//     //fetchData()
//     event.preventDefault();
// };


// const fetchData = ()=> {
//     fetch('http://localhost:8000/logistics/getConsigns')
//     .then(results => results.json())
//     .then(data => {
//       setConsignments (data?.data)
            
//     });
//   }
//   useEffect(() => {
//        fetchData(); 
//        console.log("all goats", consignments) 
//   }, []);

  return (
    <div>
    <Navbar/>

    <h2 style={{padding:'20px'}} >Add Consignment</h2>
        <FormControl isRequired width='20%' marginLeft='30px' marginTop='30px'>
            <FormLabel >Load no</FormLabel>
                <Input 
                    type="text"
                    placeholder='Enter load no'
                    value={loadno}
                    onChange={(e) => setLoadno(e.target.value)}
                />
            <FormLabel >Agent no</FormLabel>
                <Input 
                    type="text"
                    placeholder='Enter agent no'
                    value={agentno}
                    onChange={(e) => setAgentno(e.target.value)}
                />
                
            <FormLabel >Source</FormLabel>
                <Input 
                    type="text"
                    placeholder='Enter Source'
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
            <FormLabel>Destination</FormLabel>
                <Input 
                    type="text"
                    placeholder='Enter destination' 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}    
                />
            <Button variant='solid' colorScheme='messenger' alignContent='center'  marginTop='20px'>
            Submit
            </Button>
        </FormControl>
    </div>
  )
}

export default Sales

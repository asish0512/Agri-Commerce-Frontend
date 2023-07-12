import React from 'react'
import Navbar from '../navbar/Navbar'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import {postJSON} from '../../backend/Data'


const Logistics = () => {
    const [loadno, setLoadno] = useState('');
    const [agentno, setAgentno] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [consignments, setConsignments] = useState([]);


    const handleSubmit =  async (event) => {
        const data = { load_id: loadno, agent_id: agentno, source: source, destination:destination};
        const url = "http://localhost:8000/logistics/addConsign/"
        await postJSON(url, data);
        fetchData()
        event.preventDefault();
    };


    const fetchData = ()=> {
        fetch('http://localhost:8000/logistics/getConsigns')
        .then(results => results.json())
        .then(data => {
          setConsignments (data?.data)
                
        });
      }
      useEffect(() => {
           fetchData(); 
      }, []);


  return (
    <div>
        <Navbar/>

        <TableContainer>
        <Table variant='simple' marginLeft='40px' padding='50px'>
            <Thead>
            <Tr>
                <Th>Load No</Th>
                <Th>Agent No</Th>
                <Th> Source</Th>
                <Th>Destination</Th>
            </Tr>
            </Thead>
            <Tbody>
                {
                    consignments.map((cgn) => {
                        return (
                        <Tr>
                        <Td>{cgn.load_id}</Td>
                        <Td>{cgn.agent_id}</Td>
                        <Td > {cgn.source}</Td>
                        <Td > {cgn.destination}</Td>
                        </Tr>
                        )
                    })
                }
            </Tbody>
        </Table>
        </TableContainer>


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
            <Button variant='solid' colorScheme='messenger' alignContent='center'  marginTop='20px' onClick={handleSubmit}>
            Submit
            </Button>
        </FormControl>
    </div>
  )
}

export default Logistics

import React, { useState,  useEffect} from 'react'
import Load from '../load/Load'
import { SimpleGrid, Button, ButtonGroup } from '@chakra-ui/react'
import Navbar from '../navbar/Navbar';
import { postJSON } from '../../backend/Data';


const Loads = () => {
  const [data, setData] = useState();
  const [click, setClick] = useState(false);
  const mapper = {}

  const fetchData = ()=> {
    fetch('http://localhost:8000/load/')
    .then(results => results.json())
    .then(data => {
      setData (data?.data)      
    });
  }
  useEffect(() => {
       fetchData(); 
  }, []);

    const handleMerge = () => {
      const loads = []  
      for (let i in mapper) {
        if (mapper[i] == 1)
          loads.push(i);
      }
      console.log(loads)
      setClick(prev => !prev);
      //post request merge operation
      const data = {'data': loads };
      const merge_url = "http://localhost:8000/load/mergeLoads/"
      postJSON(merge_url, data)
      fetchData();
    };

  const handleCreate =() => {
    const data = { };
    const url = "http://localhost:8000/load/createLoad/"
    postJSON(url, data);
    fetchData();
  };

  return (
    <div>
      <Navbar/>
      
      <ButtonGroup marginLeft='900px' padding='100px'>
        <Button variant='solid' colorScheme='messenger' alignContent='center' onClick={handleCreate}>
          Create group
        </Button>
        
        { click === false?  
        (<Button variant='solid' colorScheme='messenger' alignContent='center' onClick={() => setClick(!click)}>
          Select Merge Pool
        </Button>): 
        (<Button variant='solid' colorScheme='messenger' alignContent='center' onClick={() => setClick(!click)}>
          Deselect Merge Pool
        </Button>)
        }
        <Button variant='solid' colorScheme='messenger' alignContent='center' onClick={handleMerge}>
          Merge
        </Button>
      
      </ButtonGroup>

    <SimpleGrid columns={[2, null, 4]} spacing='40px' marginLeft='170px' marginBottom='150px' width='80%'>
    {
      data &&  data.map((ele) => { 
        return (
          <Load
            key = {ele.id}
            id = {ele.id}
            total={ele.goat_count}
            male = {ele.num_male}
            female = { ele.num_female}
            price = {ele.value_load}
            date = {ele.created_at}
            showCheckBox={click}
            mapper = {mapper}
          />
      )
    })
  }    
    </SimpleGrid>  
    </div>
  )
}

export default Loads

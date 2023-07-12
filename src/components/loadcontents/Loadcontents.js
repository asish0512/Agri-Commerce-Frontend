import React,{ useEffect} from 'react'
import Navbar from '../navbar/Navbar'
import {
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
    Button,
    ButtonGroup,
  } from '@chakra-ui/react'
import { useState } from "react";
import Select from 'react-select'
import { useParams } from 'react-router-dom';
import Goat from '../goat/Goat';
import {postJSON} from '../../backend/Data'
import { sexoptions, groupoptions, breedoptions } from '../../constants/constants';

const Loadcontents = () => {
    const [sex, setSex] = useState('');
    const [breed, setBreed] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [goats, setGoats] = useState([]);
    const [click, setClick] = useState(false);
    const [groupsize, setGroupsize] = useState('');
    const params = useParams();
    const mapper={}




    const fetchData = ()=> {
        fetch('http://localhost:8000/load/' + `${params?.loadId}/`)
        .then(results => results.json())
        .then(data => {
          setGoats (data?.data)
                
        });
      }
      useEffect(() => {
           fetchData(); 
      }, []);


      

    const handleSubmit = async (event) => {
        const data = { sex: sex?.value, breed: breed?.value, weight: weight, price:price, photo_url:photoUrl};
        const url = "http://localhost:8000/load/"+ `${params?.loadId}/`+"addGoat/"
        await postJSON(url, data);
        fetchData()
        event.preventDefault();
    };
    
    const createGroupsList = ()=>{
      let final = {}
      for (let i in mapper) {
        if (mapper[i] in final) {
          final[mapper[i]].push(i)
        }
        else {
          const temp = []
          temp.push(i)
          final[mapper[i]] = temp
        }
      }
      const finallist= []
      for (let i in final) {
        finallist.push(final[i])
      }
      
      return finallist
    }
    

    const handleSplit = ()=> {
      const data = {'data':createGroupsList()}
      const SPLIT_URL = "http://localhost:8000/load/"+ `${params?.loadId}/`+"splitGoats/"
      postJSON(SPLIT_URL, data);
    };


  return (
    <div style={{marginBottom:"100px"}}>
    <Navbar/>
    <div style={{display:'flex', flexDirection:'column'}}>
    {
    click === true ? (
    <>
    <div style={{width:'210px', marginLeft:'1050px', marginTop:'30px'}}>
    <Select 
        onChange={setGroupsize}
        placeholder='Group Size'
        value={groupsize}
        options={groupoptions}
    />
    </div>
    </>
    ):(<></>)
    }
    <div>
    <ButtonGroup marginLeft='1050px' marginTop='20px'>
        { click === false?  
        (<Button variant='solid' colorScheme='messenger' alignContent='center' onClick={() => setClick(!click)}>
          Split Group
        </Button>): 
        (<Button variant='solid' colorScheme='messenger' alignContent='center' onClick={() => setClick(!click)}>
          Unsplit Group
        </Button>)
        }
        <Button variant='solid' colorScheme='messenger' alignContent='center' onClick={handleSplit}>
          Split
        </Button>
    </ButtonGroup>
    </div>
    </div>
    <SimpleGrid columns={[2, null, 4]} spacing='40px' marginLeft='170px' marginTop='60px' marginBottom='50px' width='80%'>
    {
        goats && goats.map((goat) => {
            return (
                <Goat
                    key={goat.id}
                    id = {goat.id}
                    sex={goat.sex}
                    breed = {goat.breed}
                    weight = {goat.weight}
                    photourl={goat.photo_url}
                    showSelect = {click}
                    mapper={mapper}
                    groupsize={groupsize?.value}
                />
            )
        })
    }
    </SimpleGrid>
    
    <h2 style={{padding:'20px'}} >Add Goat</h2>
    <FormControl isRequired onSubmit={handleSubmit} width='20%' marginLeft='30px' marginTop='30px'>
        <FormLabel >Sex</FormLabel>
            <Select 
                onChange={setSex}
                placeholder='Select Sex'
                value={sex}
                options={sexoptions}
            />
        <FormLabel >Breed</FormLabel>
            <Select 
                onChange={setBreed}
                placeholder='Select Breed'
                value={breed}
                options={breedoptions}
            />
            
        <FormLabel >Weight</FormLabel>
            <Input 
                type="text"
                placeholder='Enter Weight'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
        <FormLabel >Price</FormLabel>
            <Input 
                type="text"
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
        <FormLabel>Photo URL</FormLabel>
            <Input 
                type="text"
                placeholder='Enter photo url' 
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}    
            />
        <Button variant='solid' colorScheme='messenger' alignContent='center' onClick={handleSubmit} marginTop='20px'>
          Submit
        </Button>
    </FormControl>

    </div>
  )
}

export default Loadcontents

import React,{useState, useEffect} from 'react'
import Navbar from '../navbar/Navbar'
import {
    SimpleGrid,
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'
import Select from 'react-select'
import Goatbuy from '../goatbuy/Goatbuy'
import {postJSON} from '../../backend/Data'
import { locationoptions } from '../../constants/constants'


const Purchases = () => {

  const [click, setClick] = useState(false);
  const [place, setPlace] = useState('');
  const [goats, setGoats] = useState([])
  const mapper = {}

  const fetchData = (place)=> {
    fetch('http://localhost:8000/buy/getGoatsDest/' +`${place}`)
    .then(results => results.json())
    .then(data => {
      setGoats (data?.data)
            
    });
  }
  useEffect(() => {
      if (place != null) {
       fetchData(place?.value); 
    } 
  }, [place]);

  const handleBuy = async()=> {
    const selectedgoats = []  
    for (let i in mapper) {
      if (mapper[i] == 1)
        selectedgoats.push(i);
    }
    setClick(prev => !prev);
    const data = {'data': selectedgoats };
    const buy_url = "http://localhost:8000/buy/buyGoats/"
    await postJSON(buy_url, data)
    fetchData();
  };

  return (
    <div>
      <Navbar/>
      <div style={{width:'210px', marginLeft:'1050px', marginTop:'30px'}}>
    <Select 
        onChange={setPlace}
        placeholder='Place'
        value={place}
        options={locationoptions}
    />
    </div>

    <ButtonGroup marginLeft='1050px' marginTop='20px'>
        { click === false?  
        (<Button variant='solid' colorScheme='messenger' alignContent='center' onClick={() => setClick(!click)}>
          Create Cart
        </Button>): 
        (<Button variant='solid' colorScheme='messenger' alignContent='center' onClick={() => setClick(!click)}>
          Empty Cart
        </Button>)
        }
        <Button variant='solid' colorScheme='messenger' alignContent='center' onClick={handleBuy}>
          Buy
        </Button>
    </ButtonGroup>

 

    <SimpleGrid columns={[2, null, 4]} spacing='40px' marginLeft='170px' marginTop='60px' marginBottom='50px' width='80%'>
    {
        goats && goats.map((goat) => {
            return (
                <Goatbuy
                    key={goat.id}
                    id = {goat.id}
                    sex={goat.sex}
                    breed = {goat.breed}
                    weight = {goat.weight}
                    photourl={goat.photo_url}
                    showCheckBox = {click}
                    mapper={mapper}
                />
            )
        })
    }
    </SimpleGrid>
    </div>
  )
}

export default Purchases

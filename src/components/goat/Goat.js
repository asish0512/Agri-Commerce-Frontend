import React, { useEffect, useState } from 'react'
import {Card, CardBody, Heading, Stack, Image, Divider, Text } from '@chakra-ui/react'
import Select from 'react-select'
import { Link } from 'react-router-dom'

const Goat = ({id, sex, breed, weight, photourl, showSelect, mapper, groupsize}) => {
  const [group, setGroup] = useState("")
  

  const groupno = []  
  for (let i = 1;i<=groupsize;i++) {
    groupno.push({ 'value':i,'label':i})
  }
  
  useEffect(() => {
    mapper[id] = group.value
  },[group]);
  
  return (
    <div>
      <Card maxW='220px'>
        <CardBody borderRadius='10px' border='6px solid' borderColor='cornflowerblue'>
          <Stack mt='6' spacing='3'>
          { 
            showSelect === true ? (
            <>
            <Select 
                onChange={setGroup}
                placeholder='assign group'
                value={group}
                options={groupno}
            />
            </>
            ):(
            <>
            </>
            )
            
          }
            <Heading size='md'>Goat {id}</Heading>
            <Text>
              Sex : {sex}
            </Text>
            <Text>
              Breed : {breed}
            </Text>
            <Text>
              Weight : {weight}
            </Text>
            <Link to={{pathname: "/image/" + id+"/", state: photourl}} >
            <Image
                boxSize='100px'
                objectFit='cover'
                src={photourl}
            />
            </Link>
          </Stack>
        </CardBody>
        <Divider />
      </Card>
    </div>
  )
}

export default Goat

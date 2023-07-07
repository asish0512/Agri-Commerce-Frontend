import React from 'react'
import {Card, CardBody, Checkbox, Heading, Stack, Image, Divider, Text } from '@chakra-ui/react'


const Goatbuy = ({id, sex, breed, weight, photourl, showCheckBox, mapper}) => {

  
  return (
    <div>
      <Card maxW='220px'>
        <CardBody borderRadius='10px' border='6px solid' borderColor='cornflowerblue'>
          <Stack mt='6' spacing='3'>
          { 
            showCheckBox === true ? (
            <>
            <Checkbox 
            size='lg' 
            colorScheme='blue' 
            onChange={() => {
                if (mapper[id] === 1)
                  mapper[id] = 0
                else  
                 mapper[id] = 1
                 console.log(mapper)
              }
            }
            >
              Add
            </Checkbox>
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
            <Image
                boxSize='100px'
                objectFit='cover'
                src={photourl}
            />
        
          </Stack>
        </CardBody>
        <Divider />
      </Card>
    </div>
  )
}

export default Goatbuy

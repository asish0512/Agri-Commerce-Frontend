import React from 'react'
import {Checkbox, Card, CardBody, Heading, Stack, ButtonGroup, Button, CardFooter, Divider, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';


const Load = ({id, total, male, female,price, date, showCheckBox, mapper}) => {
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
            <Heading size='md'>Load {id}</Heading>
            <Text>
              Totals Goats : {total}
            </Text>
            <Text>
              Male Goats : {male}
            </Text>
            <Text>
              Female Goats : {female}
            </Text>
            <Text>
              Total Value : {price}
            </Text>
            <Text>
              Date Created : {date}
            </Text>
        
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup>
          <Link to={"/loads/" + id}>
            <Button variant='solid' colorScheme='messenger' alignContent='center' marginLeft='30px'>
              See details
            </Button>
          </Link>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Load

import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <ButtonGroup marginLeft='60px' marginTop='50px'>
        <Link to={"/loads/"}>
        <Button variant='solid' colorScheme='messenger' alignContent='center'>
          Loads
        </Button>
        </Link>
        <Link to={"/sales/"}>
        <Button variant='solid' colorScheme='messenger' alignContent='center'>
          Sales
        </Button>
        </Link>
        <Link to={"/purchases/"}>
        <Button variant='solid' colorScheme='messenger' alignContent='center'>
          Purchases
        </Button>
        </Link>
        <Link to={"/logistics/"}>
        <Button variant='solid' colorScheme='messenger' alignContent='center'>
          Logistics
        </Button>
        </Link>
      </ButtonGroup>
  )
}

export default Navbar

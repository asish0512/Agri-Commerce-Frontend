import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Loads from './components/loads/Loads';
import Loadcontents from './components/loadcontents/Loadcontents';
import { Route, Routes } from "react-router-dom";
import Sales from './components/sales/Sales';
import Purchases from './components/purchases/Purchases'
import Logistics from './components/logistics/Logistics';
import LabelStudioTest from './components/image/Imageanno';


function App() {
  return (
    <ChakraProvider>        
      <Routes>
        <Route path="/loads" element={<Loads/>} />
        <Route path="/loads/:loadId" element={<Loadcontents/>}/>
        <Route path="/image/:goatId/" element={<LabelStudioTest/>}/>
        <Route path="/purchases/" element={<Purchases/>}/>
        <Route path="/sales/" element={<Sales/>}/>
        <Route path="/logistics/" element={<Logistics/>}/>
      </Routes>
    </ChakraProvider>
  );
}

export default App;

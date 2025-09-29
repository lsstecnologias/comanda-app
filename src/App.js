import logo from './logo.svg';
import './App.css';
import Comanda from './components/comanda';

import axios from 'axios';
import { useEffect, useState } from 'react';

const $ = require("jquery");

function App() {

  return (
    <div className="App">
      <Comanda />
    </div>
  )

}

export default App;

import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import UmbrellaCustomizer from './UmbrellaCustomizer';

interface BackgroundColor
  {
    [key: string]: string;
  }

interface Color
  {
    [key: string]: {
      background:string,
      file:string
    }
    
  }

const color :Color={

    'pink':{
      background:"#fee1f1",
      file:require('./images/pink_umbrella.png')
    }
      ,
    "yellow":{
      background:"#F6f181",
      file:require('./images/blue_umbrella.png')
    },
    "blue":{
      background:'#e5f5fe',
      file:require('./images/yellow_umbrella.png')
    },
    }

const backgroundColor :BackgroundColor={
'pink':"#fee1f1",
"yellow":"#F6f181",
"blue":'#e5f5fe',
}


const App: React.FC = () => {
  const startColor="pink";
  const startBackground=color[startColor].background
  const [appBackgroundColor, setAppBackgroundColor] = useState<string>(startBackground);
 

  const handleBackgroundColorChange = (newcolor: string) => {
    setAppBackgroundColor(color[newcolor].background);
  };

  return (
    <div className="App" style={{ backgroundColor: appBackgroundColor}}>
      <UmbrellaCustomizer onColorChange={handleBackgroundColorChange} defaultColor={startColor} colorProperties={color} />
    </div>
  );
}

export default App;

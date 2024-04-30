import React, { useState, ChangeEvent } from 'react';
import './UmbrellaCustomizer.css';
import { Color } from './interfaces';
import { inherits } from 'util';


interface Props {
  onColorChange: (color: string) => void,
  defaultColor:string,
  colorProperties:Color
}


const UmbrellaCustomizer: React.FC <Props>  = (Props) => {
  const [umbrellaColor, setUmbrellaColor] = useState<string>(Props.defaultColor);
  const [loading, setLoading] = useState(false);// loading true or false
  const [fileName, setfileName] = useState("Upload Logo");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string>(Props.defaultColor);

  const handleColorChange = (color: string) => {
    setUmbrellaColor(color);
    Props.onColorChange(color);
    setSelectedButton(color)
    startTimer();
  };
  const removeLogo=()=>{
    setfileName('Upload Logo');
    setLogoPreview(null);
  }

  const startTimer = () => {
    // Set loading true for animation 
    setLoading(true);
    console.log("timeout");
  
    // Set loading to false after 5 seconds
    setTimeout(() => {
      setLoading(false);
      console.log("timeout");
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check fi
    
    
      const allowedExtensions = ["image/jpeg", "image/png"];
      if (!allowedExtensions.includes(file.type)) {
        alert("Please upload a file with a .jpg or .png extension.");
        return;
      }
  
      // Check file size
      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
      if (file.size > maxSize) {
        alert("File size exceeds the limit of 5 MB.");
        return;
      }     

      startTimer();

      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      let fileName = file.name;
      if (fileName.length > 20) {
        const extensionIndex = fileName.lastIndexOf('.')-2;
        const nameWithoutExtension = fileName.substring(0, extensionIndex);
        const extension = fileName.substring(extensionIndex);
        const truncatedName = nameWithoutExtension.substring(0, 10) + '...' + extension;
        fileName = truncatedName;
      }

      fileName=fileName.toUpperCase();
      setfileName(fileName);//set file name

    }

   

  
   
  }; 

  return (
    <div className="customizer">
      <div className="umbrella-container"> 
      { loading  ?(
          <div className="loading-spinner spinner-path">
              <svg  aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 28.3 31.2" width="inherit" height="inherit" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M25.1 23.6c-.3.1-.6.2-1 .2-.6.1-1.3 0-2.1.1s-1.7.3-2.6.8c-.8.5-1.4 1.1-1.9 1.6-.7.9-1.1 1.7-1.5 2.2-.2.3-.4.4-.7.6-.2.1-.4.2-.8.2v-13L26 22.9c-.3.3-.6.5-.9.7m-11.3 5.9c-.5-.1-.8-.2-1-.4-.2-.2-.5-.4-.7-.7-.3-.5-.7-1.1-1.2-1.7-.5-.7-1.1-1.3-2.1-1.9-.8-.5-1.6-.7-2.3-.8-1.1-.2-2-.1-2.7-.2l-.9-.3c-.2-.1-.4-.3-.6-.6l11.4-6.6v13.2zM1.7 21.3c0-.3.1-.6.2-1 .2-.5.6-1.1.9-1.9.3-.8.6-1.7.6-2.8v-.1c0-1.5-.6-2.6-1-3.5l-.6-1.2c-.1-.4-.2-.7-.2-1 0-.3.1-.6.2-1l11.4 6.6-11.3 6.8c-.1-.4-.2-.7-.2-.9M3.2 7.6c.3-.1.6-.2 1-.2.6-.1 1.3 0 2.1-.1.7-.2 1.6-.4 2.5-.9.8-.5 1.4-1.1 1.9-1.6.7-.9 1.1-1.7 1.5-2.2.2-.3.4-.4.7-.6.2-.1.5-.2.8-.2V15L2.3 8.3c.3-.4.6-.6.9-.7m11.3-5.9c.5 0 .8.2 1 .4.2.2.5.4.7.7.3.5.7 1.1 1.2 1.7.5.7 1.1 1.3 2.1 1.9.8.5 1.6.7 2.4.8 1.1.1 2 .1 2.7.2l.9.3c.2.1.4.3.6.6l-11.4 6.6V1.7zm12.1 8.2c0 .3-.1.6-.2 1-.2.5-.6 1.1-.9 1.9-.3.8-.6 1.7-.6 2.8v.2c0 1.5.5 2.6 1 3.5l.6 1.2c.1.4.2.7.2 1 0 .3-.1.6-.2.9l-11.4-6.6L26.3 9c.2.4.3.7.3.9m.4 7.8c-.3-.6-.5-1.3-.5-2v-.1c0-1 .4-1.8.8-2.7.2-.4.5-.8.6-1.3.2-.5.3-1 .3-1.6 0-.7-.2-1.4-.6-2.1-.5-.8-1.1-1.4-1.8-1.7-.5-.2-1-.3-1.5-.4-.7-.1-1.4-.1-2.1-.1-.7-.1-1.3-.2-1.9-.6-.6-.3-1-.7-1.4-1.2-.5-.9-.9-1.7-1.6-2.5-.3-.4-.7-.8-1.3-1-.5-.3-1.1-.4-1.9-.4-1 0-1.8.2-2.4.7-.5.3-.8.7-1.1 1.1-.4.6-.7 1.2-1.1 1.7-.4.5-.8 1-1.5 1.4-.6.4-1.2.5-1.8.6-.9.1-1.8 0-2.8.2-.5.1-1 .3-1.5.7-.5.3-.9.8-1.3 1.4C.2 8.5 0 9.3 0 10c0 .6.1 1.1.3 1.6.3.7.7 1.3 1 2 .3.6.5 1.3.5 2.1v.1c0 1.1-.4 1.8-.8 2.7-.2.4-.5.8-.6 1.3-.2.5-.3 1-.3 1.6 0 .7.2 1.4.6 2.1.5.8 1.1 1.4 1.8 1.7.5.2 1 .3 1.5.4.7.1 1.4.1 2.1.1.7.1 1.3.2 2 .6.6.3 1 .7 1.4 1.2.5.7.9 1.5 1.6 2.3.3.4.7.7 1.3 1 .5.3 1.2.4 1.9.4 1 0 1.8-.3 2.4-.7.5-.3.8-.7 1.1-1.1.4-.6.8-1.2 1.2-1.7.4-.5.8-1 1.5-1.4.6-.3 1.1-.5 1.7-.6.9-.1 1.8 0 2.8-.2.5-.1 1-.3 1.5-.6s.9-.8 1.3-1.4c.4-.7.6-1.5.6-2.1 0-.6-.1-1.1-.3-1.6-.5-.9-.8-1.5-1.1-2.1"></path></svg>         
          </div>

        ):( <img
          className="umbrella"
          src={Props.colorProperties[umbrellaColor].file}                
          alt="Umbrella"
        />                
        )}  

        {(logoPreview && !loading)  && (
          <img
            className="logo-preview"
            src={logoPreview}
            alt="Logo Preview"
          />
        )}                
            
      </div>
      <div className="color-swatches">        
        
         
        
        <div className="customization-section">
          <h1>Custom Umbrella</h1>
          <div className="color-swatches">
          {Object.keys(Props.colorProperties).map((color) => (
            <button
              key={color}
              style={{backgroundColor:Props.colorProperties[color].color}}
              className={`swatch ${selectedButton === color ? 'selected' : ''}`}
              onClick={() => handleColorChange(color)}
            ></button>
          ))}
          </div>

          
          <p><strong>Customise Your Umbrella</strong><br></br>Upload Logo for instance</p>
          <p><small>.png and .jpg file only.Max size 5MB</small></p>
          
          
          <div className="upload-container">
            <input type="file" style={{visibility:"hidden"}} id="upload" className="upload-input" onInput={handleLogoUpload}/>            
            <label htmlFor="upload"  style={{backgroundColor:Props.colorProperties[umbrellaColor].color}} className="upload-button verticalalign" >


              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-upload verticalalign"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                  />
                  <path
                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"
                  />
              </svg>   
              
              <span className="text verticalalign">{fileName}</span>
              {logoPreview && (
                <button className="close-button" onClick={removeLogo}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.354 4.354a.5.5 0 0 1 .708 0L8 6.293l2.938-2.939a.5.5 0 1 1 .708.708L8.707 7l2.939 2.938a.5.5 0 1 1-.708.708L8 7.707l-2.938 2.939a.5.5 0 1 1-.708-.708L7.293 7 4.354 4.062a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
                )}


            </label>
          </div>

        
        </div>
        
        
       </div>
        
        
        
    </div>
  );
};

export default UmbrellaCustomizer;


import React, { useState, ChangeEvent } from 'react';
import './UmbrellaCustomizer.css';
import { Color } from './interfaces';


interface Props {
  onColorChange: (color: string) => void,
  defaultColor:string,
  colorProperties:Color
}


const UmbrellaCustomizer: React.FC <Props>  = (Props) => {
  const [umbrellaColor, setUmbrellaColor] = useState<string>(Props.defaultColor);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string>(Props.defaultColor);

  const handleColorChange = (color: string) => {
    setUmbrellaColor(color);
    Props.onColorChange(color);
    setSelectedButton(color)
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }; 

  return (
    <div className="customizer">
      <div className="umbrella-container">                   
        <img
          className="umbrella"
          src={Props.colorProperties[umbrellaColor].file}                
          alt="Umbrella"
        />
        {logoPreview && (
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
              className={`swatch ${color} ${selectedButton === color ? 'selected' : ''}`}
              onClick={() => handleColorChange(color)}
            ></button>
          ))}
          </div>

          
          <p><strong>Customise Your Umbrella</strong><br></br>Upload Logo for instance</p>
          <p><small>.png and .jpg file only.Max size 5MB</small></p>
          
          
          <div className="upload-container">
            <input type="file" style={{visibility:"hidden"}} id="upload" className="upload-input" onInput={handleLogoUpload}/>            
            <label htmlFor="upload" className="upload-button verticalalign">
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
              <span className="text verticalalign">Upload Logo</span>
            </label>
          </div>

        
        </div>
        
        
       </div>
        
        
        
    </div>
  );
};

export default UmbrellaCustomizer;


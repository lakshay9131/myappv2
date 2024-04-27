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

  const handleColorChange = (color: string) => {
    setUmbrellaColor(color);
    Props.onColorChange(color);
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
        {Object.keys(Props.colorProperties).map((color) => (
          <button
            key={color}
            className={`swatch ${color}`}
            onClick={() => handleColorChange(color)}
          ></button>
        ))}
        {/* Add more color swatches as needed */}
      </div>
      <input type="file" id="logo-input" accept="image/*" onChange={handleLogoUpload} />
    </div>
  );
};

export default UmbrellaCustomizer;


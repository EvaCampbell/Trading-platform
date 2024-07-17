import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import axios from 'axios';
import ReactCountryFlag from "react-country-flag";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const countryCodes = {
  "AUDUSD": { country: "Australia", country_code: "AU" },
  "EURCHF": { country: "Europe", country_code: "EU" },
  "EURJPY": { country: "Europe", country_code: "EU" },
  "EURUSD": { country: "Europe", country_code: "EU" },
  "GBPUSD": { country: "United Kingdom", country_code: "GB" },
  "NZDUSD": { country: "New Zealand", country_code: "NZ" },
  "USDCAD": { country: "United States", country_code: "US" }
};

export default function Country() {
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://13.41.72.245/current_prices')
      .then(response => {
        console.log("API Response Data:", response.data);
        const responseData = response.data.prices[0];
        const transformedData = Object.keys(responseData).map(key => ({
          pair: key,
          price: responseData[key],
          ...countryCodes[key]
        }));
        console.log("Transformed Data:", transformedData);
        setData(transformedData);
        
        if (transformedData.length > 0) {
          setSelectedCountry(transformedData[0].country_code);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box sx={{ margin: '2rem 0rem' }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry}
          onChange={handleChange}
          input={<OutlinedInput label="Country" />}
          MenuProps={MenuProps}
        >
          {data.length > 0 ? (
            data.map((item, index) => (
              <MenuItem key={index} value={item.country_code}>
                <ReactCountryFlag countryCode={item.country_code} svg style={{ marginRight: '8px' ,justifyContent:'space-between', color:'white'}} />
                {item.country} -      {item.price}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No data available</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}

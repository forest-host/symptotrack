import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import ReactSelect from 'react-select';

// Utils
import { useDebounce } from '../../../utils';

// Components
import Icon from '../../Icon';
import Tooltip from '../../General/Tooltip';
import { MyLocation } from '../../Map';

// Styling
import { Box, Button, Flex, Text } from '../../styles';
import { SLabel, SLocation, SSelect } from './styles';

const Location = forwardRef(({ name, translation, error, width, placeholder }, ref) => {
  const [isLoading, setLoading] = useState(false);
  const [location, setLocation] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getLocation = async (query) => {
    const provider = new OpenStreetMapProvider();

    // search
    const results = await provider.search({ query });
    setSuggestions(results);
    setLoading(false);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      getLocation(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <Flex mb={30} mt={[15, 0]} width={[1, 1 / 2]} flexDirection="column">
      {translation?.question && (
        <Box mb={24} width={[7 / 12, 1]}>
          <SLabel as="span" htmlFor={name}>
            {translation.question}
          </SLabel>
        </Box>
      )}
      {translation?.tooltip && (
        <Tooltip question={translation.tooltip.question} answer={translation.tooltip.answer} />
      )}
      <Box width={width}>
        <Box mb={40}>
          <SLocation>
            <ReactSelect
              isSearchable
              options={suggestions}
              onInputChange={(e) => setSearchTerm(e)}
              onChange={({ x, y }) => setLocation([y, x])}
              styles={SSelect}
              placeholder={translation?.placeholder || placeholder}
              isLoading={isLoading}
            />
            <input type="hidden" name={name} ref={ref} value={location} />
            <Button type="button">
              <Icon icon="SEARCH" viewBox="0 0 512 512" color="white" size={15} />
            </Button>
          </SLocation>
        </Box>
        {location && (
          <MyLocation id={`map-${name}`} position={location} newLocation={setLocation} />
        )}
      </Box>
      {error && (
        <Text mt={10} fontSize={12}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
});

Location.propTypes = {
  name: PropTypes.string.isRequired,
  translation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  placeholder: PropTypes.string,
};

Location.defaultProps = {
  translation: null,
  error: false,
  width: 1,
  placeholder: ' ',
};

export default Location;

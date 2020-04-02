import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Styling
import { SLegend } from './styles';
import { SCheckbox } from '../Form/FieldTypes/styles';
import { Box, Flex, Heading, Text } from '../styles';

const Legend = ({ info, filters, setFilters }) => {
  const onFilterClick = (symptom) => {
    if (filters?.length > 0 && filters.includes(symptom)) {
      setFilters(filters?.filter((s) => s !== symptom));
    } else {
      setFilters([...filters, symptom]);
    }
  };

  return (
    <SLegend pt={15} pb={25} px={[10, 30]} bg="white">
      <Heading.H4 color="blue">{info.legend}</Heading.H4>
      <Flex mt={[0, 15]} flexWrap={['wrap', 'inherit']}>
        {info?.symptoms &&
          Object.keys(info.symptoms)?.map((symptom) => {
            let color = 'orange';
            switch (symptom) {
              case 'fever':
                color = 'black';
                break;
              case 'fatigue':
                color = 'blue';
                break;
              case 'dry_cough':
                color = 'orange';
                break;
              default:
                color = 'orange';
                break;
            }

            return (
              <Flex
                key={uuid()}
                width={[1 / 2, 'inherit']}
                mt={[20, 0]}
                px={['5px', 15]}
                alignItems="center"
              >
                <Box
                  mr="8px"
                  width={16}
                  bg={color}
                  css={{ height: 16, opacity: 0.7, borderRadius: '50%' }}
                />
                <SCheckbox as="label" htmlFor={symptom} alignItems="center" pl={35} fontSize={14}>
                  <input
                    type="checkbox"
                    id={symptom}
                    name={symptom}
                    checked={filters?.length > 0 && filters.includes(symptom)}
                    onClick={() => onFilterClick(symptom)}
                  />
                  <Text as="span" />
                  {info.symptoms[symptom]}
                </SCheckbox>
              </Flex>
            );
          })}
      </Flex>
    </SLegend>
  );
};

Legend.propTypes = {
  info: PropTypes.shape({
    legend: PropTypes.string,
    symptoms: PropTypes.object,
  }).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string),
  setFilters: PropTypes.func.isRequired,
};

Legend.defaultProps = {
  filters: [],
};

export default Legend;

import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

// Utils
import { withTranslation } from '../i18n';

// Components
import Hero from '../components/Hero';

// Styling
import { Container } from '../components/styles';

const SymptoMap = dynamic(() => import('../components/Map'), { ssr: false });

const Map = ({ t, test, z, top, right, bottom, left }) => {
  const mapInfo = t('map:map', { returnObjects: true });

  return (
    <>
      {!test && (
        <Container pt={[20, 40]} pb={70} relative>
          <Hero title={t('map:title')} content={t('map:content')} />
          <img src="/static/avatar.jpg" alt="SymptomenKaart" />
        </Container>
      )}
      {test && <SymptoMap coordinates={{ z, top, right, bottom, left }} mapInfo={mapInfo} />}
    </>
  );
};

Map.propTypes = {
  t: PropTypes.func.isRequired,
  z: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Map.defaultProps = {
  z: 8,
  top: 54.4,
  left: -1.22,
  bottom: 50,
  right: 13,
};

Map.getInitialProps = async (ctx) => {
  const { test, z, top, right, bottom, left } = ctx.query;

  return { test, z, top, right, bottom, left, namespacesRequired: ['common', 'map', 'socials'] };
};

export default withTranslation('map')(Map);

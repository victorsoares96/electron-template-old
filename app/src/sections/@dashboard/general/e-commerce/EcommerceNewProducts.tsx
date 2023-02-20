import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';

import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { _ecommerceNewProducts } from '@src/_mock';
import Image from '@src/components/Image';
import { CarouselDots } from '@src/components/carousel';

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

interface CarouselItemProps {
  item: {
    image: string;
    name: string;
  };
}

function CarouselItem({ item }: CarouselItemProps) {
  const { image, name } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          New
        </Typography>
        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {name}
        </Typography>
        <Button to="#" variant="contained" component={RouterLink}>
          Buy Now
        </Button>
      </CardContent>
      <OverlayStyle />
      <Image alt={name} src={image} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}

export default function EcommerceNewProducts() {
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24 }),
  };

  return (
    <Card>
      <Slider {...settings}>
        {_ecommerceNewProducts.map(item => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

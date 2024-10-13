import { Image } from 'react-bootstrap';

interface FoodceptionImageProps {
  src: string;
  alt: string;
}

const FoodceptionImage: React.FC<FoodceptionImageProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} fluid />;
};

export default FoodceptionImage;

interface FoodceptionImageProps {
  src: string;
  alt: string;
}

const FoodceptionImage: React.FC<FoodceptionImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className='img-fluid' />;
};

export default FoodceptionImage;

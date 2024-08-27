interface FoodceptionHeaderProps {
  children: React.ReactNode;
}
const FoodceptionHeader: React.FC<FoodceptionHeaderProps> = ({ children }) => {
  return <h1 className='text-center'>{children}</h1>;
};

export default FoodceptionHeader;

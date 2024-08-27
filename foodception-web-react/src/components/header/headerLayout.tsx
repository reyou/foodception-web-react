import '../../css/components/HeaderLayout.css';

interface HeaderLayoutProps {
  backgroundImage: string;
  title: JSX.Element;
  subTitle: string;
}

function HeaderLayout({ title, subTitle, backgroundImage }: HeaderLayoutProps) {
  return (
    <header
      className='header'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='content'>
        <div className='title-overlay'>{title}</div>
        <div className='subtitle-overlay'>
          <h4>{subTitle}</h4>
        </div>
      </div>
    </header>
  );
}

export default HeaderLayout;

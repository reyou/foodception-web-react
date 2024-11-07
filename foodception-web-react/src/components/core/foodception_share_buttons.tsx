import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  XIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';
import { FacebookIcon, PinterestIcon } from 'react-share';

interface FoodceptionShareButtonsProps {
  url: string;
  hashtag: string;
  title: string;
  media: string;
}

const FoodceptionShareButtons: React.FC<FoodceptionShareButtonsProps> = ({
  url,
  hashtag,
  title,
  media
}) => {
  return (
    <Row className='text-center mt-3'>
      <Col>
        <FacebookShareButton url={url} hashtag={hashtag} className='me-2'>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title} className='me-2'>
          <XIcon size={32} round />
        </TwitterShareButton>
        <PinterestShareButton
          url={url}
          media={media}
          description={title}
          className='me-2'
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
        <WhatsappShareButton url={url} title={title} className='me-2'>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <EmailShareButton
          url={url}
          subject={title}
          body={`Check out this recipe: ${title}`}
          className='me-2'
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </Col>
    </Row>
  );
};

export default FoodceptionShareButtons;

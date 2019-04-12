import styled from 'styled-components';
import MicrolinkCard from '@microlink/react';

const LinkCard = styled(MicrolinkCard)`
  width: 100%;
  height: 100px;
  border-radius: 14px;

  body & {
    background-color: transparent;
    border: none;
    color: rgb(136, 153, 166);

    &:hover {
      background-color: rgba(29, 161, 242, 0.05);
      border: none;
      text-decoration: none;
    }
  }

  & .microlink_card__content_title {
    color: rgb(255, 255, 255);
    font-size: 15px;
    font-weight: 400;
  }
`;

const linkCardStyles = {};

export default { ...LinkCard, ...linkCardStyles };

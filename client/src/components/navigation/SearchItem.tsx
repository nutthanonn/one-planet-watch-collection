import React from 'react';
import { H5 } from '@common/Typography';
import styled from 'styled-components';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonBackground from '@assets/images/skeleton-background.png';
import { Post } from '@interfaces/UserProfile';

interface NavigationChildProps {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  post?: Post[];
  follower?: string[];
  following?: string[];
}

const SearchItem: React.FC<NavigationChildProps> = (props) => {
  return (
    <Flex>
      <LazyLoadImage
        src={props.avatar ?? 'http://xsgames.co/randomusers/avatar.php?g=pixel'}
        width={50}
        draggable={false}
        alt={props.username}
        placeholderSrc={SkeletonBackground}
        style={{ borderRadius: '5px', width: '50px', height: '50px' }}
      />
      <Heading>
        {props.username}
        <br />
        <Inline>
          {props.bio ? <ShortestSpan short={true}>{props.bio} &middot;</ShortestSpan> : ''}
          <ShortestSpan>{props.post?.length} Posts</ShortestSpan> &middot;
          <ShortestSpan>Followed by {props.follower?.length ?? 0}</ShortestSpan>
        </Inline>
      </Heading>
    </Flex>
  );
};

export default SearchItem;

const Flex = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Heading = styled(H5)`
  font-weight: 500;
  font-size: 1rem;
`;

const ShortestSpan = styled.span`
  font-size: 0.75rem;

  ${(props: { short?: boolean }) =>
    props.short
      ? '  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width:100px'
      : ''}
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.25);
  gap: 0.2rem;
`;

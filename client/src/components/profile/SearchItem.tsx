import React from 'react';
import { H5 } from '@common/Typography';
import styled from 'styled-components';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonBackground from '@assets/images/skeleton-background.png';
import { Collection } from '@interfaces/WatchApi';

const SearchItem: React.FC<Collection> = (props) => {
  return (
    <Flex>
      <LazyLoadImage
        src={props.image}
        width={100}
        draggable={false}
        alt={'watch'}
        placeholderSrc={SkeletonBackground}
        style={{ borderRadius: '5px', width: '70px', height: '80px' }}
      />
      <Heading>
        {props.name}
        <br />
        <Inline>
          <ShortestSpan short={true}>{props.description} &middot;</ShortestSpan>
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
      ? '  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width:200px'
      : ''}
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.25);
  gap: 0.2rem;
`;

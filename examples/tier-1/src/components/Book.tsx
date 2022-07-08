import * as React from 'react';
import styled from 'styled-components';
import { useData } from 'react-alpine';
import Image from './Image';
import frontPng from '../assets/front-small.png';
import frontWebp from '../assets/front-small.webp';

const Intro = styled.q`
  font-size: 2rem;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
`;

const Section = styled.section`
  grid-area: book;
`;

const Center = styled.div`
  text-align: center;
`;

function Book() {
  const { data, inc, count } = useData(() => {
    return {
      count: 0,
      inc() {
        // @ts-ignore
        this.count += 1;
      },
    };
  });

  return (
    <Section>
      <h2>The Idea</h2>
      <Center>
        <Image
          source={frontWebp}
          fallback={frontPng}
          alt="The Art of Micro Frontends Book Cover"
          width={250}
          height={371}
        />
      </Center>
      <Intro>Look here</Intro>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora repellendus ex ducimus maiores repudiandae
        optio mollitia nulla totam, accusantium quibusdam cupiditate quidem iste consequatur minus assumenda nobis amet?
        Quo, at.
      </p>
      <div {...data}>
        <button {...inc.click}>
          Increment <span {...count.text}>{count.current}</span>
        </button>
        <p {...count.text}>{count.current}</p>
      </div>
    </Section>
  );
}

export default Book;

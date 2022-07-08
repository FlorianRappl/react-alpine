import * as React from 'react';
import styled from 'styled-components';
import Articles from './Articles';
import Book from './Book';
import Links from './Links';
import Talks from './Talks';
import Shops from './Shops';
import Header from './Header';
import Footer from './Footer';

const Grid = styled.div`
  display: grid;
  grid-column-gap: 1.5rem;
  grid-gap: 1.5rem;
  grid-row-gap: 0.5rem;

  @media only screen and (max-width: 999px) {
    grid-template-areas:
      'book'
      'articles'
      'talks'
      'shops'
      'links';
  }

  @media only screen and (min-width: 1000px) {
    grid-template-areas:
      'book         book'
      'articles    talks'
      'articles    links'
      'articles    shops';
    grid-template-columns: 1fr 1fr;
  }
`;

function Content() {
  return (
    <>
      <Header />
      <Grid>
        <Book />
        <Articles />
        <Shops />
        <Talks />
        <Links />
      </Grid>
      <Footer />
    </>
  );
}

export default Content;

import * as React from 'react';
import styled from 'styled-components';
import Articles from './Articles';
import Examples from './Examples';
import Book from './Book';
import Videos from './Videos';
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
      'videos'
      'examples'
      'shops'
      'links';
  }

  @media only screen and (min-width: 1000px) {
    grid-template-areas:
      'book         book'
      'articles   videos'
      'articles examples'
      'articles    shops'
      'talks       links';
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
        <Examples />
        <Shops />
        <Talks />
        <Videos />
        <Links />
      </Grid>
      <Footer />
    </>
  );
}

export default Content;

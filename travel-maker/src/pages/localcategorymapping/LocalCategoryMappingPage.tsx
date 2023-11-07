import React from 'react';
import { HeaderComponent } from '../detailmapping/HeaderComponent';
import styled from 'styled-components';
import LocalMap from '../../components/localcategorymapping/LocalMap';

const LocalCategoryMappingPage = () => {
  return (
    <>
      <HeaderComponent/>
      <MainContainer>
        <MapContainer>
          <LocalMap/>
        </MapContainer>
        <ListContainer>
          <ResultDiv></ResultDiv>
          <DetailListContainer>
            <DetailListDiv></DetailListDiv>
          </DetailListContainer>
          <CheckPageDiv></CheckPageDiv>
        </ListContainer>
      </MainContainer>
    </>
  );
};

export default LocalCategoryMappingPage;

const MainContainer = styled.div`
  width: 84.375rem;
  height: 53.5rem;
  display: flex;
  border: 1px red solid;
  align-items: center;
  justify-content: center;
`

const MapContainer = styled.div`
  width: 59.375rem;
  height: 45rem;
`

const ListContainer = styled.div`
  width: 21.875rem;
  height: 45rem;
  display: flex;
  flex-direction: column;
  border: 1px blue solid;
  align-items: center;
  justify-content: center;
`

const ResultDiv = styled.div`
  width: 18.75rem;
  height: 5rem;
  border: 1px yellow solid;
  margin-top: 1.25rem;
`

const DetailListContainer = styled.div`
  width: 18.75rem;
  height: calc(100% - 2.5rem);
  border: 1px purple solid;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
`

const DetailListDiv = styled.div`
  width: 18.75rem;
  height: 8.125rem;
  border: 1px salmon solid;
`

const CheckPageDiv = styled.div`
  width: 18.75rem;
  height: 2.5rem;
  border: 1px black solid;
`


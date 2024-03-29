import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState } from 'react';
import Link from 'next/link'
import React from "react";

export default function Index({AllData, HealthData, EducationData,AnimalData}) {
  const [filter, setFilter] = useState(AllData);
  
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
      setHydrated(true);
  }, []);
  if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
  }

  return (
    <HomeWrapper>

      {/* Filter Section */}
      <FilterWrapper>
        <FilterAltIcon style={{fontSize:40}} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(EducationData)}>Film</Category>
        <Category onClick={() => setFilter(HealthData)}>Docs</Category>
        <Category onClick={() => setFilter(AnimalData)}>Series</Category>
      </FilterWrapper>

       {/* Cards Container */}
      <CardsWrapper>

      {/* Card */}
      {filter.map((e) => {
        return (
          <Card key={e.title}>
          <CardImg>
            <Image 
              alt="Crowdfunding dapp"
              layout='fill' 
              src={"https://crowdfundingnewfilmtech.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title>
            {e.title}
          </Title>
          <CardData>
            <Text>Owner<AccountBoxIcon /></Text> 
            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData>
            <Text>Amount<PaidIcon /></Text> 
            <Text>{e.amount} Matic</Text>
          </CardData>
          <CardData>
            <Text><EventIcon /></Text>
            <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/' + e.address}><Button>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
  )
}



export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Animal');
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData
    },
    revalidate: 10
  }
}






const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vw * 0.5);




  
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 35px;


  
`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Segoe UI';
  font-weight: normal;
  cursor: pointer;
  box-shadow: 0px 0px 0px #17b2ff;
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
  border-radius: 25px;
  box-shadow: 0px 0px 0px #17b2ff;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};
  width: 17vw;

  @media (max-width: 824px) {
    width: 45%;
    
  }

  
  
  transition: transform .4s;
  
  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
    box-shadow: 0px 0px 0px #17b2ff;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
  box-shadow: 0px 0px 0px #17b2ff;

  @media (max-width: 768px) {
    width: 40%;
    position: relative;
  }

  @media (max-width: 474px) {
    width: 60%;
    
  }

  
`
const Title = styled.h2`
  font-family: 'Segoe UI';
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
  box-shadow: 0px 0px 0px #17b2ff;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #17b2ff;
  `
const Text = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI';
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 0px 0px #17b2ff;

  @media (max-width: 1122px) {
    font-size: 12px;
    
  }
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: white;
  border: none;
  cursor: pointer;
  font-family: 'Segoe UI';
  text-transform: uppercase;
  color: black;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0px 0px 0px #17b2ff;

  @media (max-width: 1122px) {
    font-size: 12px;
    
  }
`
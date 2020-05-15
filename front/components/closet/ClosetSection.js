import React from 'react';
import {Animated} from 'react-animated-css';
import styled from 'styled-components';
import ClosetItem from "./ClosetItem";
import propTypes from 'prop-types';

const ClosetSection = ({title, itemsData, delay}) => {
    return (
        <Animated animationIn="fadeIn" animationInDelay={delay} animationInDuration={500} isVisible={true}>
            <Section>
            <H3 type={title}>{title}</H3>
            <ItemList>
                {itemsData.map((v, i)=>{
                return <ClosetItem v={v} i={i} key={i}/>
                })}
            </ItemList>
            </Section>
        </Animated>
    )
}
const Section = styled.div`
  margin: 0 0 40px 0;
`;

const ItemList = styled.ul`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const H3 = styled.h3`
  color: ${props => props.theme.purpleMedium};
  &:before{
    content: '';
    width: 14px;
    height: 14px;
    display: inline-block;
    background: ${props=>`url('/icons/shop_${props.type}.svg')`};
    background-size: contain;
    vertical-align: middle;
    margin-right: 10px;
  }
`;

ClosetSection.propTypes = {
    title: propTypes.string.isRequired, 
    itemsData: propTypes.array.isRequired, 
    delay: propTypes.number.isRequired
}

export default ClosetSection;
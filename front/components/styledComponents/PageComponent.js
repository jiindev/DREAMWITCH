import React from "react";
import styled from 'styled-components';


export const H2 = styled.h2`
    padding: 0 0 19px 0;
    font-size: 16px;
    color: ${props => props.theme.purpleDark};
    line-height: 1.5;
`; 

export const Date = styled.span`
    color: ${props => props.theme.purpleLight};
    font-size: 12px;
`;

export const Button = styled.button`
    border-radius: 20px;
    background-color: ${props => props.theme.purpleMedium};
    color: white;
    font-size: 16px;
    width: 100%;
    padding: 10px 0;
    margin: 12px 0 20px 0;
    border: 0;
    cursor: pointer;
`;
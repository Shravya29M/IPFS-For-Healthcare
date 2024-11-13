import { render, screen } from '@testing-library/react';
import App from './App';
import { PinataSDK } from 'pinata-web3';
import { ethers } from 'ethers';


const jwt = process.env.jwt
const gateway = process.env.gateway

const pinata = new PinataSDK({
  pinataJwt: jwt,
  pinataGateway: gateway,
});


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

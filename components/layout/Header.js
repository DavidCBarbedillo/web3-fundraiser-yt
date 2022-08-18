import styled from 'styled-components';
import HeaderLogo from './components/HeaderLogo'
import HeaderNav from './components/HeaderNav'
import HeaderRight from './components/HeaderRight'

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderNav />
      <HeaderRight />
    </HeaderWrapper>
  )
};

const HeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  box-shadow: 0 0 1px 1px #17b2ff;
  display: flex;
  font-size: calc(10px + 2vmin);
  color: white;
  
`

export default Header
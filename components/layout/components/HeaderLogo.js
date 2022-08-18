import styled from 'styled-components';

const HeaderLogo = () => {
  return (
    <Logo>NewFilmTech</Logo>
  )
}

const Logo = styled.h1`
  font-weight: normal;
  font-size: 30px;
  margin-left: 11px;
  font-family: 'Segoe UI';
  letter-spacing: 3px;
  cursor: pointer;
`

export default HeaderLogo
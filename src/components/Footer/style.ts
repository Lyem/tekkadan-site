import styled, { css } from 'styled-components'

export const Wrapper = styled.footer`
  ${({ theme }) => css`
    margin-top: calc(100px + ${theme.spacings.xxlarge});
    color: ${theme.colors.white3};
    background-color: ${theme.colors.contrast};
  `}
  position: relative;
  width: 100%;
  min-height: 150px;
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const SocialWrapper = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 20;
  align-items: center;
  margin: 10px 0;
`

export const Social = styled.li`
  list-style: none;
  margin: 0 10px;
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;
  & > a {
    text-decoration: none;
  }

  &:hover {
    transform: translateY(-10px);
  }
`

export const MenuWrapper = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`

export const Menu = styled.li`
  list-style: none;
  margin: 0 10px;
  display: inline-block;
  font-size: 1.2em;
  cursor: pointer;
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
  &:hover {
    ${({ theme }) => css`
      color: ${theme.colors.white2};
    `}
  }
`

export const Wave = styled.div`
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('/waves/Wave.svg');
  background-size: 1000px 101px;
  z-index: 10;
  opacity: 1;
  bottom: 0;
  animation: wave 15s linear infinite;

  @keyframes wave {
    0% {
      background-position-x: 1000px;
    }
    100% {
      background-position-x: 0px;
    }
  }
`

export const Wave2 = styled.div`
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('/waves/Wave2.svg');
  background-size: 1000px 101px;
  z-index: 5;
  opacity: 0.7;
  bottom: 0;
  animation: wave2 7s ease infinite;

  @keyframes wave2 {
    0% {
      background-position-x: 0px;
    }
    100% {
      background-position-x: 1000px;
    }
  }
`

export const Wave3 = styled.div`
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('/waves/Wave3.svg');
  background-size: 1000px 101px;
  z-index: 1;
  opacity: 1;
  bottom: 0;
  animation: wave3 10s linear infinite;

  @keyframes wave3 {
    0% {
      background-position-x: 1000px;
    }
    100% {
      background-position-x: 0px;
    }
  }
`

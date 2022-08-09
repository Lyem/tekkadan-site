import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
  position: fixed;
  z-index: 100000000000;
  margin-top: 10px;
  right: 1rem;
`

export const WrapperToast = styled.div`
  margin-bottom: 1rem;
  ${({ theme }) => css`
    box-shadow: 0 0 10px ${theme.colors.contrast};
    border-radius: ${theme.border.radius};
  `}
  opacity: 0.9;
  height: fit-content;
  width: 365px;
  color: #fff;
  padding: 10px 15px 10px 10px;
  transition: 0.3s ease;
  &:hover {
    ${({ theme }) => css`
      box-shadow: 0 0 12px ${theme.colors.contrast};
    `}
    opacity: 1;
  }
  animation: toast-in-right 0.7s;

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }
`

export const WrapperInfos = styled.div``

export const Exit = styled.button`
  float: right;
  background: none;
  border: none;
  border-radius: 50%;
  padding-left: 5px;
  padding-right: 5px;
  color: #fff;
  opacity: 0.8;
  cursor: pointer;
`

export const Title = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  height: 18px;
`

export const Description = styled.p`
  margin: 0;
  text-align: left;
`

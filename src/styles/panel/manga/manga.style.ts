import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;

  ${({ theme }) => css`
    .ant-table-thead {
      th {
        background-color: ${theme.colors.contrast} !important;
      }
    }
    .ant-table-tbody {
      td {
        background-color: ${theme.colors.contrast2} !important;
      }
    }
    .ant-pagination-item {
      border-color: ${theme.colors.white} !important;
      a {
        color: ${theme.colors.white} !important;
      }
    }
    .ant-pagination-item-active {
      border-color: ${theme.colors.primary3} !important;
      a {
        color: ${theme.colors.primary3} !important;
      }
    }
    .ant-pagination-item-link {
      border-color: ${theme.colors.white2} !important;
      span {
        color: ${theme.colors.white2} !important;
      }
    }
    .ant-pagination-item-link:disabled {
      border-color: ${theme.colors.contrast} !important;
      span {
        color: ${theme.colors.contrast} !important;
      }
    }
    .ant-spin-dot-item {
      background-color: ${theme.colors.primary2} !important;
    }
  `}

  a:hover {
    cursor: pointer;
  }
`

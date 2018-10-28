import styled from 'styled-components'
import { isIphoneX } from '../../../helpers'

export const TabBarPlaceholder = styled.View`
  width: 100%;
  height: ${isIphoneX() ? 83 : 49};
  background-color: ${({ theme }) => theme.background};
`

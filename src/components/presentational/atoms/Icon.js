// @flow
import React from 'react'
import VectorIcon from 'react-native-vector-icons/Ionicons'
import styled, { css } from 'styled-components'
import { withTheme } from 'styled-components'

type Props = {
  name: string,
  size: number,
  color: string,
  position: string,
  top: number,
  bottom: number,
  left: number,
  right: number,
  margin: string,
  theme: {},
}

const Wrapper = styled.View`
  position: ${({ styledPosition }) => styledPosition};
  top: ${({ styledTop }) => styledTop};
  bottom: ${({ styledBottom }) => styledBottom};
  left: ${({ styledLeft }) => styledLeft};
  right: ${({ styledRight }) => styledRight};
  ${({ styledMargin }) =>
    styledMargin &&
    css`
      margin: ${styledMargin};
    `};
  z-index: 2;
`

const Icon = (props: Props) => (
  <Wrapper
    styledPosition={props.position}
    styledTop={props.top}
    styledBottom={props.bottom}
    styledLeft={props.left}
    styledRight={props.right}
    styledMargin={props.margin}
  >
    <VectorIcon
      name={props.name}
      size={props.size}
      color={props.theme.primary}
    />
  </Wrapper>
)

Icon.defaultProps = {
  name: '',
  size: 30,
  color: 'black',
  position: 'relative',
  top: 'auto',
  bottom: 'auto',
  left: 'auto',
  right: 'auto',
  margin: null,
}

export default withTheme(Icon)

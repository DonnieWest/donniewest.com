import React from 'react'
import Logo from '../assets/logo.svg'
import Search from '../assets/search.svg'
import typography, { scale, rhythm } from '../utils/typography'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'

const { options } = typography

const CenterHeader = styled.p`
  @media (max-width: 600px) {
    display: none;
  }

  font-weight: ${options.headerWeight};
  font-size: ${rhythm(1)};
  font-family: ${options.headerFontFamily.join(', ')};
  color: ${options.headerColor};
  line-height: ${options.headerLineHeight};
  text-rendering: optimizeLegibility;
`

const StyledLink = styled(Link)`
  :hover,
  :active,
  :visited {
    color: black;
    text-decoration: none;
  }

  flex: 1 0 0;
  display: flex;
  place-content: center;
  box-shadow: none;
  text-decoration: none;
  color: black;
  text-align: center;
  ${props => {
    if (props.align === 'end') {
      return `
        place-content: flex-end;
        text-align: end;
      `
    }
    if (props.align === 'begin') {
      return `
        text-align: justify;
        place-content: unset;
      `
    }
  }};
`

const size = scale(1).fontSize
const IconStyle = css`
  height: ${size};
  width: ${size};
  display: block;
`

export default function Header({ title }) {
  return (
    <div
      style={{
        height: size,
        display: 'flex',
        flexDirection: 'row',
        margin: `${rhythm(3 / 4)}`,
      }}
    >
      <StyledLink to="/" align="begin">
        <Logo className={IconStyle} />
      </StyledLink>
      <StyledLink to="/">
        <CenterHeader>{title}</CenterHeader>
      </StyledLink>
      <StyledLink to="/search" align="end">
        <Search className={IconStyle} />
      </StyledLink>
    </div>
  )
}

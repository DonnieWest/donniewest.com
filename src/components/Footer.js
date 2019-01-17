import React from 'react'
import { scale, rhythm } from '../utils/typography'
import styled from '@emotion/styled'

const Container = styled.div`
  background-color: black;
`

const size = scale(1).fontSize

const StyledLink = styled.a`
  :visited {
    color: white;
    text-decoration: none;
  }

  :hover {
    text-decoration: none;
  }

  box-shadow: none;
  text-decoration: none;
  color: white;
  flex: 1 0 0;
  text-align: center;
  place-content: center;
  ${props => {
    if (props.align === 'end') {
      return `
        place-content: end;
        text-align: end; 
      `
    }
    if (props.align === 'begin') {
      return 'text-align: justify;'
    }
  }};
`

const LinkWrapper = styled.div`
  margin: ${rhythm(3 / 4)};
  height: ${size};
  display: flex;
  flex: 1 0 0;
`

export default function Footer() {
  return (
    <Container>
      <LinkWrapper>
        <StyledLink href="https://github.com/DonnieWest" align="begin">
          Github
        </StyledLink>
        <StyledLink href="https://twitter.com/_DonnieWest">
          @_DonnieWest
        </StyledLink>
        <StyledLink
          href="mailto:me@donniewest.com?Subject=Howdy Donnie"
          align="end"
        >
          Say Hello
        </StyledLink>
      </LinkWrapper>
    </Container>
  )
}

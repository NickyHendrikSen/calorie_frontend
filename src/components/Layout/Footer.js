import React from "react";
import styled from "styled-components"

const FooterStyles = styled.footer`
box-shadow: -.5px -.5px 5px 0px #000000;
.copyright{
  display: block;
  text-align: center;
  line-height: 30px;
  font-size: 10px;
  letter-spacing: 2px;
}
`

const Footer = () => {

  return (
    <FooterStyles>
      <div className="copyright">Copyright &copy; 2022 CalorieApp. All Rights Reserved</div>
    </FooterStyles>
  )
}

export default Footer;
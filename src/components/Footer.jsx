import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { FiLinkedin } from 'react-icons/fi';
import '../css/Footer.css';

function Footer() {
  return (
    <div className="footer-page">
      <h3>Social Networks</h3>
      <div className="social-networks">
        <a
          href="https://github.com/VictorSilva27"
          target="_blank"
          rel="noreferrer"
          className="icon-github" 
        >
          <GoMarkGithub className="icon-github" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/victor-silva027/"
          target="_blank"
          rel="noreferrer"
          className="icon-linkedin"
        >
          <FiLinkedin className="icon-linkedin"/>
          LinkedIn
        </a>
      </div>

      <p className="p-footer">
        Desenvolvido por <span className="my-name">Victor Silva</span>, 2022 © - Projeto Star Wars.</p>
    </div>
  )
}

export default Footer
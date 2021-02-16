import React from 'react';
import github from '../../assets/img/github.png';
import youtube from '../../assets/img/youtube.png';
import rsschool from '../../assets/img/rsschool.svg';
import styles from './styles.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <p>2021</p>
      <p><a href="https://github.com/kostyayakimovich" target="_blank" rel="noreferrer"> <img src={github} alt= "github"  className = {styles.footerIcon}/></a></p>
      <p><a href=""  target="_blank" rel="noreferrer"><img src={youtube} alt= "youtube"  className = {styles.footerIcon}/></a></p>
      <p><a href="https://rs.school/js/"  target="_blank" rel="noreferrer"><img src={rsschool} alt= "rsschool"  className = {styles.footerIcon}/></a></p>
    </div>
  );
}

export default React.memo(Footer);
import React, { useState, useEffect } from 'react';
import conquererLogo from './assets/conquererLogo.svg';
import browseLogs from './assets/browseLogs.svg';
import newLog from './assets/newLog.svg';
import myQuestlog from './assets/myQuestlog.svg';
import Login from './login';
import ContactUS from './contactus';
import About from './about';
import 'bulma/css/bulma.css';
import './app.css';
import { h } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';
import AsyncRoute from 'preact-async-route';

// home component for main content
const Home = ({ isLoggedIn, username }) => (
  <div className="container">
    <div className="">
      <div className="container">
        <section className="hero is-medium is-bold">
          <div className="hero-body">
            <h1 className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
              {isLoggedIn ? (
                <>WELCOME BACK, <span className="has-text-cyan">{username.toUpperCase()}</span></>
              ) : (
                <>
                  WELCOME TO
                  <span className="is-flex is-align-items-center">
                    <svg width="40" height="40" className="mx-2" style={{ fill: 'cyan' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="m145.896 18.31l-21.51 3.016l50.184 404.992q11.874-.89 24.248-1.515l-30.935-237.614c25.61-7.714 50.943-16.448 73.25-36.277c14.77 90.454-1.795 182.196-2.377 272.658c12.68-.146 26.55-.009 37.9.293c-.566-6.92-7.696-101.44 24.094-130.373c18.74-17.055 75.734-6.549 75.734-6.549c13.115 21.985 13.064 36.927 8.98 62.612l31.163 8.045c2.469-14.451 1.707-51.72-7.055-96.522c-1.229-2.948-10.45-4.763-18.036-8.04c-.183-30.68 6.268-60.047.273-90.727c-14.382-11.332-45.991-20.998-70.762-34.35l-5.58-.762c-7.236 7.58-16.643 12.56-27.188 12.56c-15.213-2.301-26.7-10.05-33.625-20.849l-12.734-1.736c-23.748 18.203-50.06 31.28-77.733 41.635zM288.28 36.94c-6.21 0-12.37 3.612-17.55 11.154s-8.762 18.73-8.762 31.256s3.58 23.711 8.762 31.254c5.18 7.542 11.34 11.154 17.55 11.154s12.372-3.612 17.553-11.154c5.18-7.543 8.76-18.729 8.76-31.254s-3.58-23.714-8.76-31.256s-11.342-11.155-17.553-11.155zM109.873 54.4c-.932 2.868-1.81 5.768-2.848 8.555c-3.482 9.362-7.548 18.137-12.91 25.352c-5.361 7.214-12.501 13.287-21.787 14.603c-13.724 1.946-21 6.09-25.857 11.809c-4.858 5.72-7.681 14.024-9.352 25.42c-2.552 17.412-.925 39.067 1.97 61.132c1.418-4.107 2.921-8.171 4.733-12.01c4.205-8.905 9.672-17.033 17.334-23.017c7.663-5.984 17.6-9.48 28.815-9.146c7.657.228 13.652-4.943 18.765-14.57c5.056-9.52 7.849-22.506 7.909-31.97zm213.871 106.57c13.772 8.366 27.424 15.481 44.86 16.52c6.827 23.86 1.635 49.908.83 73.769c-22.109-4.356-43.114-9.48-45.623-23.147c2.972-34.461 3.447-49.16-.067-67.142m48.836 203.847c-4.585 21.75-13.021 42.473-24.904 63.268c36.88 2.608 75.117 5.883 112.222 15.611c-.06-19.97-6.113-40.476-16.906-60.699zm-127.242 76.692c-97.482.507-174.844 14.648-227.338 28.416V491h476v-18.94c-58.673-14.917-146.115-31.086-248.662-30.552z" />
                    </svg>
                    <span className="has-text-cyan">QUESTLOG</span>
                  </span>
                </>
              )}
            </h1>
            <h2 className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">
              {isLoggedIn ? "Start a new log, or browse some existing ones!" : "Real Reviews For The Games You Love"}
            </h2>
            <div className="columns">
              <div className="column is-offset">
                <div className="buttons">
                  <button className="button hero-buttons is-primary is-large">
                  <img src={newLog} alt="newLog" width="30" height="30" className="mr-2" />
                    New Log
                  </button>
                  <Link href="/browse" className="button hero-buttons is-primary is-large">
                  <img src={browseLogs} alt="browseLogs" width="30" height="30" className="mr-2" />
                    Browse Logs
                  </Link>
                  <button className="button hero-buttons is-primary is-large">
                  <img src={myQuestlog} alt="myQuestlog" width="30" height="30" className="mr-2" />
                    My Questlog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="title is-2">Featured Logs:</h2>
          <div className="columns is-multiline">
            {[
              { title: "Red Dead Redemption 2", rating: "9/10", review: "This game is a masterpiece. The story is engaging, the world is beautiful, and the gameplay is fun. I highly recommend it.", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg?t=1671484934" },
              { title: "Doom Eternal", rating: "8/10", review: "She rip on my tear until I doom guy, if you get what I mean.", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/782330/library_600x900_2x.jpg?t=1702308003" },
              { title: "Assassin's Creed Origins", rating: "7.5/10", review: "One of the weaker ones, whatever Lenny says.", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/582160/library_600x900_2x.jpg?t=1703019965" }
            ].map((game, index) => (
              <div key={index} className="column is-full-mobile is-half-tablet is-one-third-desktop">
                <div className="box cyan-box-shadow">
                  <article className="media">
                    <div className="media-left">
                      <figure className="image" style={{ width: '60px', height: '90px' }}>
                        <img src={game.image} alt={game.title} style={{objectFit: 'cover', height: '100%', width: '100%'}} />
                      </figure>
                    </div>
                    <div className="media-content">
                      <div className="content truncate-review-text-card">
                        <p>
                          <strong>{game.title}</strong> - <small>{game.rating}</small>
                          <br />
                          <em>"{game.review}"</em>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isNavbarMenuActive, setIsNavbarMenuActive] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openContactUsModal = () => setIsContactUsModalOpen(true);
  const closeContactUsModal = () => setIsContactUsModalOpen(false);
  const openAboutModal = () => setAboutModalOpen(true);
  const closeAboutModal = () => setAboutModalOpen(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    closeLoginModal();
    setUsername(user.username);
  };

  const toggleNavbarMenu = () => {
    setIsNavbarMenuActive(!isNavbarMenuActive);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.success && data.user) {
          setIsLoggedIn(true);
          setUsername(data.user.username);
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);
  
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar is-fixed-top custom-navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={conquererLogo} alt="Conquerer Logo" width="36" height="36" className='mr-2' />
              <h1 className="title is-4 has-text-white">QUESTLOG</h1>
            </a>
            <a
              role="button"
              className={`navbar-burger burger ${isNavbarMenuActive ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={toggleNavbarMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className={`navbar-menu ${isNavbarMenuActive ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <a className="navbar-item is-size-5" onClick={openAboutModal}>ABOUT</a>
              <a className="navbar-item is-size-5" onClick={openContactUsModal}>CONTACT</a>
              {isLoggedIn ? (
                <a className="navbar-item is-size-5" onClick={handleLogout}>SIGN OUT</a>
              ) : (
                <a className="navbar-item is-size-5" onClick={openLoginModal}>LOGIN</a>
              )}
            </div>
          </div>
        </div>
      </nav>  

      <main className="section">
        <Router>
          <Home path="/" isLoggedIn={isLoggedIn} username={username} />
          <AsyncRoute 
            path="/browse"
            getComponent={() => import('./BrowseLogsPage').then(module => module.default)}
          />
          <AsyncRoute 
            path="/log/:id"
            getComponent={() => import('./logPage').then(module => module.default)}
          />
        </Router>
      </main>  

      <div className={`modal ${isLoginModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeLoginModal}></div>
        <div className="modal-content modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Login</p>
            <button className="delete" aria-label="close" onClick={closeLoginModal}></button>
          </header>
          <section className="modal-card-body">
            <Login closeModal={closeLoginModal} onLogin={handleLogin} />
          </section>
        </div>
      </div>

      <div className={`modal ${isContactUsModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeContactUsModal}></div>
        <div className="modal-content modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Contact Us</p>
            <button className="delete" aria-label="close" onClick={closeContactUsModal}></button>
          </header>
          <section className="modal-card-body">
            <ContactUS />
          </section>
        </div>
      </div>

      <div className={`modal ${isAboutModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeAboutModal}></div>
        <div className="modal-content modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">About</p>
            <button className="delete" aria-label="close" onClick={closeAboutModal}></button>
          </header>
          <section className="modal-card-body">
            <About />
          </section>
        </div>
      </div>

      

      <footer className="footer">
        <div className="content has-text-centered">
          <p className="is-flex is-justify-content-center is-align-items-center">
            <img src={conquererLogo} alt="Conquerer Logo" width="19" height="19" className="mr-2" />
            <strong>QUESTLOG</strong>
          </p>
          <p> Created by Will H. The source code is licensed MIT.</p>
        </div>
      </footer>
    </div>
  );
}
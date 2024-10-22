import { h } from 'preact';
import { Link } from 'preact-router';

const BrowseLogsPage = () => {
  return (
    <div className="container"> 
      <section className="section">
          <div className="buttons">
            <Link href="/" className="button hero-buttons is-primary is-small">
              Back
            </Link>
          </div> 
          <h2 className="title is-2">Top Logs:</h2>
          <a href="/log/:id" className="box cyan-box-shadow">Test Log</a>
        </section>
    </div>
  );
};

export default BrowseLogsPage;
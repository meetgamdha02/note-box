import React from "react";
import "./Home.scss";
import { messenger } from "../../utils";

const Home = ({ domainInfo, setDomainUrl, setDomainInfoVisibility }) => {
  const openDomainNotes = domain => {
    setDomainUrl(domain);
    setDomainInfoVisibility(false);
  };

  return (
    <section>
      <div className="header">
        <span>Domains</span>
        <span>
          <button className="btn" onClick={() => messenger("log")}>
            Log
          </button>
          <button className="btn" onClick={() => messenger("clear")}>
            Clear
          </button>
        </span>
      </div>
      <div>
        {domainInfo.map(({ domain, count }, index) => (
          <div
            onClick={() => openDomainNotes(domain)}
            key={index}
            className="item"
          >
            <div className="note">{domain}</div>
            <div className="actions">
              <span>{count}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
import React from "react";

type AboutProps = {
  orgName?: string;
};

const About: React.FC<AboutProps> = ({
  orgName = "Mongolian-Canadian Cultural Network",
}) => {
  return (
    <section id = "about"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem 1.5rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{orgName}</h1>
      <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "1.5rem" }}>
        A Mongolian-Canadian non-profit organization celebrating culture, community,
        and connection through year-round events.
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Our Mission</h2>
        <p>
          Our mission is to bring together Mongolian and Canadian communities by
          organizing cultural, educational, and social events. We aim to support
          newcomers, preserve Mongolian heritage, and create inclusive spaces where
          everyone feels welcome.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>What We Do</h2>
        <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
          <li>Host cultural festivals, concerts, and holiday celebrations</li>
          <li>Organize workshops on language, music, and traditional arts</li>
          <li>Support newcomers with community networking events</li>
          <li>Partner with local organizations on diversity and inclusion projects</li>
        </ul>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Who We Serve</h2>
        <p>
          We welcome Mongolian-Canadians, friends of Mongolia, and anyone interested in
          learning more about Mongolian culture. Our events are family-friendly and open
          to people of all ages and backgrounds.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Get Involved</h2>
        <p>
          Whether you want to volunteer, collaborate on an event, or simply join our
          next gathering, we’d love to hear from you.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>Email:</strong> info@mongolian-canadian-npo.ca
          <br />
          <strong>Social:</strong> @mongoliancanadiannpo on major platforms
        </p>
      </section>
    </section>
  );
};

export default About;

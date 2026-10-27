import "./styles/Certificates.css";

const certificates = [
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera · Stanford University",
    date: "2024",
    credential: "https://coursera.org",
    badge: "🤖",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera · DeepLearning.AI",
    date: "2024",
    credential: "https://coursera.org",
    badge: "🧠",
  },
  {
    title: "Google Data Analytics",
    issuer: "Google · Coursera",
    date: "2023",
    credential: "https://coursera.org",
    badge: "📊",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM · Coursera",
    date: "2023",
    credential: "https://coursera.org",
    badge: "🐍",
  },
  {
    title: "How to break into AI roles in companies like Open AI, Emergent?",
    issuer: "Moonshot · Scaler",
    date: "Oct 2026",
    credential: "https://moonshot.scaler.com/s/sl/YFXBQSURdX",
    badge: "🚀",
  },
  {
    title: "Designing Scalable RAG Pipelines",
    issuer: "Moonshot · Scaler",
    date: "Oct 2026",
    credential: "https://moonshot.scaler.com/s/sl/d9XhmUfqok",
    badge: "⚙️",
  },
];

const Certificates = () => {
  return (
    <div className="certificates-section section-container" id="certificates">
      <div className="certificates-container">
        <h2>
          My <span>&</span>
          <br />
          Certificates
        </h2>
        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <a
              key={index}
              href={cert.credential}
              target="_blank"
              rel="noreferrer"
              className="certificate-card"
              data-cursor="disable"
            >
              <div className="certificate-badge">{cert.badge}</div>
              <div className="certificate-info">
                <h4>{cert.title}</h4>
                <h5>{cert.issuer}</h5>
                <span className="certificate-date">{cert.date}</span>
              </div>
              <div className="certificate-arrow">↗</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;

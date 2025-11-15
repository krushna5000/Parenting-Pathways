// src/app/page.tsx
import React from 'react';

const tips = [
  { id: '1', title: '🍎 Ensure Proper Nutrition', description: 'Give your child a balanced diet with fruits, vegetables, and whole grains.' },
  { id: '2', title: '📅 Establish a Routine', description: 'Create a daily schedule to help your child feel secure and develop discipline.' },
  { id: '3', title: '🛏️ Regular Sleep', description: 'Make sure your child gets enough sleep depending on their age.' },
  { id: '4', title: '❤️ Emotional Support', description: 'Listen and talk to your child daily. Show love and affection.' },
  { id: '5', title: '🏃 Encourage Physical Activity', description: 'Allow children to play and exercise daily to build strength and reduce stress.' },
  { id: '6', title: '🧼 Teach Good Hygiene', description: 'Show them how to brush teeth, bathe regularly, and wash hands.' },
  { id: '7', title: '📵 Monitor Screen Time', description: 'Limit usage of mobile phones and promote educational content.' },
  { id: '8', title: '🩺 Visit the Doctor Regularly', description: 'Take your child for routine checkups and vaccinations.' },
  { id: '9', title: '👨‍👩‍👧 Be a Role Model', description: 'Children learn by watching. Display good habits and kindness.' },
  { id: '10', title: '🏠 Create a Safe Environment', description: 'Child-proof your home and keep dangerous objects out of reach.' },
];

const ChildCareTipsPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.header}>👶 How to Take Care of Children</h1>
      <div style={styles.grid}>
        {tips.map((tip) => (
          <div key={tip.id} style={styles.card}>
            <h2 style={styles.title}>{tip.title}</h2>
            <p style={styles.description}>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #fef9f8, #e0f7fa)',
    padding: '2rem',
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.07)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  title: {
    fontSize: '1.25rem',
    color: '#34495e',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '1rem',
    color: '#7f8c8d',
    lineHeight: '1.5',
  },
};

// Hover effect using inline workaround (if using Tailwind or CSS module, better)
const styleSheet = `
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
`;
if (typeof window !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styleSheet;
  document.head.appendChild(styleTag);
}

export default ChildCareTipsPage;

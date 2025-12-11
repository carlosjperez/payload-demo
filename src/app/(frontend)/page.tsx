import Link from 'next/link'

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Payload CMS Demo
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.8 }}>
        Exploring Payload CMS for SOLARIA projects
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/admin"
          style={{
            padding: '1rem 2rem',
            background: '#0f62fe',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'transform 0.2s',
          }}
        >
          Admin Panel
        </Link>

        <Link
          href="/api/graphql"
          style={{
            padding: '1rem 2rem',
            background: '#e535ab',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          GraphQL Playground
        </Link>
      </div>

      <div style={{ marginTop: '4rem', maxWidth: '600px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Collections Available</h2>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Users', 'Posts', 'Categories', 'Media', 'Pages'].map((col) => (
            <li key={col} style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              fontSize: '0.875rem'
            }}>
              {col}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2rem', maxWidth: '600px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Globals Available</h2>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Site Settings', 'Navigation'].map((global) => (
            <li key={global} style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              fontSize: '0.875rem'
            }}>
              {global}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

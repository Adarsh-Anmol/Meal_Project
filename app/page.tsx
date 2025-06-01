import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
      <p><Link href='/meals'> Go to the Meals Page</Link></p>
      <p><Link href='/meals/share'> Go to the Meals Sharing Page</Link></p>
      <p><Link href='/community'> Go to the Meals Page</Link></p>
    </main>
  );
}

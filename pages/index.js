import Head from 'next/head'
import TableComponent from '@/components/TableComponent'

export default function Home() {
  return (
    <>
      <Head>
        <title>Exam by Dan Rudolf Perez</title>
        <meta name="description" content="Exam by Dan Rudolf Perez" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TableComponent />
      </main>
    </>
  )
}

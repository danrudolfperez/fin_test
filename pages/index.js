import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
// const inter = Inter({ subsets: ['latin'] })

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

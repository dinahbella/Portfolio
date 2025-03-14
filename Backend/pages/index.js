import Head from "next/head";
import React from "react";
import Loading from "../components/Loading";
import { Bar } from "react-chartjs-2";

export default function Home() {
  return (
    <Head>
      <title>Portfolio Backend</title>
      <meta name="description" content="Blog website backend" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

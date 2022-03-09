import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          background: ${"#C7C4BB"};
        }
      `}
      </style>
    </>)
}

export default MyApp

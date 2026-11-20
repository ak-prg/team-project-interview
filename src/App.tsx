import Footer from './features/core/Footer';
import Header from './features/core/Header';

function App() {
  return (
    <>
      <Header />
      <main>{/* Outlet for router will be here */}</main>
      <Footer />
    </>
  );
}

export default App;

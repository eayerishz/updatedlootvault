import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AdminDashboard from './screens/AdminDashboard';
import OrderScreen from './screens/OrderScreen';
import OrderDetails from './screens/OrderDetails';
import RateGames from './components/RateGames';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import AboutUs from './components/AboutUs';
import { checkSuperuser } from './utils/Auth';

function App() {
  const [games, setGames] = useState([]);
  const [isSuperuser, setIsSuperuser] = useState(null);

  // Fetch games data and check superuser status on component mount
  useEffect(() => {
    // Fetch games from the API
    axios.get('http://localhost:8000/api/games/')
      .then(response => {
        console.log(response.data);
        setGames(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Check if the user is a superuser
    const fetchSuperuserStatus = async () => {
      const status = await checkSuperuser();
      console.log('Superuser status:', status);
      setIsSuperuser(status);
    };
    fetchSuperuserStatus();
  }, []);

  // Show loading state while checking superuser status
  if (isSuperuser === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {/* Header Component */}
      <Header isSuperuser={isSuperuser} />

      {/* Main Content */}
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* Home Screen */}
          <Route path="/" element={<HomeScreen games={games} />} />

          {/* Admin Dashboard (only accessible to superusers) */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Order Screen */}
          <Route path="/order-screen" element={<OrderScreen />} />

          {/* Order Details Screen */}
          <Route path="/order-details" element={<OrderDetails />} />

          {/* Rate Games Screen */}
          <Route path="/rate-games" element={<RateGames />} />

          {/* Contact Us Page */}
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Privacy Policy Page */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Terms & Conditions Page */}
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

          {/* About Us Page */}
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
}

export default App;
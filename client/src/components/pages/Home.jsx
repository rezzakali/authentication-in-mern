import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  // logout
  const handleLogout = async () => {
    await fetch('http://localhost:5000/user/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authCheck = async () => {
    const res = await fetch('http://localhost:5000/user/auth', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await res.json();
    if (result.success === false) {
      navigate('/login');
    }
  };
  useEffect(() => {
    authCheck();
  }, []);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>fakebook</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Home;

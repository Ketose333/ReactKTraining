import './App.css';
import Post from './components/Post';
import Footer from './components/Footer';  

export default function App() {
  return (
    <div className="App">
      <main>
        <Post />
        <Footer />
      </main>
    </div>
  );
}
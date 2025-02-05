import './App.css';
import Post from './components/Post';
import Footer from './components/Footer';  // ✅ Footer 추가

export default function App() {
  return (
    <div className="App" style={{ paddingBottom: "60px" }}>
      <Post />
      <Footer />  {/* ✅ Footer 추가 */}
    </div>
  );
}
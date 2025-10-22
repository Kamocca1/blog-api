import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";

import "./main.css";

function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about-me" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/posts/:title" element={<PostPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
}

export default App;

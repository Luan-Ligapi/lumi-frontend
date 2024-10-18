import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import FaturaDetail from './pages/FaturaDetail';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/faturas/:id" element={<FaturaDetail />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

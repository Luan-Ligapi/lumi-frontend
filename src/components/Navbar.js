import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { postUpload } from '../services/api'; // Mantém o import de getClientes

function Navbar() {
    const [selectedFile, setSelectedFile] = useState(null);

    // Função para capturar o arquivo selecionado e enviá-lo automaticamente
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            handleUpload(file); // Enviar o arquivo automaticamente após a seleção
        }
    };

    // Função para lidar com o envio do arquivo usando o padrão fornecido
    const handleUpload = async (file) => {
        try {
            const data = await postUpload(file);
            console.log('Response:', data);
            setSelectedFile(null); // Limpar o arquivo após o upload
        } catch (error) {
            console.error('Erro ao enviar o arquivo:', error);
            alert('Ocorreu um erro ao enviar o arquivo.');
        }
    };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/library">Library</Link></li>
                <li>
                    <label className="upload-btn">
                        Upload PDF
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // Ocultar o input padrão
                        />
                    </label>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

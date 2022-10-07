import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import UsuarioService from '../../services/UsuarioService';

const usuarioService = new UsuarioService();

export default function Header() {

    const [estaAutenticado, setEstaAutenticado] = useState(false);
    const token = useState('token', 'tokenAdm');
    const nomeCompleto = localStorage?.getItem('nome');
    const primeiroNome = nomeCompleto?.split(' ')[0] || '';
    const router = useRouter();
    const [active, setActive] = useState('');

    const ativo = () => {
        if (active === '') {
            setActive('active');
        } else {
            setActive('');
        }
    }

    const logout = () => {
        usuarioService.logout();
        router.push('/');
    }

    document.title = "Catálogo de Veículos";

    useEffect(() => {
        setEstaAutenticado(
            usuarioService.estaAutenticadoAdm()
        );
    }, [token]);

        return (
            <header>
                <div className="navbar">
                    <div className="logo"><Link href='/'>LOGO</Link></div>
                    <div className={`hamburguer ${active}`} onClick={ativo}></div>
                    <ul className={`menu ${active}`}>
                        <li>{primeiroNome ? <Link href='/editar'>{'Olá, ' + primeiroNome}</Link> : ''}</li>
                        <li><Link href='/'>Home</Link></li>
                        <li>{primeiroNome ? <Link href={'/administrar'}>Administrar</Link> : ""}</li>
                        <li>{primeiroNome ? <button onClick={logout}>Sair</button> : <Link href='/login'>Login</Link>}</li>
                    </ul>
                </div>
            </header>
        );

}
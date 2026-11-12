import { describe, expect, it } from 'vitest';
import {
    NIVEIS_DE_ACESSO,
    validaMarca,
    validaModelo,
    validaValor,
    validarConfirmacaoSenha,
    validarEmail,
    validarnivelAcesso,
    validarSenha,
    validarSenhaNova,
} from '../utils/validadores';

describe('validadores', () => {
    it('e-mail precisa de arroba e ponto, e campo vazio não estoura', () => {
        expect(validarEmail('ana@exemplo.com')).toBe(true);
        expect(validarEmail('ana@exemplo')).toBe(false);
        expect(validarEmail(undefined)).toBe(false);
    });

    it('login aceita senha antiga curta; conta nova exige 8 caracteres', () => {
        expect(validarSenha('1234')).toBe(true);
        expect(validarSenhaNova('1234567')).toBe(false);
        expect(validarSenhaNova('12345678')).toBe(true);
        expect(validarConfirmacaoSenha('1234', '1234')).toBe(false);
        expect(validarConfirmacaoSenha('segredo-forte', 'segredo-forte')).toBe(true);
    });

    it('nível de acesso só aceita os valores que a API conhece', () => {
        expect(NIVEIS_DE_ACESSO).toEqual(['Cliente', 'Administrador']);
        expect(validarnivelAcesso('Administrador')).toBe(true);
        expect(validarnivelAcesso('administrador')).toBe(false);
        expect(validarnivelAcesso('Dono')).toBe(false);
        expect(validarnivelAcesso('')).toBe(false);
    });

    it('marca e modelo curtos como "VW" e "Up" são aceitos', () => {
        expect(validaMarca('VW')).toBe(true);
        expect(validaModelo('Up')).toBe(true);
        expect(validaMarca(' ')).toBe(false);
    });

    it('valor precisa ser um número positivo', () => {
        expect(validaValor('79990')).toBe(true);
        expect(validaValor('999')).toBe(true);
        expect(validaValor('0')).toBe(false);
        expect(validaValor('abc')).toBe(false);
        expect(validaValor('')).toBe(false);
    });
});

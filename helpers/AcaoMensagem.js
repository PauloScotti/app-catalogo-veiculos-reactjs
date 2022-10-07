export class AcaoMensagem {
    static exibir() {
        document
            .querySelector('.exibir')
            ?.classList.remove('oculto');
    }

    static ocultar() {
        setTimeout(() => {
            document
                .querySelector('.exibir')
                ?.classList.add('oculto');
        }, 1000);
    }
}
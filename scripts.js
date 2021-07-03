class Validator {
    constructor(){
        this.validations = [
            'required',
            'data-min-length',
            'data-max-length',
            'data-only-letters',
        ]
    }

    //inciar a validação de todos os campos
    validate(form){

        //resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');
        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }
        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

       
        //transformar HTMLColletion para Array
        let inputsArray = [...inputs];
        //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input){
            
            //loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++){
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    
                    //transformar data-min-length para minlength
                    //limpa a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invoca o método
                    this[method](input, value);
                }
            }
        }, this);
        
    }

    //transforma o nome "data-min=length" em um nome de método
    //verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue){
        
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se o input passou do limite de caracteres
    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida se o campo tem apenas letras
    onlyletters(input){
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorMessage = 'Este campo só aceita letras';

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }


    onlynumbers(input){
        let re = /^[0-9]+$/;
        let inputValue = input.valur;
        let errorMessage = 'Este campo só aceita números';

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }
    
    //método para imprimir mensagens de erro na tela
    printMessage(input, msg){

        //verifica a quantidade de erros que já possui
        let errorQty = input.parentNode.querySelector('.error-validation');

        if(errorQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
            let inputParent = input.parentNode;
            template.classList.remove('template');
            inputParent.appendChild(template);
        }
    }
    //verifica se o input é requerido
    required(input) {
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = 'Este campo é obrigatório';
            this.printMessage(input, errorMessage);
        }
    }
    //limpa as validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("submit");
let validator = new Validator();

submit.addEventListener('click', function(evento){

    evento.preventDefault();
    validator.validate(form);
})
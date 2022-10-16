import { NotImplementedException } from "../../utils/exceptions.js";

export default class BaseBusiness {
    _validateRequiredFields(data) {
        throw new NotImplementedException(this._validateRequiredFields.name);
    }

    _create(data) {
        throw new NotImplementedException(this._create.name);
    }

    /*
    Padrao do Martin Fowler
    a proposta do padrao e garantir um fluxo de metodos, definindo uma sequencia a ter
    executada

    esse create e a implementacao efetiva do Template Method
    */

    create(data) {
        // validar campos
        // salvar no banco
        const isValid = this._validateRequiredFields(data);
        if (!isValid) throw new Error(`Invalid Data!`);

        return this._create(data);
    }


}

import MongoContainer from "../../MongoContainer.js";
import { Case } from "./Models/case.js";

class CaseContainer extends MongoContainer {
  constructor() {
    super(Case); //llama al constructor del padre, con el schema correspondiente
  }

  async save(obj) { //sobreescribe el metodo padre para agregarle la fecha y hora
    
    const date = new Date().toLocaleDateString(); //en el metodo super.save ya se agrega la fecha a un timestamp. Pero al no estar en el schema no se agrega

    try {
      obj.date = date;
      const data = await super.save(obj);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, obj) {//sobreescribe el metodo padre para mantener la fecha

    try {  
      const caseToEdit = await Case.findOneAndUpdate({ _id: id }, obj);
      if (!caseToEdit) {
        throw new Error('No se encontro el caso');
      }    
      return caseToEdit;
      
    } catch (error) {
      throw error;
    }

    
  }

}

export default CaseContainer

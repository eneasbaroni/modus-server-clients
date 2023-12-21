import ClientContainer from "./MongoDaos/clientDaos.js";
import CaseContainer from "./MongoDaos/caseDaos.js";

const clientDao = new ClientContainer();
const caseDao = new CaseContainer();

export { clientDao, caseDao };







/* let clientDao;
const ClientDao = await (async () => {let {ClientContainer} = await import ('./MongoDaos/clientDaos.js'); return ClientContainer})
clientDao = new ClientDao(); */
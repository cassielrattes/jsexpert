import Util from "../util";

const serviceNameAnchor = '$$serviceName';
const repositoryNameAnchor = '$$repositoryName';

const serviceNameDepAnchor = '$$serviceNameDep';
const repositoryNameDepAnchor = '$$repositoryNameDep';

const componentNameAnchor = '$$componentName';


const template = `
import $$serviceName from '../service/$$serviceNameDep.js';
import $$repositoryName from '../repository/$$repositoryNameDep.js';

export default class $$componentNameFactory {
    static getInstance() {
        const repository = new $$repositoryName();
        const service = new $$serviceName({ repository });
        return service;
    }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
    const txtFile = template
        .replaceAll(repositoryNameDepAnchor, Util.lowerCaseFirstLetter(repositoryName))
        .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
        .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
        .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName));

    return {
        fileName: `${componentName}Factory`,
        template: txtFile
    };
}
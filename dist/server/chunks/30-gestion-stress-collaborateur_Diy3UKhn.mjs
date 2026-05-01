import { c as createContentComponent, a as createGetHeadings, m as markdocConfig, b as assetsConfig, $ as $$Renderer } from './runtime-assets-config_61EWaKzz.mjs';

markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };




const tagComponentMap = {};
const nodeComponentMap = {};

const options = undefined;

const stringifiedAst = "{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[8,9],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[8,9],\"inline\":false,\"attributes\":{},\"children\":[{\"$$mdtype\":\"Node\",\"errors\":[],\"lines\":[8,9],\"inline\":true,\"attributes\":{\"content\":\"La gestion du stress passe par l'identification des sources, l'apprentissage de techniques de relaxation et la création d'une routine saine. Parler à son manager ou chercher un soutien professionnel est aussi important. Les ateliers sur la gestion du stress offrent des stratégies concrètes.\"},\"children\":[],\"type\":\"text\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":8},\"end\":{\"line\":9}}}],\"type\":\"inline\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":8},\"end\":{\"line\":9}}}],\"type\":\"paragraph\",\"annotations\":[],\"slots\":{},\"location\":{\"start\":{\"line\":8},\"end\":{\"line\":9}}}],\"type\":\"document\",\"annotations\":[],\"slots\":{}}";

const getHeadings = createGetHeadings(stringifiedAst, markdocConfig);
const Content = createContentComponent(
	$$Renderer,
	stringifiedAst,
	markdocConfig,
	options,
	tagComponentMap,
	nodeComponentMap,
);

export { Content, getHeadings };

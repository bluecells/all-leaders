import { c as createComponent } from './astro-component_D18ifkih.mjs';
import 'piccolore';
import { H as isHTMLString, c as renderComponent, d as renderTemplate, u as unescapeHTML, n as createHeadAndContent, J as isRelativePath } from './server_Ch2KzOmX.mjs';
import Markdoc$1 from '@markdoc/markdoc';
import { b as renderUniqueStylesheet, c as renderScriptElement } from './_astro_content_jA3o_mh_.mjs';
import Slugger from 'github-slugger';
import 'clsx';
import { $ as $$Image } from './_astro_assets_o34Thgb5.mjs';

function renderTreeNodeToFactoryResult(result, treeNode) {
  if (Array.isArray(treeNode)) {
    return Promise.all(
      treeNode.map(
        (node) => renderComponent(result, "ComponentNode", ComponentNode, { treeNode: node })
      )
    );
  }
  if (treeNode.type === "text") return renderTemplate`${treeNode.content}`;
  const slots = {
    default: () => renderTemplate`${treeNode.children.map(
      (child) => renderComponent(result, "ComponentNode", ComponentNode, { treeNode: child })
    )}`
  };
  if (treeNode.type === "component") {
    let styles = "", links = "", scripts = "";
    if (Array.isArray(treeNode.collectedStyles)) {
      styles = treeNode.collectedStyles.map(
        (style) => renderUniqueStylesheet(result, {
          type: "inline",
          content: style
        })
      ).join("");
    }
    if (Array.isArray(treeNode.collectedLinks)) {
      links = treeNode.collectedLinks.map((link) => {
        return renderUniqueStylesheet(result, {
          type: "external",
          src: link[0] === "/" ? link : "/" + link
        });
      }).join("");
    }
    if (Array.isArray(treeNode.collectedScripts)) {
      scripts = treeNode.collectedScripts.map((script) => renderScriptElement(script)).join("");
    }
    const head = unescapeHTML(styles + links + scripts);
    let headAndContent = createHeadAndContent(
      head,
      renderTemplate`${renderComponent(
        result,
        treeNode.component.name,
        treeNode.component,
        treeNode.props,
        slots
      )}`
    );
    result._metadata.propagators.add({
      init() {
        return headAndContent;
      }
    });
    return headAndContent;
  }
  return renderComponent(result, treeNode.tag, treeNode.tag, treeNode.attributes, slots);
}
const ComponentNode = createComponent({
  factory(result, { treeNode }) {
    return renderTreeNodeToFactoryResult(result, treeNode);
  },
  propagation: "self"
});
async function createTreeNode(node) {
  if (Array.isArray(node)) {
    return Promise.all(node.map((child) => createTreeNode(child)));
  } else if (isHTMLString(node)) {
    return { type: "text", content: node };
  } else if (typeof node === "string" || typeof node === "number") {
    return { type: "text", content: String(node) };
  } else if (node === null || typeof node !== "object" || !Markdoc$1.Tag.isTag(node)) {
    return { type: "text", content: "" };
  }
  const children = await Promise.all(node.children.map((child) => createTreeNode(child)));
  if (typeof node.name === "function") {
    const component = node.name;
    const props = node.attributes;
    return {
      type: "component",
      component,
      props,
      children
    };
  } else if (isPropagatedAssetsModule(node.name)) {
    const { collectedStyles, collectedLinks, collectedScripts } = node.name;
    const component = (await node.name.getMod()).default;
    const props = node.attributes;
    return {
      type: "component",
      component,
      collectedStyles,
      collectedLinks,
      collectedScripts,
      props,
      children
    };
  } else {
    return {
      type: "element",
      tag: node.name,
      attributes: node.attributes,
      children
    };
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

const $$Renderer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Renderer;
  const { stringifiedAst, config } = Astro2.props;
  const ast = Markdoc$1.Ast.fromJSON(stringifiedAst);
  const content = await Markdoc$1.transform(ast, config);
  const treeNode = await createTreeNode(content);
  return renderTemplate`${renderComponent($$result, "ComponentNode", ComponentNode, { "treeNode": treeNode })}`;
}, "/Users/bluecells/Websites/all-leaders/node_modules/@astrojs/markdoc/components/Renderer.astro", void 0);

class MarkdocError extends Error {
  loc;
  title;
  hint;
  frame;
  type = "MarkdocError";
  constructor(props, ...params) {
    super(...params);
    const { title = "MarkdocError", message, stack, location, hint, frame } = props;
    this.title = title;
    if (message) this.message = message;
    this.stack = stack ? stack : this.stack;
    this.loc = location;
    this.hint = hint;
    this.frame = frame;
  }
}
const componentConfigSymbol = /* @__PURE__ */ Symbol.for("@astrojs/markdoc/component-config");

function getSlug(attributes, children, headingSlugger) {
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }
  const textContent = attributes.content ?? getTextContent(children);
  return headingSlugger.slug(textContent);
}
const heading = {
  children: ["inline"],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 }
  },
  transform(node, config) {
    const { level, ...attributes } = node.transformAttributes(config);
    const children = node.transformChildren(config);
    if (!config.ctx?.headingSlugger) {
      throw new MarkdocError({
        message: "Unexpected problem adding heading IDs to Markdoc file. Did you modify the `ctx.headingSlugger` property in your Markdoc config?"
      });
    }
    const slug = getSlug(attributes, children, config.ctx.headingSlugger);
    const render = config.nodes?.heading?.render ?? `h${level}`;
    const tagProps = (
      // For components, pass down `level` as a prop,
      // alongside `__collectHeading` for our `headings` collector.
      // Avoid accidentally rendering `level` as an HTML attribute otherwise!
      typeof render === "string" ? { ...attributes, id: slug } : { ...attributes, id: slug, __collectHeading: true, level }
    );
    return new Markdoc$1.Tag(render, tagProps, children);
  }
};
function setupHeadingConfig() {
  const headingSlugger = new Slugger();
  return {
    ctx: {
      headingSlugger
    },
    nodes: {
      heading
    }
  };
}

async function setupConfig(userConfig = {}, options) {
  let defaultConfig = setupHeadingConfig();
  if (userConfig.extends) {
    for (let extension of userConfig.extends) {
      if (extension instanceof Promise) {
        extension = await extension;
      }
      defaultConfig = mergeConfig(defaultConfig, extension);
    }
  }
  let merged = mergeConfig(defaultConfig, userConfig);
  syncTagNodeAttributes(merged);
  return merged;
}
function setupConfigSync(userConfig = {}, options) {
  const defaultConfig = setupHeadingConfig();
  let merged = mergeConfig(defaultConfig, userConfig);
  syncTagNodeAttributes(merged);
  return merged;
}
function mergeConfig(configA, configB) {
  return {
    ...configA,
    ...configB,
    ctx: {
      ...configA.ctx,
      ...configB.ctx
    },
    tags: {
      ...configA.tags,
      ...configB.tags
    },
    nodes: {
      ...configA.nodes,
      ...configB.nodes
    },
    functions: {
      ...configA.functions,
      ...configB.functions
    },
    variables: {
      ...configA.variables,
      ...configB.variables
    },
    partials: {
      ...configA.partials,
      ...configB.partials
    },
    validation: {
      ...configA.validation,
      ...configB.validation
    }
  };
}
function syncTagNodeAttributes(config) {
  const builtinTags = Markdoc$1.tags;
  const builtinNodes = Markdoc$1.nodes;
  for (const name of Object.keys(builtinTags)) {
    if (!(name in builtinNodes)) continue;
    const tagSchema = config.tags[name];
    const nodeSchema = config.nodes[name];
    const tagAttrs = tagSchema?.attributes;
    const nodeAttrs = nodeSchema?.attributes;
    if (!tagAttrs && !nodeAttrs) continue;
    const mergedAttrs = { ...tagAttrs, ...nodeAttrs };
    if (tagSchema) {
      config.tags[name] = { ...tagSchema, attributes: mergedAttrs };
    } else {
      config.tags[name] = { ...builtinTags[name], attributes: mergedAttrs };
    }
    if (nodeSchema) {
      config.nodes[name] = { ...nodeSchema, attributes: mergedAttrs };
    } else {
      config.nodes[name] = { ...builtinNodes[name], attributes: mergedAttrs };
    }
  }
}
function transformRespectsRender(transform, configKey) {
  const source = transform.toString();
  return source.includes(`config.nodes?.${configKey}?.render`) || source.includes(`config.tags?.${configKey}?.render`);
}
function resolveComponentImports(markdocConfig, tagComponentMap, nodeComponentMap) {
  for (const [tag, render] of Object.entries(tagComponentMap)) {
    const config = markdocConfig.tags[tag];
    if (config) {
      config.render = render;
      if (config.transform && !transformRespectsRender(config.transform, tag)) {
        delete config.transform;
      }
    }
  }
  for (const [node, render] of Object.entries(nodeComponentMap)) {
    const config = markdocConfig.nodes[node];
    if (config) {
      config.render = render;
      if (config.transform && !transformRespectsRender(config.transform, node)) {
        delete config.transform;
      }
    }
  }
  return markdocConfig;
}
function getTextContent(childNodes) {
  let text = "";
  for (const node of childNodes) {
    if (typeof node === "string" || typeof node === "number") {
      text += node;
    } else if (typeof node === "object" && Markdoc$1.Tag.isTag(node)) {
      text += getTextContent(node.children);
    }
  }
  return text;
}
const headingLevels = [1, 2, 3, 4, 5, 6];
function collectHeadings(children, collectedHeadings) {
  for (const node of children) {
    if (typeof node !== "object" || !Markdoc$1.Tag.isTag(node)) continue;
    if (node.attributes.__collectHeading === true && typeof node.attributes.level === "number") {
      collectedHeadings.push({
        slug: node.attributes.id,
        depth: node.attributes.level,
        text: getTextContent(node.children)
      });
      continue;
    }
    for (const level of headingLevels) {
      if (node.name === "h" + level) {
        collectedHeadings.push({
          slug: node.attributes.id,
          depth: level,
          text: getTextContent(node.children)
        });
      }
    }
    collectHeadings(node.children, collectedHeadings);
  }
}
function createGetHeadings(stringifiedAst, userConfig, options) {
  return function getHeadings() {
    const config = setupConfigSync(userConfig);
    const ast = Markdoc$1.Ast.fromJSON(stringifiedAst);
    const content = Markdoc$1.transform(ast, config);
    let collectedHeadings = [];
    collectHeadings(Array.isArray(content) ? content : [content], collectedHeadings);
    return collectedHeadings;
  };
}
function createContentComponent(Renderer, stringifiedAst, userConfig, options, tagComponentMap, nodeComponentMap) {
  return createComponent({
    async factory(result, props) {
      const withVariables = mergeConfig(userConfig, { variables: props });
      const config = resolveComponentImports(
        await setupConfig(withVariables),
        tagComponentMap,
        nodeComponentMap
      );
      return renderComponent(result, Renderer.name, Renderer, { stringifiedAst, config }, {});
    },
    propagation: "self"
  });
}

const Markdoc = Markdoc$1;
({ ...Markdoc.nodes});
function defineMarkdocConfig(config) {
  return config;
}
function component(pathnameOrPkgName, namedExport) {
  return {
    type: isNpmPackageName(pathnameOrPkgName) ? "package" : "local",
    path: pathnameOrPkgName,
    namedExport,
    [componentConfigSymbol]: true
  };
}
function isNpmPackageName(pathname) {
  return !isRelativePath(pathname) && !pathname.startsWith("/");
}

const markdocConfig = defineMarkdocConfig({
  tags: {
    Slider: {
      render: component("./src/components/UI/Slider.astro"),
      attributes: {
        height: { type: String, default: "calc(100vh - 7rem)" },
        mobileHeight: { type: String, default: "calc(100vh - 80px)" },
        speed: { type: Number, default: 3e3 },
        images: { type: Array, required: true },
        title: { type: String },
        titleTag: { type: String, default: "h2", matches: ["h1", "h2", "h3", "p", "div"] },
        subtitle: { type: String },
        ctaText: { type: String },
        ctaLink: { type: String },
        framePosition: { type: String, default: "left", matches: ["left", "right"] },
        verticalGap: { type: String, default: "0" }
      }
    },
    Banner: {
      render: component("./src/components/UI/Banner.astro"),
      attributes: {
        title: { type: String },
        subtitle: { type: String },
        background: { type: String, default: "white" },
        height: { type: String, default: "400px" },
        ctaText: { type: String },
        ctaLink: { type: String },
        fullBleed: { type: Boolean, default: false }
      }
    },
    Duo: {
      render: component("./src/components/UI/Duo.astro"),
      children: ["paragraph", "list", "strong", "emphasis", "link", "inline"],
      attributes: {
        title: { type: String },
        ctaText: { type: String },
        ctaLink: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        imagePosition: { type: String, default: "right", matches: ["left", "right"] },
        background: { type: String, default: "transparent" },
        fullBleed: { type: Boolean, default: false },
        height: { type: String },
        heightMatch: { type: Boolean, default: false },
        maxHeight: { type: String, default: "60vh" },
        noBorderPadding: { type: Boolean, default: false }
      }
    },
    SliderSteps: {
      render: component("./src/components/UI/SliderSteps.astro"),
      attributes: {
        id: { type: String, default: "slider-1" },
        steps: {
          type: Array,
          required: true
        }
      }
    },
    CtaButton: {
      render: component("./src/components/UI/CtaButton.astro"),
      attributes: {
        text: { type: String, required: true },
        link: { type: String, required: true },
        align: {
          type: String,
          default: "center",
          matches: ["left", "center", "right"]
        },
        variant: {
          type: String,
          default: "primary",
          matches: ["primary", "secondary"]
        },
        target: {
          type: String,
          default: "_self",
          matches: ["_self", "_blank"]
        }
      }
    },
    Carousel: {
      render: component("./src/components/UI/Carousel.astro"),
      attributes: {
        images: { type: Array, required: true },
        height: { type: String, default: "30vh" },
        speed: { type: Number, default: 5e3 },
        background: { type: String, default: "transparent" },
        spacing: { type: String, default: "1rem" },
        title: { type: String }
      }
    },
    CarouselRooms: {
      render: component("./src/components/UI/CarouselRooms.astro"),
      attributes: {
        height: { type: String, default: "40vh" },
        speed: { type: Number, default: 4e4 },
        background: { type: String, default: "transparent" },
        spacing: { type: String, default: "1rem" },
        showName: { type: Boolean, default: true },
        showPunchline: { type: Boolean, default: true },
        lang: {
          type: String,
          default: "it",
          matches: ["it", "en", "fr"]
        },
        excludeId: { type: String },
        // Utile pour ne pas afficher la chambre actuelle sur sa propre page
        paddingVertical: { type: String, default: "4rem" }
      }
    },
    Hero: {
      render: component("./src/components/UI/Hero.astro"),
      attributes: {
        title: { type: String, default: "Titolo Principale" },
        titleTag: { type: String, default: "h2", matches: ["h1", "h2", "h3", "p", "div"] },
        subtitle: { type: String, default: "Titolo Secondario" },
        ctaText: { type: String, default: "CTA" },
        ctaLink: { type: String, default: "/faq/" },
        secondaryLinkText: { type: String },
        secondaryLinkUrl: { type: String },
        backgroundImage: { type: String, required: true },
        photoCredit: { type: String },
        backgroundPositionX: { type: String, default: "bottom" },
        backgroundPositionY: { type: String, default: "top" },
        backgroundPositionXMobile: { type: String },
        backgroundPositionYMobile: { type: String },
        body: { type: String },
        bgColor: { type: String, default: "bg-indigo-900 dark:bg-indigo-400/10" }
      }
    },
    YouTube: {
      render: component("./src/components/UI/YouTube.astro"),
      attributes: {
        videoId: { type: String, required: true },
        title: { type: String },
        height: { type: String },
        padding: { type: String, default: "0" },
        text: { type: String },
        textPosition: {
          type: String,
          default: "bottom",
          matches: ["top", "bottom", "left", "right"]
        }
      }
    },
    Quadrifoglio: {
      render: component("./src/components/UI/Quadrifoglio.astro"),
      attributes: {
        images: { type: Array, required: true },
        height: { type: String, default: "400px" },
        padding: { type: String, default: "0" },
        text: { type: String },
        textPosition: {
          type: String,
          default: "bottom",
          matches: ["top", "bottom", "left", "right"]
        }
      }
    },
    Grid: {
      render: component("./src/components/UI/Grid.astro"),
      children: ["paragraph", "list", "strong", "emphasis", "link", "inline"],
      attributes: {
        items: { type: Array },
        height: { type: String },
        textColor: { type: String, default: "" },
        hideIcons: { type: Boolean, default: false },
        fullBleed: { type: Boolean, default: false },
        background: { type: String, default: "var(--color-brand-darker)" },
        minWidth: { type: String, default: "0" },
        mobileCols: { type: Number },
        tabletCols: { type: Number },
        xlCols: { type: Number },
        isIcon: { type: Boolean }
      }
    },
    Reviews: {
      render: component("./src/components/UI/Reviews.astro"),
      attributes: {
        reviews: { type: Array },
        columns: { type: Number, default: 3 },
        lang: { type: String, default: "it", matches: ["it", "en", "fr"] }
      }
    },
    InstaCarousel: {
      render: component("./src/components/UI/InstaCarousel.astro"),
      attributes: {
        feedId: { type: String, required: true },
        // Ton ID Behold
        username: { type: String, default: "limolohouse" }
      }
    },
    Strip: {
      render: component("./src/components/UI/Strip.astro"),
      attributes: {
        images: {
          type: Array,
          required: true
          // Note: Markdoc valide les objets dans les tableaux via leur structure
        },
        background: { type: String, default: "transparent" },
        padding: { type: String, default: "2rem" }
      }
    },
    Align: {
      render: component("./src/components/UI/Align.astro"),
      children: ["paragraph", "list", "strong", "emphasis", "link", "inline"],
      attributes: {
        value: {
          type: String,
          default: "left",
          matches: ["left", "center", "right"]
        }
      }
    },
    Table: {
      render: component("./src/components/UI/Table.astro"),
      children: ["paragraph", "list", "strong", "emphasis", "link", "inline"],
      attributes: {
        columns: { type: Array, required: true },
        rows: { type: Array }
      }
    },
    WideImage: {
      render: component("./src/components/UI/WideImage.astro"),
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        caption: { type: String },
        height: { type: String, default: "400px" },
        fullBleed: { type: Boolean, default: false },
        fullWidth: { type: Boolean, default: false },
        photoCredit: { type: String }
      }
    },
    Blog: {
      render: component("./src/components/Blog.astro"),
      attributes: {
        lang: { type: String, default: "it", matches: ["it", "en", "fr"] },
        fullBleed: { type: Boolean, default: false }
      }
    },
    Accordion: {
      render: component("./src/components/UI/Accordion.astro"),
      attributes: {
        items: { type: Array, required: true },
        allowMultiple: { type: Boolean, default: true }
      }
    },
    FaqAccordion: {
      render: component("./src/components/UI/FaqAccordion.astro"),
      attributes: {
        lang: { type: String, default: "it", matches: ["it", "en", "fr"] },
        category: { type: String },
        allowMultiple: { type: Boolean, default: true }
      }
    },
    ContactForm: {
      render: component("./src/components/UI/ContactForm.astro"),
      children: ["paragraph", "heading", "list", "strong", "emphasis", "link", "inline"],
      attributes: {
        formId: { type: String, required: true },
        formPosition: {
          type: String,
          default: "right",
          matches: ["left", "right"]
        },
        buttonText: { type: String, default: "Invia messaggio" }
      }
    },
    GoogleMaps: {
      render: component("./src/components/UI/GoogleMaps.astro"),
      attributes: {
        embedUrl: { type: String, required: true },
        title: { type: String },
        height: { type: String, default: "400px" }
      }
    },
    BookingEngine: {
      render: component("./src/components/UI/BookingEngine.astro"),
      attributes: {
        lang: { type: String, default: "it", matches: ["it", "fr", "en"] }
      }
    },
    SliderBooking: {
      render: component("./src/components/UI/SliderBooking.astro"),
      attributes: {
        height: { type: String, default: "calc(100vh - 7rem)" },
        mobileHeight: { type: String, default: "calc(100vh - 80px)" },
        speed: { type: Number, default: 3e3 },
        images: { type: Array, required: true },
        title: { type: String },
        titleTag: { type: String, default: "h2", matches: ["h1", "h2", "h3", "p", "div"] },
        subtitle: { type: String },
        framePosition: { type: String, default: "left", matches: ["left", "right"] },
        verticalGap: { type: String, default: "0" },
        lang: { type: String, default: "it", matches: ["it", "fr", "en"] }
      }
    },
    NotaBene: {
      render: component("./src/components/UI/NotaBene.astro"),
      attributes: {
        content: { type: String, required: true },
        title: { type: String },
        type: { type: String, default: "info", matches: ["info", "warning", "important"] }
      }
    },
    Container: {
      render: component("./src/components/UI/Container.astro"),
      children: ["paragraph", "heading", "list", "strong", "emphasis", "link", "inline"]
    },
    Link: {
      render: component("./src/components/UI/Link.astro"),
      children: ["text"],
      attributes: {
        href: { type: String, required: true },
        external: { type: Boolean, default: false },
        underline: { type: Boolean, default: true },
        class: { type: String }
      }
    }
  }
});

const assetsConfig = {
  nodes: {
    image: {
      attributes: {
        ...Markdoc$1.nodes.image.attributes,
        __optimizedSrc: { type: "Object" }
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        if (node.type === "image" && "__optimizedSrc" in node.attributes) {
          const { __optimizedSrc, ...rest } = node.attributes;
          return new Markdoc$1.Tag($$Image, { ...rest, src: __optimizedSrc }, children);
        } else {
          return new Markdoc$1.Tag("img", attributes, children);
        }
      }
    }
  }
};

export { $$Renderer as $, createGetHeadings as a, assetsConfig as b, createContentComponent as c, markdocConfig as m };

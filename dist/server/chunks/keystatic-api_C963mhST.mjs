import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { jsxs, jsx } from 'react/jsx-runtime';
import { block, wrapper } from '@keystatic/core/content-components';
import { fields, config as config$1, collection, singleton } from '@keystatic/core';
import { useState, useEffect } from 'react';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const CarouselRooms = block({
  label: "Carousel Camere (Rooms)",
  schema: {
    height: fields.text({
      label: "Altezza (50vh max per formato mobile)",
      defaultValue: "40vh"
    }),
    speed: fields.number({
      label: "Velocità (ms)",
      defaultValue: 4e4
    }),
    background: fields.text({
      label: "Sfondo",
      defaultValue: "transparent"
    }),
    spacing: fields.text({
      label: "Spaziatura",
      defaultValue: "1rem"
    }),
    showName: fields.checkbox({
      label: "Mostra nome",
      defaultValue: true
    }),
    showPunchline: fields.checkbox({
      label: "Mostra punchline",
      defaultValue: true
    }),
    lang: fields.select({
      label: "Lingua",
      options: [
        { label: "Italiano", value: "it" },
        { label: "Francese", value: "fr" },
        { label: "Inglese", value: "en" }
      ],
      defaultValue: "it"
    }),
    excludeId: fields.text({
      label: "Escludi camera (ID)"
    }),
    paddingVertical: fields.text({
      label: "Padding vertical",
      defaultValue: "4rem"
    })
  },
  ContentView: ({ value }) => {
    const showName = value?.showName ?? true;
    const showPunch = value?.showPunchline ?? true;
    const lang = value?.lang || "it";
    const fakeRooms = [
      { name: "Camera 1", punchline: "Eco & Relax", color: "#a8e6cf" },
      { name: "Camera 2", punchline: "Vista Sinis", color: "#b3e5fc" },
      { name: "Camera 3", punchline: "Sardegna autentica", color: "#ffecb3" },
      { name: "Camera 4", punchline: "Romantica", color: "#f8bbd0" },
      { name: "Camera ...", punchline: "Ecologica", color: "#f8bbc" }
    ];
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "1.5rem 0",
          padding: "1rem",
          background: value?.background || "#f8f9fa",
          border: "1px dashed #ccc",
          borderRadius: "8px",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                height: "180px",
                background: "#eee",
                borderRadius: "6px",
                overflow: "hidden",
                display: "flex",
                gap: value?.spacing || "0.8rem",
                padding: "0.5rem"
              },
              children: fakeRooms.map((room, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    flexShrink: 0,
                    width: "140px",
                    height: "100%",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: room.color,
                    position: "relative",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { style: { width: "100%", height: "70%", background: room.color } }),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "0.6rem",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          fontSize: "0.8rem"
                        },
                        children: [
                          showName && /* @__PURE__ */ jsx("div", { style: { fontWeight: 600 }, children: room.name }),
                          showPunch && /* @__PURE__ */ jsx("div", { style: { fontSize: "0.7rem", opacity: 0.9 }, children: room.punchline })
                        ]
                      }
                    )
                  ]
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "0.8rem",
                fontSize: "0.85rem",
                color: "#666",
                textAlign: "center"
              },
              children: [
                lang.toUpperCase(),
                " • Vel: ",
                value?.speed || 4e4,
                "ms"
              ]
            }
          )
        ]
      }
    );
  }
});

const ContactForm = wrapper({
  label: "Formulario di contatto (via Formspree)",
  schema: {
    formId: fields.text({
      label: "Formspree ID",
      description: "Esempio: xeeljwrl (la parte dopo /f/ nell'URL Formspree)",
      validation: { isRequired: true }
    }),
    formPosition: fields.select({
      label: "Posizione del formulario",
      options: [
        { label: "A sinistra (contenuto a destra)", value: "left" },
        { label: "A destra (contenuto a sinistra)", value: "right" }
      ],
      defaultValue: "right"
    }),
    buttonText: fields.text({
      label: "Testo del pulsante",
      defaultValue: "Invia messaggio"
    })
  },
  ContentView: ({ value, children }) => {
    const position = value?.formPosition || "right";
    const btnText = value?.buttonText || "Invia messaggio";
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          margin: "2rem 0",
          padding: "24px",
          background: "#f8f9fa",
          border: "1px dashed #aaa",
          borderRadius: "12px",
          minHeight: "500px"
        },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              "@media (min-width: 768px)": {
                flexDirection: "row",
                gap: "3rem"
              }
            },
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    flex: 1,
                    order: position === "left" ? 2 : 1,
                    padding: "1.5rem",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { style: { color: "#555", fontStyle: "italic", marginBottom: "1rem" }, children: "Contenuto Markdown (slot) :" }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          border: "1px solid #ddd",
                          padding: "16px",
                          borderRadius: "6px",
                          minHeight: "180px",
                          background: "#fff",
                          lineHeight: "1.6"
                        },
                        children: children || /* @__PURE__ */ jsx("em", { style: { color: "#999" }, children: "Qui apparirà il tuo contenuto Markdown (testo, titoli, elenchi...)" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    flex: 1,
                    order: position === "left" ? 1 : 2,
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    padding: "1.5rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxs("div", { style: { color: "#555", fontStyle: "italic", marginBottom: "1rem" }, children: [
                      "Formulario di contatto (Formspree ID: ",
                      value?.formId || "(non definito)",
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxs(
                      "form",
                      {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: "1.2rem"
                        },
                        children: [
                          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
                            /* @__PURE__ */ jsx(
                              "label",
                              {
                                style: {
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  color: "#333",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em"
                                },
                                children: "Nome *"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "text",
                                placeholder: "Il tuo nome",
                                style: {
                                  padding: "0.875rem",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  fontSize: "1rem"
                                },
                                disabled: true
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
                            /* @__PURE__ */ jsx(
                              "label",
                              {
                                style: {
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  color: "#333",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em"
                                },
                                children: "Email *"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "email",
                                placeholder: "La tua email",
                                style: {
                                  padding: "0.875rem",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  fontSize: "1rem"
                                },
                                disabled: true
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
                            /* @__PURE__ */ jsx(
                              "label",
                              {
                                style: {
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  color: "#333",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em"
                                },
                                children: "Telefono"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "tel",
                                placeholder: "Il tuo numero",
                                style: {
                                  padding: "0.875rem",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  fontSize: "1rem"
                                },
                                disabled: true
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
                            /* @__PURE__ */ jsx(
                              "label",
                              {
                                style: {
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  color: "#333",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em"
                                },
                                children: "Oggetto *"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "text",
                                placeholder: "Cosa riguarda il tuo messaggio?",
                                style: {
                                  padding: "0.875rem",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  fontSize: "1rem"
                                },
                                disabled: true
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
                            /* @__PURE__ */ jsx(
                              "label",
                              {
                                style: {
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  color: "#333",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em"
                                },
                                children: "Messaggio *"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "textarea",
                              {
                                rows: 6,
                                placeholder: "Il tuo messaggio...",
                                style: {
                                  padding: "0.875rem",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  fontSize: "1rem",
                                  resize: "vertical",
                                  minHeight: "150px"
                                },
                                disabled: true
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              disabled: true,
                              style: {
                                padding: "1rem 2.5rem",
                                background: "#2e7d32",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                cursor: "not-allowed",
                                opacity: 0.7,
                                alignSelf: "flex-start"
                              },
                              children: btnText
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              style: {
                                padding: "1rem",
                                background: "#e8f5e9",
                                color: "#2d5016",
                                borderLeft: "4px solid #2e7d32",
                                borderRadius: "4px",
                                fontSize: "0.95rem",
                                marginTop: "1rem"
                              },
                              children: "✓ Messaggio inviato con successo! Ti risponderemo presto."
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      }
    );
  }
});

const Duo = wrapper({
  label: "Duo Component",
  schema: {
    title: fields.text({ label: "Titolo", defaultValue: "Titolo Principale" }),
    image: fields.image({
      label: "Immagina",
      directory: "public/images/content",
      publicPath: "/images/content/"
    }),
    imageAlt: fields.text({ label: "Descrizione SEO Immagine (Alt)" }),
    imagePosition: fields.select({
      label: "Posizione Immagine",
      options: [
        { label: "Sinistra", value: "left" },
        { label: "Destra", value: "right" }
      ],
      defaultValue: "right"
    }),
    ctaText: fields.text({ label: "Testo del CTA", defaultValue: "CTA text" }),
    ctaLink: fields.text({ label: "Link del CTA", defaultValue: "#" }),
    background: fields.text({ label: "Colore di sfondo", defaultValue: "transparent" }),
    fullBleed: fields.checkbox({ label: "Full Bleed?", defaultValue: false }),
    heightMatch: fields.checkbox({ label: "Height Match?", defaultValue: false }),
    maxHeight: fields.text({ label: "Altezza massima", defaultValue: "60vh" }),
    noBorderPadding: fields.checkbox({ label: "No Border Padding?", defaultValue: false }),
    content: fields.child({
      kind: "block",
      placeholder: "Contenuto dello slot...",
      formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
      links: "inherit"
    })
  },
  ContentView: ({ value, children }) => {
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
      if (!value?.image?.data) {
        setImageSrc(null);
        return;
      }
      const blob = new Blob([value.image.data], {
        type: `image/${value.image.extension.replace(/^\./, "")}`
        // ex: "webp" → "image/webp"
      });
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }, [value?.image]);
    console.log("[DUO] imageSrc généré :", imageSrc);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
          backgroundColor: value.background === "transparent" ? "#fff" : value.background
        },
        children: [
          /* @__PURE__ */ jsxs("div", { style: { fontWeight: "bold", marginBottom: "8px", borderBottom: "1px solid #eee" }, children: [
            "Duo: ",
            value.title || "(sans titre)",
            " (",
            value.imagePosition || "right",
            ")",
            value.noBorderPadding && /* @__PURE__ */ jsx("span", { style: { color: "#FF6B6B", marginLeft: "8px" }, children: "• No Border Padding" })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: value.imagePosition === "left" ? "row" : "row-reverse",
                gap: "1.5rem",
                alignItems: value.heightMatch ? "stretch" : "flex-start",
                maxHeight: value.maxHeight || "auto",
                overflow: "hidden"
              },
              children: [
                imageSrc ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: imageSrc,
                    alt: value.imageAlt || "Image du Duo",
                    style: {
                      maxWidth: "50%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "4px"
                    },
                    onError: (e) => {
                      console.error("Erreur chargement preview image Duo");
                      e.currentTarget.src = "/images/placeholder-error.png";
                    }
                  }
                ) : /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      width: "50%",
                      minHeight: "200px",
                      background: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #ccc",
                      borderRadius: "4px"
                    },
                    children: /* @__PURE__ */ jsx("em", { children: "Aucune image uploadée" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      flex: 1,
                      border: "2px dashed #ccc",
                      padding: "1rem",
                      minHeight: "120px",
                      background: "#fafafa"
                    },
                    children: children ?? /* @__PURE__ */ jsx("em", { children: "Ajoute du contenu ici..." })
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
});

const Banner = block({
  label: "Banner",
  schema: {
    title: fields.text({
      label: "Titolo",
      validation: { isRequired: true }
    }),
    subtitle: fields.text({
      label: "Sottotitolo"
    }),
    background: fields.text({
      label: "Sfondo",
      defaultValue: "white"
    }),
    height: fields.text({
      label: "Altezza",
      defaultValue: "400px"
    }),
    ctaText: fields.text({
      label: "Testo CTA",
      defaultValue: "CTA"
    }),
    ctaLink: fields.text({
      label: "Link CTA",
      defaultValue: "#"
    }),
    fullBleed: fields.checkbox({
      label: "Piena larghezza",
      defaultValue: false
    })
  },
  ContentView: ({ value }) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          padding: "16px",
          background: value.background || "#eee",
          border: "1px dashed #aaa",
          borderRadius: "8px",
          minHeight: "120px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: "1.3rem", fontWeight: "bold" }, children: [
            "Banner: ",
            value.title || "(manca il titolo)"
          ] }),
          value.subtitle && /* @__PURE__ */ jsx("div", { style: { marginTop: "8px", opacity: 0.8 }, children: value.subtitle }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: "12px", fontSize: "0.9rem", color: "#666" }, children: [
            "Altezza : ",
            value.height || "400px",
            " • Full bleed : ",
            value.fullBleed ? "Sì" : "No"
          ] })
        ]
      }
    );
  }
});

const Slider = block({
  label: "Slider",
  schema: {
    height: fields.text({
      label: "Altezza",
      defaultValue: "calc(100vh - 7rem)"
    }),
    mobileHeight: fields.text({
      label: "Altezza",
      defaultValue: "calc(100vh - 80px)"
    }),
    speed: fields.number({
      label: "Speed (ms)",
      defaultValue: 3e3
    }),
    images: fields.array(
      fields.object({
        image: fields.image({
          label: "Immagina Slider",
          directory: "public/images/slider",
          publicPath: "/images/slider/"
        }),
        alt: fields.text({
          label: "Alt Text"
        })
      }),
      {
        label: "Immagine Slider",
        itemLabel: (props) => props.fields.alt.value || "Immagina Image"
      }
    ),
    title: fields.text({
      label: "Titolo"
    }),
    titleTag: fields.select({
      label: "Livello di titolo",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "paragraph", value: "p" },
        { label: "DIV", value: "div" }
      ],
      defaultValue: "h2"
    }),
    subtitle: fields.text({
      label: "Sottotitolo"
    }),
    ctaText: fields.text({
      label: "Testo CTA"
    }),
    ctaLink: fields.text({
      label: "Link CTA"
    }),
    framePosition: fields.select({
      label: "Posizione del quadro",
      options: [
        { label: "Sinistra", value: "left" },
        { label: "Destra", value: "right" }
      ],
      defaultValue: "left"
    }),
    verticalGap: fields.text({
      label: "Gap verticale tra elementi (es: 1rem, 20px)",
      defaultValue: "0"
    })
  },
  ContentView: ({ value }) => {
    const [previewImages, setPreviewImages] = useState([]);
    useEffect(() => {
      if (!value?.images?.length) {
        setPreviewImages([]);
        return;
      }
      const urls = [];
      value.images.forEach((item) => {
        if (item?.image?.data) {
          const blob = new Blob([item.image.data], {
            type: `image/${item.image.extension.replace(/^\./, "")}`
          });
          const url = URL.createObjectURL(blob);
          urls.push(url);
        }
      });
      setPreviewImages(urls);
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [value?.images]);
    const imageCount = value?.images?.length || 0;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          padding: "16px",
          background: "#f8f9fa",
          border: "1px dashed #999",
          borderRadius: "8px",
          minHeight: "300px",
          position: "relative",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                position: "relative",
                height: value.height || "calc(100vh - 7rem)",
                maxHeight: "400px",
                background: "#eee",
                borderRadius: "6px",
                overflow: "hidden"
              },
              children: [
                previewImages.length > 0 ? /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      height: "100%",
                      transition: "transform 0.5s ease"
                      // Simulation simple d'un seul slide visible
                    },
                    children: previewImages.map((src, index) => /* @__PURE__ */ jsx(
                      "img",
                      {
                        src,
                        alt: value.images[index]?.alt || `Slide ${index + 1}`,
                        style: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          flexShrink: 0
                        },
                        onError: (e) => {
                          e.currentTarget.src = "/images/placeholder-error.png";
                        }
                      },
                      index
                    ))
                  }
                ) : /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ddd",
                      color: "#666",
                      fontSize: "1.1rem"
                    },
                    children: /* @__PURE__ */ jsx("em", { children: "Ajoutez des images au slider" })
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: "50%",
                      [value.framePosition === "left" ? "left" : "right"]: "10%",
                      transform: "translateY(-50%)",
                      maxWidth: "45%",
                      color: "white",
                      textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                      padding: "20px",
                      background: "rgba(0,0,0,0.4)",
                      borderRadius: "8px"
                    },
                    children: [
                      value.title && /* @__PURE__ */ jsx("h2", { style: { fontSize: "2.2rem", margin: "0 0 12px" }, children: value.title }),
                      value.subtitle && /* @__PURE__ */ jsx("p", { style: { fontSize: "1.3rem", margin: "0 0 20px" }, children: value.subtitle }),
                      value.ctaText && /* @__PURE__ */ jsxs(
                        "div",
                        {
                          style: {
                            display: "inline-block",
                            padding: "12px 28px",
                            background: "#007bff",
                            color: "white",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            textDecoration: "none"
                          },
                          children: [
                            value.ctaText,
                            " →"
                          ]
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "12px",
                fontSize: "0.9rem",
                color: "#555",
                textAlign: "center"
              },
              children: [
                imageCount,
                " immagin",
                imageCount !== 1 ? "e" : "a",
                " • Speed: ",
                value.speed || 3e3,
                " ms",
                value.verticalGap && ` • Gap: ${value.verticalGap}`
              ]
            }
          )
        ]
      }
    );
  }
});

const Carousel = block({
  label: "Carousel Component",
  schema: {
    title: fields.text({
      label: "Titolo",
      defaultValue: "Titolo del carousel"
    }),
    images: fields.array(
      fields.object({
        image: fields.image({
          label: "Carousel Image",
          directory: "public/images/carousel",
          publicPath: "/images/carousel/"
        }),
        alt: fields.text({ label: "Alt Text" })
      }),
      {
        label: "Carousel Images",
        itemLabel: (props) => props.fields.alt.value || "Carousel Image"
      }
    ),
    height: fields.text({
      label: "Height",
      defaultValue: "30vh"
    }),
    speed: fields.number({
      label: "Speed (ms)",
      defaultValue: 5e3
    }),
    background: fields.text({
      label: "Background",
      defaultValue: "transparent"
    }),
    spacing: fields.text({
      label: "Spacing",
      defaultValue: "1rem"
    })
  },
  ContentView: ({ value }) => {
    const [previewImages, setPreviewImages] = useState([]);
    useEffect(() => {
      if (!value?.images?.length) {
        setPreviewImages([]);
        return;
      }
      const urls = [];
      value.images.forEach((item) => {
        if (item?.image?.data) {
          const blob = new Blob([item.image.data], {
            type: `image/${item.image.extension.replace(/^\./, "")}`
          });
          const url = URL.createObjectURL(blob);
          urls.push(url);
        }
      });
      setPreviewImages(urls);
      return () => {
        urls.forEach(URL.revokeObjectURL);
      };
    }, [value?.images]);
    const imageCount = value?.images?.length || 0;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          padding: "16px",
          background: value.background || "#f8f9fa",
          border: "1px dashed #999",
          borderRadius: "8px",
          minHeight: "180px"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { style: { fontWeight: "bold", marginBottom: "12px", textAlign: "center" }, children: [
            "Carousel (",
            imageCount,
            " image",
            imageCount !== 1 ? "s" : "",
            ")"
          ] }),
          imageCount === 0 ? /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                height: "120px",
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #ccc",
                borderRadius: "6px",
                color: "#777"
              },
              children: /* @__PURE__ */ jsx("em", { children: "Ajoutez des images au carousel" })
            }
          ) : /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                display: "flex",
                overflowX: "auto",
                gap: value.spacing || "1rem",
                padding: "8px 0",
                height: value.height || "30vh",
                maxHeight: "300px"
              },
              children: previewImages.map((src, index) => /* @__PURE__ */ jsx(
                "img",
                {
                  src,
                  alt: value.images[index]?.alt || `Image ${index + 1}`,
                  style: {
                    height: "100%",
                    width: "auto",
                    objectFit: "cover",
                    borderRadius: "6px",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                  },
                  onError: (e) => {
                    e.currentTarget.src = "/images/placeholder-error.png";
                  }
                },
                index
              ))
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: "12px", fontSize: "0.9rem", color: "#555", textAlign: "center" }, children: [
            "Vitesse : ",
            value.speed || 5e3,
            " ms"
          ] })
        ]
      }
    );
  }
});

const Hero = block({
  label: "Hero Component",
  schema: {
    title: fields.text({
      label: "Title",
      defaultValue: "Titolo Principale"
    }),
    subtitle: fields.text({
      label: "Subtitle",
      defaultValue: "Titolo Secondario"
    }),
    ctaText: fields.text({
      label: "CTA Text",
      defaultValue: "CTA"
    }),
    ctaLink: fields.text({
      label: "CTA Link",
      defaultValue: "/faq-it-limolo/"
    }),
    secondaryLinkText: fields.text({
      label: "Secondary Link Text"
    }),
    secondaryLinkUrl: fields.text({
      label: "Secondary Link URL"
    }),
    backgroundImage: fields.image({
      label: "Background Image",
      directory: "public/images/hero",
      publicPath: "/images/hero/"
    }),
    photoCredit: fields.text({
      label: "Photo Credit"
    }),
    backgroundPositionX: fields.text({
      label: "Background Position X",
      defaultValue: "bottom"
    }),
    minWidth: fields.text({
      label: "Min Width",
      defaultValue: "300px"
    })
  },
  ContentView: ({ value }) => {
    const [bgSrc, setBgSrc] = useState(null);
    useEffect(() => {
      if (!value?.backgroundImage?.data) {
        setBgSrc(null);
        return;
      }
      const blob = new Blob([value.backgroundImage.data], {
        type: `image/${value.backgroundImage.extension.replace(/^\./, "")}`
      });
      const url = URL.createObjectURL(blob);
      setBgSrc(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }, [value?.backgroundImage]);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          position: "relative",
          minHeight: "300px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px dashed #999",
          background: bgSrc ? `url(${bgSrc}) ${value.backgroundPositionX || "center"} center / cover no-repeat` : "#f0f4f8"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.35)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                textAlign: "center",
                color: "white"
              },
              children: [
                /* @__PURE__ */ jsx("h2", { style: { fontSize: "2rem", margin: "0 0 12px", fontWeight: "bold" }, children: value.title || "Hero Title" }),
                value.subtitle && /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", margin: "0 0 24px", opacity: 0.9 }, children: value.subtitle }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "16px", marginTop: "16px" }, children: [
                  value.ctaText && /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        padding: "12px 24px",
                        background: "#007bff",
                        color: "white",
                        borderRadius: "6px",
                        fontWeight: "bold"
                      },
                      children: [
                        value.ctaText,
                        " →"
                      ]
                    }
                  ),
                  value.secondaryLinkText && /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        padding: "12px 24px",
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                        borderRadius: "6px",
                        border: "1px solid white"
                      },
                      children: value.secondaryLinkText
                    }
                  )
                ] })
              ]
            }
          ),
          value.photoCredit && /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                position: "absolute",
                bottom: "12px",
                right: "16px",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.7)",
                background: "rgba(0,0,0,0.5)",
                padding: "4px 8px",
                borderRadius: "4px"
              },
              children: [
                "Photo : ",
                value.photoCredit
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                position: "absolute",
                bottom: "12px",
                left: "16px",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.6)"
              },
              children: [
                "Min width: ",
                value.minWidth || "300px"
              ]
            }
          )
        ]
      }
    );
  }
});

function getContrastColor(bg) {
  if (!bg || bg === "transparent" || bg.includes("var(")) {
    return "var(--color-text-main, #000)";
  }
  const hexMatch = bg.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!hexMatch) return "var(--color-text-main, #000)";
  const [, r, g, b] = hexMatch;
  const luminance = (0.299 * parseInt(r, 16) + 0.587 * parseInt(g, 16) + 0.114 * parseInt(b, 16)) / 255;
  return luminance > 0.55 ? "var(--color-text-main, #000)" : "var(--color-bg-body, #fff)";
}
const Grid = block({
  label: "Griglia",
  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({ label: "Titolo" }),
        description: fields.text({
          label: "Descrizione",
          description: "Supporta **grassetto**, *italico*, [link](url) e liste con - o *",
          validation: { isRequired: true }
        }),
        media: fields.image({
          label: "Media (icona o immagine)",
          directory: "public/images/grid",
          publicPath: "/images/grid/"
        }),
        isIcon: fields.checkbox({
          label: "Trattare come icona (più piccola e centrata)",
          defaultValue: false
        })
      }),
      {
        label: "Elementi della griglia",
        itemLabel: (props) => props.fields.title.value || "Elemento senza titolo"
      }
    ),
    hideIcons: fields.checkbox({
      label: "Nascondere tutte le immagini / icone",
      defaultValue: false
    }),
    minWidth: fields.text({
      label: "Larghezza minima di un elemento (mobile first)",
      defaultValue: "",
      description: "Usato con auto-fit se non si forza il numero di colonne"
    }),
    mobileCols: fields.number({
      label: "Colonne fisse – Mobile (< 768px)",
      description: "Lascia vuoto per auto-fit",
      validation: { min: 1, max: 6, isRequired: false }
    }),
    tabletCols: fields.number({
      label: "Colonne fisse – Tablet / Desktop (≥ 768px)",
      description: "Lascia vuoto per auto-fit",
      validation: { min: 1, max: 6, isRequired: false }
    }),
    xlCols: fields.number({
      label: "Colonne fisse – Schermo XL (≥ 1600px)",
      description: "Lascia vuoto per auto-fit",
      validation: { min: 1, max: 8, isRequired: false }
    }),
    gap: fields.text({
      label: "Spazio tra gli elementi (gap)",
      defaultValue: "1.5rem"
    }),
    padding: fields.text({
      label: "Padding interno del contenitore",
      defaultValue: "1.5rem"
    }),
    background: fields.text({
      label: "Colore di sfondo del blocco",
      defaultValue: "transparent",
      description: "Hex, rgb, nome colore o transparent"
    }),
    textColor: fields.text({
      label: "Colore testo forzato",
      description: "Se compilato, ignora il calcolo automatico del contrasto",
      defaultValue: ""
    }),
    fullBleed: fields.checkbox({
      label: "Full Bleed (larghezza piena schermo)",
      defaultValue: false
    }),
    additionalClass: fields.text({
      label: "Classe CSS aggiuntiva (sul contenitore griglia)",
      description: "Opzionale"
    })
  },
  ContentView: ({ value }) => {
    const {
      items = [],
      hideIcons = false,
      minWidth = "",
      gap = "1.5rem",
      padding = "1.5rem",
      background = "transparent",
      textColor = "",
      fullBleed = false,
      mobileCols,
      tabletCols,
      xlCols
    } = value || {};
    const itemCount = items.length;
    const autoTextColor = getContrastColor(background);
    const finalTextColor = textColor || autoTextColor;
    const getCols = () => {
      if (mobileCols) return mobileCols;
      if (tabletCols) return tabletCols;
      if (xlCols) return xlCols;
      return "auto-fit";
    };
    const previewStyle = {
      backgroundColor: background,
      color: finalTextColor,
      padding: "1.5rem",
      borderRadius: "8px",
      border: "1px dashed #aaa",
      backgroundImage: background === "transparent" ? "linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)" : void 0,
      backgroundSize: "20px 20px"
    };
    return /* @__PURE__ */ jsxs("div", { style: { padding: "16px" }, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "grid-preview-wrapper",
          style: {
            ...previewStyle,
            width: fullBleed ? "100vw" : "100%",
            maxWidth: fullBleed ? void 0 : "80rem",
            margin: fullBleed ? "0 calc(-50vw + 50%)" : "0 auto",
            position: fullBleed ? "relative" : "static",
            left: fullBleed ? "50%" : void 0
          },
          children: /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: `repeat(${getCols()}, minmax(${minWidth}, 1fr))`,
                gap,
                padding,
                maxWidth: fullBleed ? void 0 : "80rem",
                margin: fullBleed ? "0" : "0 auto"
              },
              children: itemCount === 0 ? /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "2rem",
                    color: "#777",
                    fontStyle: "italic"
                  },
                  children: "Aggiungi elementi alla griglia…"
                }
              ) : items.map((item, index) => /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column"
                  },
                  children: [
                    !hideIcons && item.media?.src && /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          width: "100%",
                          height: item.isIcon ? "100px" : "180px",
                          background: "#eee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8rem",
                          color: "#666"
                        },
                        children: [
                          item.isIcon ? "Icona" : "Immagine",
                          " – ",
                          item.media.filename || "cloud"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          padding: "1.5rem",
                          textAlign: "center",
                          flex: 1
                        },
                        children: [
                          /* @__PURE__ */ jsx(
                            "h3",
                            {
                              style: {
                                margin: "0 0 0.75rem",
                                fontSize: "1.35rem",
                                fontWeight: 600,
                                color: finalTextColor
                              },
                              children: item.title || "(senza titolo)"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              style: {
                                fontSize: "0.95rem",
                                lineHeight: 1.6,
                                color: finalTextColor
                              },
                              dangerouslySetInnerHTML: {
                                __html: item.description || "<em>Descrizione mancante</em>"
                              }
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                index
              ))
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            marginTop: "1rem",
            fontSize: "0.8rem",
            color: "#666",
            textAlign: "center"
          },
          children: [
            "Griglia – ",
            itemCount,
            " elemento",
            itemCount !== 1 ? "i" : "",
            " • ",
            mobileCols || "auto-fit",
            " /",
            " ",
            tabletCols || "auto-fit",
            " / ",
            xlCols || "auto-fit",
            " • sfondo: ",
            background,
            " • testo:",
            " ",
            textColor || "auto"
          ]
        }
      )
    ] });
  }
});

const WideImage = block({
  label: "Wide Image / Full Image",
  schema: {
    src: fields.image({
      label: "Image",
      directory: "public/images/content",
      publicPath: "/images/content/",
      validation: { isRequired: true }
    }),
    alt: fields.text({
      label: "Texte alternatif (SEO / accessibilité)",
      validation: { isRequired: true }
    }),
    height: fields.text({
      label: "Hauteur fixe",
      description: "Exemple : 400px, 60vh, auto… Laissez vide pour hauteur naturelle",
      defaultValue: "400px"
    }),
    fullBleed: fields.checkbox({
      label: "Full Bleed (débordement total largeur)",
      defaultValue: false
    }),
    fullWidth: fields.checkbox({
      label: "Full Width (étiré à 100% de la zone contenu)",
      defaultValue: false
    }),
    photoCredit: fields.text({
      label: "Crédit photo / légende",
      multiline: false
    })
  },
  ContentView: ({ value }) => {
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
      if (!value?.src?.data) {
        setImageSrc(null);
        return;
      }
      const blob = new Blob([value.src.data], {
        type: `image/${value.src.extension.replace(/^\./, "")}`
      });
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
      return () => URL.revokeObjectURL(url);
    }, [value?.src]);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "16px 0",
          border: "1px dashed #999",
          borderRadius: "6px",
          overflow: "hidden",
          background: "#f8f9fa"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                position: "relative",
                height: value.height || "auto",
                minHeight: "200px",
                background: imageSrc ? `url(${imageSrc}) center/cover no-repeat` : "#e9ecef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: [
                !imageSrc && /* @__PURE__ */ jsx("div", { style: { color: "#777", fontStyle: "italic" }, children: "Image Wide – en attente d'upload" }),
                value.photoCredit && /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      bottom: "8px",
                      right: "12px",
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.8rem"
                    },
                    children: value.photoCredit
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                padding: "8px 12px",
                fontSize: "0.9rem",
                color: "#555",
                background: "#fff",
                borderTop: "1px solid #eee"
              },
              children: [
                /* @__PURE__ */ jsx("strong", { children: "WideImage" }),
                " — Alt: ",
                value.alt || "(manquant)",
                /* @__PURE__ */ jsx("br", {}),
                "Height: ",
                value.height || "auto",
                " • FullBleed: ",
                value.fullBleed ? "Oui" : "Non",
                " • FullWidth: ",
                value.fullWidth ? "Oui" : "Non"
              ]
            }
          )
        ]
      }
    );
  }
});

const CtaButton = block({
  label: "Bouton CTA",
  schema: {
    text: fields.text({
      label: "Texte du bouton",
      validation: { isRequired: true },
      defaultValue: "Découvrir"
    }),
    link: fields.text({
      label: "Lien / URL",
      validation: { isRequired: true },
      defaultValue: "/contact"
    }),
    align: fields.select({
      label: "Alignement",
      options: [
        { label: "Gauche", value: "left" },
        { label: "Centre", value: "center" },
        { label: "Droite", value: "right" }
      ],
      defaultValue: "center"
    }),
    variant: fields.select({
      label: "Style du bouton",
      options: [
        { label: "Primaire (plein - vert Limolo)", value: "primary" },
        { label: "Secondaire (contour - épuré)", value: "secondary" }
      ],
      defaultValue: "primary"
    }),
    target: fields.select({
      label: "Ouverture du lien",
      options: [
        { label: "Même onglet (_self)", value: "_self" },
        { label: "Nouvel onglet (_blank)", value: "_blank" }
      ],
      defaultValue: "_self"
    })
  },
  ContentView: ({ value }) => {
    const alignmentMap = {
      left: "flex-start",
      center: "center",
      right: "flex-end"
    };
    const alignValue = alignmentMap[value?.align || "center"];
    const variantStyles = {
      primary: {
        background: "#2e7d32",
        // var(--color-brand-primary) – adapte à ta couleur réelle
        color: "white!important",
        border: "1px solid #2e7d32",
        hoverBg: "#388e3c"
      },
      secondary: {
        background: "transparent",
        color: "#2e7d32",
        border: "1px solid #2e7d32",
        hoverBg: "#2e7d32",
        hoverColor: "white"
      }
    };
    const style = variantStyles[value?.variant || "primary"];
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          margin: "2rem 0",
          padding: "16px",
          background: "#f8f9fa",
          border: "1px dashed #aaa",
          borderRadius: "8px",
          display: "flex",
          justifyContent: alignValue
        },
        children: /* @__PURE__ */ jsx(
          "a",
          {
            href: value?.link || "#",
            target: value?.target || "_self",
            rel: value?.target === "_blank" ? "noopener noreferrer" : void 0,
            style: {
              display: "inline-block",
              padding: "1rem 2.5rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              textDecoration: "none",
              borderRadius: "2px",
              background: style.background,
              color: style.color,
              border: style.border,
              transition: "all 0.3s ease",
              cursor: "pointer",
              width: "auto",
              textAlign: "center"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.background = style.hoverBg;
              if (style.hoverColor) e.currentTarget.style.color = style.hoverColor;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = style.background;
              if (style.hoverColor) e.currentTarget.style.color = style.color;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            },
            children: value?.text || "CTA Manquant"
          }
        )
      }
    );
  }
});

const SliderSteps = block({
  label: "Slider Steps (Tappe illustrate)",
  schema: {
    id: fields.text({
      label: "ID unico (optionale)",
      description: "Solo se più sliders sulla stessa pagina",
      defaultValue: "steps-1"
    }),
    background: fields.text({
      label: "Color dello sfondo",
      defaultValue: "transparent"
    }),
    steps: fields.array(
      fields.object({
        title: fields.text({
          label: "Titolo (handwriting)",
          validation: { isRequired: true }
        }),
        subtitle: fields.text({
          label: "Sottotitolo"
        }),
        description: fields.text({
          label: "Descrizione",
          multiline: true
        }),
        image: fields.image({
          label: "Immagina della tappa",
          directory: "public/images/steps",
          publicPath: "/images/steps/",
          validation: { isRequired: true }
        })
      }),
      {
        label: "Tappe dello slider",
        itemLabel: (props, index) => {
          const t = props.fields.title.value;
          return t ? t.length > 30 ? t.substring(0, 27) + "…" : t : `Tappe ${index + 1}`;
        }
      }
    )
  },
  ContentView: ({ value }) => {
    const [previewImages, setPreviewImages] = useState([]);
    useEffect(() => {
      if (!value?.steps?.length) {
        setPreviewImages([]);
        return;
      }
      const urls = [];
      value.steps.forEach((step) => {
        if (step?.image?.data) {
          const blob = new Blob([step.image.data], {
            type: `image/${step.image.extension.replace(/^\./, "")}`
          });
          urls.push(URL.createObjectURL(blob));
        } else {
          urls.push("");
        }
      });
      setPreviewImages(urls);
      return () => urls.forEach((url) => url && URL.revokeObjectURL(url));
    }, [value?.steps]);
    const bgColor = value?.background || "transparent";
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          margin: "2rem 0",
          padding: "24px",
          background: bgColor === "transparent" ? "#f8f9fa" : bgColor,
          border: "1px dashed #aaa",
          borderRadius: "12px",
          minHeight: "300px"
        },
        children: value?.steps?.length === 0 ? /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777",
              fontStyle: "italic"
            },
            children: "Ajoutez des étapes au slider"
          }
        ) : /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "2rem" }, children: value.steps.map((step, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              alignItems: "flex-start",
              borderBottom: "1px solid #eee",
              paddingBottom: "2rem"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { style: { flex: "1", maxWidth: "45%" }, children: [
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    style: {
                      fontFamily: "cursive",
                      fontSize: "2.2rem",
                      color: "#2e7d32",
                      margin: "0 0 0.5rem"
                    },
                    children: step.title || "Titre manquant"
                  }
                ),
                step.subtitle && /* @__PURE__ */ jsx(
                  "p",
                  {
                    style: {
                      fontSize: "1.3rem",
                      color: "#555",
                      margin: "0 0 1rem",
                      fontStyle: "italic"
                    },
                    children: step.subtitle
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    style: {
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      color: "#444"
                    },
                    children: step.description || "Pas de description"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { style: { flex: "1", maxWidth: "45%", textAlign: "center" }, children: previewImages[index] ? /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: "280px",
                    height: "280px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "6px solid white",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                  },
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: previewImages[index],
                      alt: step.title || `Étape ${index + 1}`,
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      },
                      onError: (e) => {
                        e.currentTarget.src = "/images/placeholder-error.png";
                      }
                    }
                  )
                }
              ) : /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: "280px",
                    height: "280px",
                    margin: "0 auto",
                    borderRadius: "50%",
                    background: "#ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                    fontSize: "0.9rem"
                  },
                  children: "Immagina mancante"
                }
              ) })
            ]
          },
          index
        )) })
      }
    );
  }
});

const FaqAccordion = wrapper({
  label: "Elenco FAQ (contenuto non modificabile)",
  schema: {
    category: fields.text({
      label: "Categoria di FAQ da mostrare",
      description: "Lasciare vuoto per vedere tutte le FAQ in questa lingua"
    }),
    lang: fields.select({
      label: "Lingua delle FAQ",
      options: [
        { label: "Italiano", value: "it" },
        { label: "Français", value: "fr" },
        { label: "English", value: "en" }
      ],
      defaultValue: "it"
    }),
    allowMultiple: fields.checkbox({
      label: "Per aprire più FAQ alla volta",
      defaultValue: true
    })
  },
  ContentView: ({ value, children }) => {
    const lang = value?.lang || "it";
    const category = value?.category || "";
    const allowMultiple = value?.allowMultiple ?? true;
    const fakeFaqs = [
      {
        question: "Come posso prenotare una camera?",
        answer: "Puoi prenotare direttamente dal sito o contattarci via email o WhatsApp."
      },
      {
        question: "Quali sono gli orari di check-in e check-out?",
        answer: "Check-in dalle 15:00, check-out entro le 11:00. Possiamo essere flessibili su richiesta."
      },
      {
        question: "Accettate animali domestici?",
        answer: "Sì, accettiamo animali di piccola taglia con un supplemento."
      },
      {
        question: "Avete parcheggio privato?",
        answer: "Sì, parcheggio gratuito e riservato per gli ospiti."
      }
    ];
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "2rem 0",
          padding: "1.5rem",
          background: "#f8f9fa",
          border: "1px dashed #aaa",
          borderRadius: "8px",
          minHeight: "300px"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { style: { color: "#555", fontStyle: "italic", marginBottom: "1rem" }, children: [
            "Accordion FAQ – Lingua: ",
            lang.toUpperCase(),
            " ",
            category ? `| Catégorie: ${category}` : ""
          ] }),
          fakeFaqs.length === 0 ? /* @__PURE__ */ jsx("div", { style: { textAlign: "center", color: "#777", padding: "2rem" }, children: "Nessuna FAQ in questa lingua" }) : /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "0.75rem" }, children: fakeFaqs.map((faq, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                border: "1px solid #ddd",
                borderRadius: "6px",
                overflow: "hidden",
                background: "white"
              },
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      padding: "1rem 1.2rem",
                      background: index === 0 ? "#e8f5e9" : "#f9fafb",
                      cursor: "pointer",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsx("span", { children: faq.question }),
                      /* @__PURE__ */ jsx("span", { style: { fontSize: "1.2rem", color: "#555" }, children: index === 0 ? "▼" : "▶" })
                    ]
                  }
                ),
                index === 0 && /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      padding: "1rem 1.2rem",
                      background: "#fff",
                      borderTop: "1px solid #eee",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                      color: "#444"
                    },
                    children: faq.answer
                  }
                )
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1rem",
                fontSize: "0.85rem",
                color: "#666",
                textAlign: "center"
              },
              children: [
                "Apertura multiple: ",
                allowMultiple ? "SÌ" : "NO"
              ]
            }
          ),
          children && /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1.5rem",
                padding: "1rem",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px"
              },
              children: [
                /* @__PURE__ */ jsx("em", { style: { color: "#777" }, children: "Contenuto extra (slot, non FAQ):" }),
                /* @__PURE__ */ jsx("div", { style: { marginTop: "0.5rem" }, children })
              ]
            }
          )
        ]
      }
    );
  }
});

const Strip = block({
  label: "Bandeau d'images (Strip)",
  schema: {
    images: fields.array(
      fields.object({
        image: fields.image({
          label: "Image",
          directory: "public/images/strip",
          publicPath: "/images/strip/",
          validation: { isRequired: true }
        }),
        alt: fields.text({
          label: "Texte alternatif (SEO)",
          description: "Décrit l'image pour l'accessibilité et le référencement"
        })
      }),
      {
        label: "Images du bandeau",
        itemLabel: (props) => props.fields.alt.value || "Image sans titre"
      }
    ),
    background: fields.text({
      label: "Couleur de fond",
      defaultValue: "transparent"
    }),
    padding: fields.text({
      label: "Padding vertical",
      defaultValue: "2rem"
    })
  },
  ContentView: ({ value }) => {
    const bg = value?.background || "transparent";
    const padding = value?.padding || "2rem";
    const imageCount = value?.images?.length || 0;
    const fakeImages = [
      { alt: "Logo partenaire 1", color: "#e3f2fd" },
      { alt: "Logo partenaire 2", color: "#e8f5e9" },
      { alt: "Logo partenaire 3", color: "#fff3e0" },
      { alt: "Logo partenaire 4", color: "#f3e5f5" },
      { alt: "Logo partenaire 5", color: "#e0f7fa" }
    ];
    const displayed = fakeImages.slice(0, Math.max(4, imageCount));
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "1.5rem 0",
          padding: "1rem",
          background: bg === "transparent" ? "#f8f9fa" : bg,
          border: "1px dashed #aaa",
          borderRadius: "8px",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                padding: `${padding} 1rem`,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1.5rem",
                justifyItems: "center"
              },
              children: displayed.map((img, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: "100%",
                    maxWidth: "180px",
                    height: "100px",
                    background: img.color,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#555",
                    fontSize: "0.85rem",
                    textAlign: "center",
                    padding: "0.5rem",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                  },
                  children: img.alt || "Image partenaire"
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1rem",
                textAlign: "center",
                color: "#666",
                fontSize: "0.85rem"
              },
              children: [
                imageCount,
                " image",
                imageCount !== 1 ? "s" : "",
                " • Fond : ",
                bg,
                " • Padding : ",
                padding
              ]
            }
          )
        ]
      }
    );
  }
});

const InstaCarousel = block({
  label: "Carousel Instagram (Behold Widget)",
  schema: {
    feedId: fields.text({
      label: "Feed ID Behold",
      description: "ID du flux fourni par Behold.so (ex: bSJr98Y1FpJkxujvmAK8)",
      defaultValue: "bSJr98Y1FpJkxujvmAK8",
      validation: { isRequired: true }
    }),
    username: fields.text({
      label: "Nom d'utilisateur Instagram",
      description: "Ex: limolo.house (sans @)",
      defaultValue: "limolo.house",
      validation: { isRequired: true }
    }),
    background: fields.text({
      label: "Couleur de fond",
      defaultValue: "transparent"
    })
  },
  ContentView: ({ value }) => {
    const feedId = value?.feedId || "xxxxxxxx";
    const username = value?.username || "utilisateur";
    const bg = value?.background || "transparent";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "1.5rem 0",
          padding: "1.5rem",
          background: bg === "transparent" ? "#f8f9fa" : bg,
          border: "1px dashed #aaa",
          borderRadius: "8px",
          minHeight: "180px",
          textAlign: "center"
        },
        children: [
          /* @__PURE__ */ jsx("div", { style: { marginBottom: "1rem", color: "#555", fontStyle: "italic" }, children: "Carousel Instagram (Behold Widget)" }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginBottom: "1.5rem",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#e1306c"
                // rose Instagram
              },
              children: [
                "Instagram @",
                username
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                height: "120px",
                background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "0.9rem",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              },
              children: [
                "Widget Behold – Feed ID: ",
                feedId.substring(0, 8),
                "..."
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1rem",
                fontSize: "0.85rem",
                color: "#666"
              },
              children: [
                "Fond : ",
                bg,
                " • ID : ",
                feedId
              ]
            }
          )
        ]
      }
    );
  }
});

const Reviews = block({
  label: "Témoignages / Avis (Reviews)",
  schema: {
    reviews: fields.array(
      fields.object({
        text: fields.text({
          label: "Texte du témoignage",
          multiline: true,
          validation: { isRequired: true }
        }),
        author: fields.text({
          label: "Auteur / Nom",
          defaultValue: "Client anonyme"
        }),
        date: fields.text({
          label: "Date (optionnel)",
          description: "Ex: 15 juin 2025"
        }),
        iconPosition: fields.select({
          label: "Position de l'icône",
          options: [
            { label: "En haut", value: "top" },
            { label: "À gauche", value: "left" }
          ],
          defaultValue: "top"
        }),
        stars: fields.number({
          label: "Nombre d'étoiles (1–5)",
          defaultValue: 5,
          validation: { isRequired: true, min: 1, max: 5 }
        })
      }),
      {
        label: "Avis / Témoignages",
        itemLabel: (props) => {
          const t = props.fields.text.value;
          return t ? t.length > 30 ? t.substring(0, 27) + "…" : t : `Avis ${props.index + 1}`;
        }
      }
    ),
    columns: fields.number({
      label: "Nombre de colonnes (desktop)",
      defaultValue: 3,
      validation: { min: 1, max: 4 }
    })
  },
  ContentView: ({ value }) => {
    const columns = value?.columns || 3;
    const bg = "#fff";
    const fakeReviews = [
      {
        text: "Posto meraviglioso, accoglienza familiare e attenzione ai dettagli. Torneremo sicuramente!",
        author: "Maria R.",
        date: "10 luglio 2025",
        iconPosition: "top",
        stars: 5
      },
      {
        text: "Séjour inoubliable, tout est parfait : calme, nature, déco éco-chic. Merci !",
        author: "Sophie L.",
        date: "22 juin 2025",
        iconPosition: "left",
        stars: 5
      },
      {
        text: "Amazing place, very sustainable and cozy. Highly recommend!",
        author: "James T.",
        date: "5 juin 2025",
        iconPosition: "top",
        stars: 5
      },
      {
        text: "Un angolo di paradiso in Sardegna, torneremo presto!",
        author: "Luca M.",
        date: "18 maggio 2025",
        iconPosition: "top",
        stars: 5
      }
    ];
    const displayed = fakeReviews.slice(0, Math.max(3, value?.reviews?.length || 0));
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "1.5rem 0",
          padding: "1.5rem",
          background: "#f8f9fa",
          border: "1px dashed #aaa",
          borderRadius: "8px"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: "1rem", color: "#555" }, children: [
            "Sezione recensioni – ",
            columns,
            " colonne"
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: "1.5rem"
              },
              children: displayed.map((rev, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    background: bg,
                    padding: "1.2rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: rev.iconPosition === "left" ? "row" : "column",
                    gap: "1rem",
                    alignItems: rev.iconPosition === "left" ? "flex-start" : "center",
                    textAlign: rev.iconPosition === "left" ? "left" : "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          width: rev.iconPosition === "left" ? "60px" : "50px",
                          height: rev.iconPosition === "left" ? "60px" : "50px",
                          background: "#e0f7fa",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.8rem",
                          flexShrink: 0
                        },
                        children: "★"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs(
                        "p",
                        {
                          style: {
                            fontStyle: "italic",
                            margin: "0 0 0.8rem",
                            lineHeight: "1.5",
                            color: "#444"
                          },
                          children: [
                            '"',
                            rev.text,
                            '"'
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { style: { fontSize: "0.9rem", color: "#666" }, children: [
                        /* @__PURE__ */ jsx("strong", { children: rev.author }),
                        rev.date && /* @__PURE__ */ jsxs("span", { children: [
                          " – ",
                          rev.date
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { style: { marginTop: "0.5rem", color: "#f59e0b" }, children: [
                        "★".repeat(rev.stars),
                        "☆".repeat(5 - rev.stars)
                      ] })
                    ] })
                  ]
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1.2rem",
                textAlign: "center",
                fontSize: "0.85rem",
                color: "#666"
              },
              children: [
                "Colonnes : ",
                columns,
                " • ",
                displayed.length,
                " avis simulés"
              ]
            }
          )
        ]
      }
    );
  }
});

const NotaBene = block({
  label: "Nota Bene / Avviso / Importante",
  schema: {
    title: fields.text({
      label: "Titolo (opzionale)",
      description: 'Es: "Attenzione", "Info utili", "Da sapere"'
    }),
    content: fields.text({
      label: "Contenuto del blocco",
      multiline: true,
      validation: { isRequired: true },
      description: "Testo del messaggio. Puoi usare Markdown semplice: **grassetto**, *corsivo*, link [testo](url), ecc."
    }),
    type: fields.select({
      label: "Tipo di nota",
      options: [
        { label: "Info (verde)", value: "info" },
        { label: "Avviso (giallo)", value: "warning" },
        { label: "Importante (rosso)", value: "important" }
      ],
      defaultValue: "info"
    }),
    class: fields.text({
      label: "Classe CSS aggiuntiva (opzionale)"
    })
  },
  ContentView: ({ value }) => {
    const title = value?.title || "";
    const content = value?.content || "Contenuto mancante";
    const type = value?.type || "info";
    const typeStyles = {
      info: {
        borderColor: "#4a6741",
        // verde Limolo
        backgroundColor: "rgba(74, 103, 65, 0.05)",
        textColor: "#4a6741"
      },
      warning: {
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.05)",
        textColor: "#92400e"
      },
      important: {
        borderColor: "#dc2626",
        backgroundColor: "rgba(220, 38, 38, 0.05)",
        textColor: "#7f1d1d"
      }
    };
    const style = typeStyles[type];
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "1.5rem 0",
          padding: "1.5rem",
          borderLeft: `4px solid ${style.borderColor}`,
          backgroundColor: style.backgroundColor,
          borderRadius: "4px",
          color: style.textColor,
          minHeight: "120px",
          fontSize: "0.95rem",
          lineHeight: "1.6"
        },
        children: [
          title && /* @__PURE__ */ jsx(
            "h4",
            {
              style: {
                fontFamily: "serif",
                fontSize: "1.1rem",
                fontWeight: 600,
                margin: "0 0 0.75rem",
                color: style.textColor
              },
              children: title
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                color: style.textColor
              },
              dangerouslySetInnerHTML: {
                __html: content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/__(.+?)__/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/_(.+?)_/g, "<em>$1</em>").replace(/\\n/g, "<br/>").replace(/\n/g, "<br/>")
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1rem",
                fontSize: "0.85rem",
                color: "#666",
                opacity: 0.8,
                textAlign: "right"
              },
              children: [
                "Tipo: ",
                type === "info" ? "Info" : type === "warning" ? "Avviso" : "Importante"
              ]
            }
          )
        ]
      }
    );
  }
});

const YouTube = block({
  label: "Video YouTube (con preview)",
  schema: {
    videoId: fields.text({
      label: "ID del video YouTube",
      description: "La parte dopo ?v= nell'URL (es: dQw4w9WgXcQ)",
      validation: { isRequired: true }
    }),
    title: fields.text({
      label: "Titolo del video (opzionale)",
      description: "Mostrato come testo alternativo e tooltip",
      defaultValue: "Video YouTube"
    }),
    height: fields.text({
      label: "Altezza del video",
      description: "Es: 400px, 500px, 60vh… Lascia vuoto per proporzione 16:9 automatica",
      defaultValue: "400px"
    }),
    padding: fields.text({
      label: "Padding verticale del contenitore",
      defaultValue: "2rem 0"
    }),
    text: fields.text({
      label: "Testo descrittivo accanto al video (opzionale)",
      multiline: true,
      description: "Testo che appare a sinistra/destra o sopra/sotto il video"
    }),
    textPosition: fields.select({
      label: "Posizione del testo",
      options: [
        { label: "Sopra", value: "top" },
        { label: "Sotto", value: "bottom" },
        { label: "A sinistra", value: "left" },
        { label: "A destra", value: "right" }
      ],
      defaultValue: "bottom"
    })
  },
  ContentView: ({ value }) => {
    const videoId = value?.videoId || "dQw4w9WgXcQ";
    const title = value?.title || "Video YouTube";
    const height = value?.height || "400px";
    const padding = value?.padding || "2rem 0";
    const text = value?.text || "";
    const textPos = value?.textPosition || "bottom";
    const isHorizontal = textPos === "left" || textPos === "right";
    const flexDir = textPos === "left" ? "row-reverse" : textPos === "right" ? "row" : textPos === "top" ? "column-reverse" : "column";
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "2rem 0",
          padding,
          background: "#f8f9fa",
          border: "1px dashed #aaa",
          borderRadius: "8px",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: flexDir,
                gap: "2rem",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap"
              },
              children: [
                text && /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      flex: 1,
                      maxWidth: isHorizontal ? "40%" : "100%",
                      textAlign: "center",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      color: "#444"
                    },
                    children: text
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      flex: 1,
                      maxWidth: isHorizontal ? "55%" : "100%",
                      position: "relative",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    },
                    children: [
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          style: {
                            width: "100%",
                            height,
                            background: "#000",
                            position: "relative"
                          },
                          children: [
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: thumbnailUrl,
                                alt: title,
                                style: {
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  opacity: 0.85
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                style: {
                                  position: "absolute",
                                  inset: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(0,0,0,0.4)"
                                },
                                children: /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      width: "80px",
                                      height: "80px",
                                      background: "#ff0000",
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      boxShadow: "0 0 20px rgba(255,0,0,0.5)"
                                    },
                                    children: /* @__PURE__ */ jsx("svg", { width: "40", height: "40", viewBox: "0 0 24 24", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) })
                                  }
                                )
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            padding: "0.8rem",
                            textAlign: "center",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "#333"
                          },
                          children: title
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1rem",
                fontSize: "0.85rem",
                color: "#666",
                textAlign: "center"
              },
              children: [
                "Video ID: ",
                videoId,
                " • Posizione testo: ",
                textPos,
                " • Altezza: ",
                height
              ]
            }
          )
        ]
      }
    );
  }
});

const GoogleMaps = block({
  label: "Mappa integrata",
  schema: {
    embedUrl: fields.text({
      label: "URL di integrazione (src iframe)",
      description: "Copia-incolla l'URL src dell'iframe da Google Maps, OpenStreetMap, ecc.",
      validation: { isRequired: true }
    }),
    title: fields.text({
      label: "Titolo sopra la mappa (opzionale)",
      description: 'Es: "Dove siamo", "Localizzazione Limolo House"'
    }),
    height: fields.text({
      label: "Altezza della mappa",
      description: "Es: 400px, 500px, 60vh…",
      defaultValue: "400px"
    }),
    class: fields.text({
      label: "Classe CSS aggiuntiva (opzionale)"
    })
  },
  ContentView: ({ value }) => {
    const embedUrl = value?.embedUrl || "https://www.google.com/maps/embed?...";
    const title = value?.title || "";
    const height = value?.height || "400px";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "1.5rem 0",
          padding: "1rem",
          background: "#f8f9fa",
          border: "1px dashed #aaa",
          borderRadius: "8px",
          overflow: "hidden"
        },
        children: [
          title && /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#2e7d32",
                marginBottom: "1rem",
                textAlign: "center"
              },
              children: title
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                width: "100%",
                height,
                background: "#e0e0e0",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
                fontSize: "0.9rem",
                textAlign: "center",
                position: "relative"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { style: { maxWidth: "80%" }, children: [
                  "Mappa integrata (iframe)",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsxs("small", { style: { opacity: 0.7 }, children: [
                    "URL: ",
                    embedUrl.substring(0, 40),
                    "..."
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "3rem",
                      color: "#4285f4",
                      opacity: 0.6
                    },
                    children: "🗺️"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1rem",
                fontSize: "0.85rem",
                color: "#666",
                textAlign: "center"
              },
              children: [
                "Altezza: ",
                height,
                " • ID: ",
                value?.formId ? "non applicabile" : "embed iframe"
              ]
            }
          )
        ]
      }
    );
  }
});

const Accordion = block({
  label: "Accordéon (FAQ o sezioni espandibili)",
  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({
          label: "Titolo della sezione",
          validation: { isRequired: true }
        }),
        content: fields.text({
          label: "Contenuto della sezione",
          multiline: true,
          validation: { isRequired: true },
          description: "Testo espandibile. Supporta Markdown semplice: **grassetto**, *corsivo*, link [testo](url), \\n per a capo."
        })
      }),
      {
        label: "Voci dell'accordéon",
        itemLabel: (props) => {
          const t = props.fields.title.value;
          return t ? t.length > 30 ? t.substring(0, 27) + "…" : t : "Voce";
        }
      }
    ),
    allowMultiple: fields.checkbox({
      label: "Permettere più sezioni aperte contemporaneamente",
      defaultValue: true
    })
  },
  ContentView: ({ value }) => {
    const items = value?.items || [];
    const allowMultiple = value?.allowMultiple ?? true;
    const fakeItems = items.length > 0 ? items.slice(0, 3) : [
      {
        title: "Come posso prenotare?",
        content: "Puoi prenotare direttamente dal sito o contattarci via email o WhatsApp.\n\n**Requisiti:** passaporto o carta d’identità valida."
      },
      {
        title: "Orari di check-in e check-out?",
        content: "Check-in dalle 15:00\nCheck-out entro le 11:00\nPossiamo essere flessibili su richiesta."
      },
      {
        title: "Accettate animali domestici?",
        content: "Sì, accettiamo animali di piccola taglia con un piccolo supplemento."
      }
    ];
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "2rem 0",
          padding: "1.5rem",
          background: "#f8f9fa",
          border: "1px dashed #aaa",
          borderRadius: "8px",
          minHeight: "300px"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { style: { color: "#555", fontStyle: "italic", marginBottom: "1rem" }, children: [
            "Accordéon – ",
            allowMultiple ? "Più sezioni aperte ok" : "Solo una aperta"
          ] }),
          /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "0.75rem" }, children: fakeItems.map((item, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                border: "1px solid #ddd",
                borderRadius: "6px",
                overflow: "hidden",
                background: "white"
              },
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      padding: "1rem 1.2rem",
                      background: index === 0 ? "#e8f5e9" : "#f9fafb",
                      cursor: "pointer",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsx("span", { children: item.title }),
                      /* @__PURE__ */ jsx("span", { style: { fontSize: "1.2rem", color: "#555" }, children: index === 0 ? "▼" : "▶" })
                    ]
                  }
                ),
                index === 0 && /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      padding: "1rem 1.2rem",
                      background: "#fff",
                      borderTop: "1px solid #eee",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      color: "#444"
                    },
                    dangerouslySetInnerHTML: {
                      __html: item.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/__(.+?)__/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/_(.+?)_/g, "<em>$1</em>").replace(/\\n/g, "<br/>").replace(/\n/g, "<br/>")
                    }
                  }
                )
              ]
            },
            index
          )) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "1rem",
                fontSize: "0.85rem",
                color: "#666",
                textAlign: "center"
              },
              children: [
                "Voci: ",
                fakeItems.length,
                " • Multiplo: ",
                allowMultiple ? "Sì" : "No"
              ]
            }
          )
        ]
      }
    );
  }
});

const Align = wrapper({
  label: "Allineamento testo / contenuto",
  schema: {
    value: fields.select({
      label: "Allineamento",
      description: "Scegli come allineare il contenuto all'interno del blocco",
      options: [
        { label: "Sinistra (default)", value: "left" },
        { label: "Centrato", value: "center" },
        { label: "Destra", value: "right" }
      ],
      defaultValue: "left"
    })
  },
  ContentView: ({ value, children }) => {
    const align = value?.value || "left";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "1.5rem 0",
          padding: "1rem",
          background: "#f8f9fa",
          border: "1px dashed #aaa",
          borderRadius: "8px"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { style: { fontWeight: "bold", marginBottom: "0.8rem", color: "#555" }, children: [
            "Allineamento: ",
            align === "left" ? "Sinistra" : align === "center" ? "Centrato" : "Destra"
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                textAlign: align,
                padding: "1rem",
                background: "white",
                borderRadius: "6px",
                border: "1px solid #ddd",
                minHeight: "80px"
              },
              className: `align-${align}`,
              children: children || /* @__PURE__ */ jsxs("em", { style: { color: "#999" }, children: [
                "Qui apparirà il contenuto allineato (",
                align,
                ")"
              ] })
            }
          )
        ]
      }
    );
  }
});

const BookingEngine = block({
  label: "Booking Engine",
  schema: {
    lang: fields.select({
      label: "Langue",
      options: [
        { label: "Italiano", value: "it" },
        { label: "Français", value: "fr" },
        { label: "English", value: "en" }
      ],
      defaultValue: "it"
    })
  },
  ContentView: ({ value }) => {
    const lang = value?.lang || "it";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          margin: "2rem 0",
          padding: "1.5rem",
          background: "#f0f7ff",
          border: "2px dashed #3b82f6",
          borderRadius: "8px",
          textAlign: "center"
        },
        children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: "2rem", marginBottom: "0.5rem" }, children: "🏨" }),
          /* @__PURE__ */ jsx("div", { style: { fontWeight: 700, fontSize: "1rem", color: "#1e40af" }, children: "Booking Engine — bed-and-breakfast.it" }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: "0.4rem", fontSize: "0.85rem", color: "#555" }, children: [
            "Langue : ",
            /* @__PURE__ */ jsx("strong", { children: lang }),
            " · Struttura ID : 57031"
          ] })
        ]
      }
    );
  }
});

const SliderBooking = block({
  label: "Slider + Booking Engine",
  schema: {
    height: fields.text({
      label: "Altezza",
      defaultValue: "calc(100vh - 7rem)"
    }),
    mobileHeight: fields.text({
      label: "Altezza mobile",
      defaultValue: "calc(100vh - 80px)"
    }),
    speed: fields.number({
      label: "Speed (ms)",
      defaultValue: 3e3
    }),
    images: fields.array(
      fields.object({
        image: fields.image({
          label: "Immagine Slider",
          directory: "public/images/slider",
          publicPath: "/images/slider/"
        }),
        alt: fields.text({
          label: "Alt Text"
        })
      }),
      {
        label: "Immagini Slider",
        itemLabel: (props) => props.fields.alt.value || "Immagine"
      }
    ),
    title: fields.text({
      label: "Titolo"
    }),
    titleTag: fields.select({
      label: "Livello di titolo",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "Paragraph", value: "p" },
        { label: "DIV", value: "div" }
      ],
      defaultValue: "h2"
    }),
    subtitle: fields.text({
      label: "Sottotitolo"
    }),
    framePosition: fields.select({
      label: "Posizione del quadro",
      options: [
        { label: "Sinistra", value: "left" },
        { label: "Destra", value: "right" }
      ],
      defaultValue: "left"
    }),
    verticalGap: fields.text({
      label: "Gap verticale tra elementi (es: 1rem, 20px)",
      defaultValue: "0"
    }),
    lang: fields.select({
      label: "Langue du booking engine",
      options: [
        { label: "Italiano", value: "it" },
        { label: "Français", value: "fr" },
        { label: "English", value: "en" }
      ],
      defaultValue: "it"
    })
  },
  ContentView: ({ value }) => {
    const [previewImages, setPreviewImages] = useState([]);
    useEffect(() => {
      if (!value?.images?.length) {
        setPreviewImages([]);
        return;
      }
      const urls = [];
      value.images.forEach((item) => {
        if (item?.image?.data) {
          const blob = new Blob([item.image.data], {
            type: `image/${item.image.extension.replace(/^\./, "")}`
          });
          const url = URL.createObjectURL(blob);
          urls.push(url);
        }
      });
      setPreviewImages(urls);
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [value?.images]);
    const imageCount = value?.images?.length || 0;
    const lang = value?.lang || "it";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          padding: "16px",
          background: "#f8f9fa",
          border: "1px dashed #999",
          borderRadius: "8px",
          minHeight: "300px",
          position: "relative",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                position: "relative",
                height: "350px",
                background: "#eee",
                borderRadius: "6px",
                overflow: "hidden"
              },
              children: [
                previewImages.length > 0 ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: previewImages[0],
                    alt: value.images[0]?.alt || "Slide 1",
                    style: { width: "100%", height: "100%", objectFit: "cover" }
                  }
                ) : /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ddd",
                      color: "#666",
                      fontSize: "1.1rem"
                    },
                    children: /* @__PURE__ */ jsx("em", { children: "Ajoutez des images au slider" })
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: "16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "90%",
                      background: "rgba(245,241,232,0.92)",
                      borderRadius: "6px",
                      padding: "20px",
                      textAlign: "center"
                    },
                    children: [
                      value.title && /* @__PURE__ */ jsx("div", { style: { fontSize: "1.8rem", fontWeight: 600, marginBottom: "8px" }, children: value.title }),
                      value.subtitle && /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", marginBottom: "16px", color: "#555" }, children: value.subtitle }),
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          style: {
                            padding: "12px",
                            background: "#e8f4ff",
                            border: "2px dashed #3b82f6",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            color: "#1e40af",
                            fontWeight: 600
                          },
                          children: [
                            "🏨 Booking Engine — ",
                            lang.toUpperCase(),
                            " · ID 57031"
                          ]
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                marginTop: "12px",
                fontSize: "0.9rem",
                color: "#555",
                textAlign: "center"
              },
              children: [
                imageCount,
                " immagin",
                imageCount !== 1 ? "e" : "a",
                " • Speed: ",
                value.speed || 3e3,
                " ms • Langue: ",
                lang
              ]
            }
          )
        ]
      }
    );
  }
});

const isProd = process.env.NODE_ENV === "production";
const config = config$1({
  storage: isProd ? {
    kind: "cloud"
  } : {
    kind: "local"
  },
  ...isProd && {
    cloud: {
      project: "blue-cells-editors/limolo"
    }
  },
  singletons: {
    menuIT: singleton({
      label: "Menu IT 🇮🇹",
      path: "src/content/menu/it",
      format: { data: "json" },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Etichetta" }),
            url: fields.text({ label: "URL" }),
            type: fields.select({
              label: "Tipo",
              options: [
                { label: "Link normale", value: "link" },
                { label: "Pulsante CTA", value: "cta" }
              ],
              defaultValue: "link"
            }),
            hasSubmenu: fields.checkbox({ label: "Ha sottomenu?", defaultValue: false }),
            submenu: fields.array(
              fields.object({
                label: fields.text({ label: "Etichetta sottomenu" }),
                url: fields.text({ label: "URL sottomenu" })
              }),
              { label: "Sottomenu", itemLabel: (props) => props.fields.label.value || "Sottomenu" }
            )
          }),
          { label: "Link del menu", itemLabel: (props) => props.fields.label.value || "Link" }
        )
      }
    }),
    menuFR: singleton({
      label: "Menu FR 🇫🇷",
      path: "src/content/menu/fr",
      format: { data: "json" },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Libellé" }),
            url: fields.text({ label: "URL" }),
            type: fields.select({
              label: "Type",
              options: [
                { label: "Lien normal", value: "link" },
                { label: "Bouton CTA", value: "cta" }
              ],
              defaultValue: "link"
            }),
            hasSubmenu: fields.checkbox({ label: "A un sous-menu ?", defaultValue: false }),
            submenu: fields.array(
              fields.object({
                label: fields.text({ label: "Libellé sous-menu" }),
                url: fields.text({ label: "URL sous-menu" })
              }),
              { label: "Sous-menu", itemLabel: (props) => props.fields.label.value || "Sous-menu" }
            )
          }),
          { label: "Liens du menu", itemLabel: (props) => props.fields.label.value || "Lien" }
        )
      }
    }),
    menuEN: singleton({
      label: "Menu EN 🇬🇧",
      path: "src/content/menu/en",
      format: { data: "json" },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            url: fields.text({ label: "URL" }),
            type: fields.select({
              label: "Type",
              options: [
                { label: "Normal link", value: "link" },
                { label: "CTA button", value: "cta" }
              ],
              defaultValue: "link"
            }),
            hasSubmenu: fields.checkbox({ label: "Has submenu?", defaultValue: false }),
            submenu: fields.array(
              fields.object({
                label: fields.text({ label: "Submenu label" }),
                url: fields.text({ label: "Submenu URL" })
              }),
              { label: "Submenu", itemLabel: (props) => props.fields.label.value || "Submenu" }
            )
          }),
          { label: "Menu links", itemLabel: (props) => props.fields.label.value || "Link" }
        )
      }
    }),
    redirects: singleton({
      label: "Redirects",
      path: "src/content/redirects",
      format: { data: "yaml" },
      schema: {
        redirects: fields.array(
          fields.object({
            from: fields.text({ label: "Da (percorso vecchio)" }),
            to: fields.text({ label: "A (percorso nuovo)" }),
            status: fields.select({
              label: "Codice di stato HTTP",
              options: [
                { label: "301 (Permanente)", value: "301" },
                { label: "302 (Temporaneo)", value: "302" }
              ],
              defaultValue: "301"
            }),
            note: fields.text({ label: "Nota (opzionale)", validation: { isRequired: false } })
          }),
          {
            label: "Redirects",
            itemLabel: (props) => `${props.fields.from.value} → ${props.fields.to.value}`
          }
        )
      }
    })
  },
  collections: {
    pages: collection({
      label: "Pages",
      slugField: "title",
      path: "src/content/pages/**",
      columns: ["lang", "title", "seoSlug"],
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Titolo", description: "Titolo della pagina" },
          slug: { label: "Path fisico sul server", description: "Diverso dello slug SEO" }
        }),
        metaTitle: fields.text({ label: "Meta Title" }),
        metaDescription: fields.text({ label: "Meta Description", multiline: true }),
        content: fields.markdoc({
          label: "Contenuto",
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            unorderedList: true,
            orderedList: true,
            link: true,
            divider: true,
            image: { directory: "public/images/content", publicPath: "/images/content/" }
          },
          components: {
            Banner,
            Carousel,
            Duo,
            Grid,
            Hero,
            Slider,
            WideImage,
            CtaButton,
            SliderSteps,
            ContactForm,
            CarouselRooms,
            FaqAccordion,
            Strip,
            InstaCarousel,
            Reviews,
            NotaBene,
            YouTube,
            GoogleMaps,
            Accordion,
            Align,
            BookingEngine,
            SliderBooking
          }
        }),
        lang: fields.select({
          label: "Lingua",
          options: [
            { label: "it", value: "it" },
            { label: "fr", value: "fr" },
            { label: "en", value: "en" }
          ],
          defaultValue: "it"
        }),
        seoSlug: fields.text({ label: "URL SEO definitiva" }),
        jsonType: fields.select({
          label: "Tipo di JSON-LD",
          options: [
            { label: "Page", value: "page" },
            { label: "Articolo di blog", value: "blog" },
            { label: "Faq", value: "faq" },
            { label: "Hotel Room", value: "hotelRoom" }
          ],
          defaultValue: "page"
        }),
        ogImage: fields.image({
          label: "Immagina Open Graph",
          directory: "public/images/content/",
          publicPath: "/images/content/",
          validation: { isRequired: false }
        }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: "Featured Image",
            directory: "public/images/content/",
            publicPath: "/images/content/",
            validation: { isRequired: false }
          }),
          alt: fields.text({
            label: "Alt Text della Featured Image",
            validation: { isRequired: false }
          })
        })
      }
    }),
    "landing-pages": collection({
      label: "Landing Pages",
      slugField: "title",
      path: "src/content/landing-pages/**",
      columns: ["lang", "title", "seoSlug"],
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Titolo", description: "Titolo della landing page" },
          slug: { label: "Path fisico sul server", description: "Diverso dello slug SEO" }
        }),
        metaTitle: fields.text({ label: "Meta Title" }),
        metaDescription: fields.text({ label: "Meta Description", multiline: true }),
        content: fields.markdoc({
          label: "Contenuto",
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            unorderedList: true,
            orderedList: true,
            link: true,
            divider: true,
            image: { directory: "public/images/content", publicPath: "/images/content/" }
          },
          components: {
            Banner,
            Carousel,
            Duo,
            Grid,
            Hero,
            Slider,
            WideImage,
            CtaButton,
            SliderSteps,
            ContactForm,
            CarouselRooms,
            FaqAccordion,
            Strip,
            InstaCarousel,
            Reviews,
            NotaBene,
            YouTube,
            GoogleMaps,
            Accordion,
            Align,
            BookingEngine,
            SliderBooking
          }
        }),
        lang: fields.select({
          label: "Lingua",
          options: [
            { label: "it", value: "it" },
            { label: "fr", value: "fr" },
            { label: "en", value: "en" }
          ],
          defaultValue: "it"
        }),
        seoSlug: fields.text({ label: "URL SEO definitiva" }),
        jsonType: fields.select({
          label: "Tipo di JSON-LD",
          options: [
            { label: "Page", value: "page" },
            { label: "Articolo di blog", value: "blog" },
            { label: "Faq", value: "faq" },
            { label: "Hotel Room", value: "hotelRoom" }
          ],
          defaultValue: "page"
        }),
        ogImage: fields.image({
          label: "Immagina Open Graph",
          directory: "public/images/content/",
          publicPath: "/images/content/",
          validation: { isRequired: false }
        }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: "Featured Image",
            directory: "public/images/content/",
            publicPath: "/images/content/",
            validation: { isRequired: false }
          }),
          alt: fields.text({
            label: "Alt Text della Featured Image",
            validation: { isRequired: false }
          })
        })
      }
    }),
    rooms: collection({
      label: "Rooms",
      slugField: "slug",
      path: "src/content/rooms/**",
      format: { contentField: "content" },
      columns: ["lang", "nameDisplay", "title", "seoSlug"],
      schema: {
        title: fields.text({ label: "Titolo della pagina", validation: { isRequired: true } }),
        seoSlug: fields.text({ label: "Slug SEO", validation: { isRequired: false } }),
        metaTitle: fields.text({ label: "Meta Title", validation: { isRequired: false } }),
        metaDescription: fields.text({ label: "Meta Description", multiline: true }),
        slug: fields.slug({ name: { label: "Slug tecnico della camera" } }),
        roomId: fields.text({
          label: "RoomId sul booking engine",
          validation: { isRequired: true }
        }),
        jsonType: fields.select({
          label: "Tipo di JSON-LD",
          options: [
            { label: "Page", value: "page" },
            { label: "Articolo di blog", value: "blog" },
            { label: "Faq", value: "faq" },
            { label: "Hotel Room", value: "hotelRoom" }
          ],
          defaultValue: "hotelRoom"
        }),
        punchline: fields.text({
          label: "Punchline del carousel",
          validation: { isRequired: false }
        }),
        lang: fields.select({
          label: "Lingua",
          options: [
            { label: "it", value: "it" },
            { label: "fr", value: "fr" },
            { label: "en", value: "en" }
          ],
          defaultValue: "it"
        }),
        nameDisplay: fields.text({ label: "Nome allo schermo", validation: { isRequired: true } }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: "Featured Image",
            directory: "public/images/content/",
            publicPath: "/images/content/",
            validation: { isRequired: false }
          }),
          alt: fields.text({
            label: "Alt Text della Featured Image",
            validation: { isRequired: false }
          })
        }),
        photos: fields.array(
          fields.object({
            image: fields.image({
              label: "Image",
              directory: "public/images/rooms/gallery",
              publicPath: "/images/rooms/gallery/",
              validation: { isRequired: true }
            }),
            alt: fields.text({
              label: "Texte alternatif (SEO)",
              validation: { isRequired: true }
            })
          }),
          {
            label: "Galerie de photos",
            itemLabel: (props) => props.fields.alt.value || "Photo sans titre",
            // Keystatic ne gère pas nativement le .max(6) dans l'UI via validation pour les tableaux,
            // mais tu peux l'indiquer dans l'étiquette pour l'utilisateur.
            description: "Maximum 6 photos pour la galerie."
          }
        ),
        amenity1: fields.text({ label: "Amenity 1", validation: { isRequired: false } }),
        amenity2: fields.text({ label: "Amenity 2", validation: { isRequired: false } }),
        amenity3: fields.text({ label: "Amenity 3", validation: { isRequired: false } }),
        content: fields.markdoc({
          label: "Content",
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            link: true,
            divider: true,
            image: { directory: "public/images/content", publicPath: "/images/content/" }
          },
          components: { Duo }
        })
      }
    }),
    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "src/content/articles/**",
      format: { contentField: "content" },
      columns: ["lang", "title", "category"],
      schema: {
        title: fields.slug({
          name: { label: "Titolo pagina" },
          slug: { label: "SEO-friendly slug" }
        }),
        h1Title: fields.text({ label: "Titolo H1 (fallback su Titolo pagina)" }),
        seoSlug: fields.text({ label: "Slug SEO", validation: { isRequired: false } }),
        metaTitle: fields.text({ label: "Meta Title", validation: { isRequired: false } }),
        metaDescription: fields.text({ label: "Meta Description", multiline: true }),
        ogImage: fields.image({
          label: "Immagina Open Graph",
          directory: "public/images/content/",
          publicPath: "/images/content/",
          validation: { isRequired: false }
        }),
        jsonType: fields.select({
          label: "Tipo di JSON-LD",
          options: [
            { label: "Page", value: "page" },
            { label: "Articolo di blog", value: "blog" },
            { label: "Faq", value: "faq" },
            { label: "Hotel Room", value: "hotelRoom" }
          ],
          defaultValue: "blog"
        }),
        publishDate: fields.date({
          label: "Date de publication",
          description: "La date à laquelle l'article sera affiché comme publié",
          defaultValue: { kind: "today" }
          // Optionnel : sélectionne la date du jour par défaut
        }),
        featured: fields.checkbox({ label: "Articolo in vista", defaultValue: false }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: "Featured Image",
            directory: "public/images/content/",
            publicPath: "/images/content/",
            validation: { isRequired: false }
          }),
          alt: fields.text({
            label: "Alt Text della Featured Image",
            validation: { isRequired: false }
          })
        }),
        // Référence unique à une catégorie (optionnel)
        category: fields.relationship({
          label: "Catégorie principale",
          collection: "categories",
          validation: { isRequired: false }
        }),
        // Tags (références multiples)
        tags: fields.array(
          fields.relationship({
            label: "Tag",
            collection: "tags"
          }),
          {
            label: "Tags",
            itemLabel: (props) => props.value || "Tag sans nom"
          }
        ),
        excerpt: fields.text({ label: "Riassunto", validation: { isRequired: false } }),
        content: fields.markdoc({
          label: "Content",
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            link: true,
            divider: true,
            image: { directory: "public/images/content", publicPath: "/images/content/" }
          },
          components: {
            Banner,
            Carousel,
            Duo,
            Grid,
            Hero,
            Slider,
            WideImage,
            CtaButton,
            SliderSteps,
            ContactForm,
            CarouselRooms,
            FaqAccordion,
            Strip,
            InstaCarousel,
            Reviews,
            NotaBene,
            YouTube,
            GoogleMaps,
            Accordion,
            Align,
            BookingEngine,
            SliderBooking
          }
        }),
        lang: fields.select({
          label: "Lang",
          options: [
            { label: "it", value: "it" },
            { label: "fr", value: "fr" },
            { label: "en", value: "en" }
          ],
          defaultValue: "it"
        })
      }
    }),
    faq: collection({
      label: "FAQ",
      path: "src/content/faq/**",
      format: { contentField: "answer" },
      slugField: "tag_slug",
      schema: {
        question: fields.text({ label: "Domanda" }),
        answer: fields.markdoc({
          label: "Answer",
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            link: true,
            divider: true,
            image: { directory: "public/images/content", publicPath: "/images/content/" }
          },
          components: { Duo }
        }),
        lang: fields.select({
          label: "Lingua",
          options: [
            { label: "IT", value: "it" },
            { label: "FR", value: "fr" },
            { label: "EN", value: "en" }
          ],
          defaultValue: "it"
        }),
        metaTitle: fields.text({ label: "Meta Title", validation: { isRequired: false } }),
        metaDescription: fields.text({ label: "Meta Description", multiline: true }),
        jsonType: fields.select({
          label: "Tipo di JSON-LD",
          options: [
            { label: "Page", value: "page" },
            { label: "Articolo di blog", value: "blog" },
            { label: "Faq", value: "faq" },
            { label: "Hotel Room", value: "hotelRoom" }
          ],
          defaultValue: "faq"
        }),
        category: fields.text({ label: "Categoria", validation: { isRequired: false } }),
        order: fields.number({
          label: "Numero di priorità (0=min)",
          validation: { isRequired: false }
        }),
        tag_slug: fields.slug({
          name: { label: "ID della (nome interno)" },
          slug: { label: "Slug keystatic" }
        })
      }
    }),
    // ────────────────────────────────────────────────
    // 1. Catégories
    categories: collection({
      label: "Catégories 🏷️",
      path: "src/content/categories/*",
      format: { data: "yaml" },
      columns: ["name_it", "name_fr", "name_en"],
      slugField: "tag_slug",
      schema: {
        name_it: fields.text({ label: "🇮🇹 Nome (IT)" }),
        slug_it: fields.text({ label: "🇮🇹 Slug (IT)" }),
        description_it: fields.text({ label: "🇮🇹 Descrizione (IT)", multiline: true }),
        name_fr: fields.text({
          label: "🇫🇷 Nom (FR)",
          validation: { isRequired: true }
        }),
        slug_fr: fields.text({
          label: "🇫🇷 Slug (FR)",
          validation: { isRequired: true }
        }),
        description_fr: fields.text({ label: "🇫🇷 Description (FR)", multiline: true }),
        name_en: fields.text({
          label: "🇬🇧 Name (EN)",
          validation: { isRequired: true }
        }),
        slug_en: fields.text({
          label: "🇬🇧 Slug (EN)",
          validation: { isRequired: true }
        }),
        description_en: fields.text({ label: "🇬🇧 Description (EN)", multiline: true }),
        tag_slug: fields.slug({
          name: { label: "ID del categoria (nome interno)" },
          slug: { label: "Slug keystatic" }
        })
      }
    }),
    // ────────────────────────────────────────────────
    // 2. Tags (étiquettes plus fines)
    tags: collection({
      label: "Tags 🏷️",
      path: "src/content/tags/*",
      format: { data: "yaml" },
      columns: ["name_it", "name_fr", "name_en"],
      slugField: "tag_slug",
      schema: {
        name_it: fields.text({ label: "🇮🇹 Nome (IT)" }),
        slug_it: fields.text({ label: "🇮🇹 Slug (IT)" }),
        description_it: fields.text({ label: "🇮🇹 Descrizione (IT)", multiline: true }),
        name_fr: fields.text({
          label: "🇫🇷 Nom (FR)",
          validation: { isRequired: true }
        }),
        slug_fr: fields.text({
          label: "🇫🇷 Slug (FR)",
          validation: { isRequired: true }
        }),
        description_fr: fields.text({ label: "🇫🇷 Description (FR)", multiline: true }),
        name_en: fields.text({
          label: "🇬🇧 Name (EN)",
          validation: { isRequired: true }
        }),
        slug_en: fields.text({
          label: "🇬🇧 Slug (EN)",
          validation: { isRequired: true }
        }),
        description_en: fields.text({ label: "🇬🇧 Description (EN)", multiline: true }),
        tag_slug: fields.slug({
          name: { label: "ID del tag (nome interno)" },
          slug: { label: "Slug keystatic" }
        })
      }
    })
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import twTranslations from './generated-translations.json';
// kdm (Кодомандри): рядки, яких бракує в перекладах Scratch/TurboWarp для нашої мови, — дані, не код.
import kdmTranslations from './kdm-translations.json';

const addAdditionalTranslations = editorMessages => {
    for (const locale of Object.keys(editorMessages)) {
        const toMixIn = twTranslations[locale.toLowerCase()];
        if (toMixIn) {
            Object.assign(editorMessages[locale], toMixIn);
        }
    }

    for (const locale of Object.keys(kdmTranslations)) {
        if (editorMessages[locale]) Object.assign(editorMessages[locale], kdmTranslations[locale]);
    }

    // We reuse our `es` translations for `es-419` instead of maintaining separate translations.
    Object.assign(editorMessages['es-419'], twTranslations.es);
};

export default addAdditionalTranslations;

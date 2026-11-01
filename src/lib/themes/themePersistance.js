import {BLOCKS_CUSTOM, Theme} from '.';

const STORAGE_KEY = 'tw:theme';

/**
 * @returns {Theme} detected theme
 */
// kdm (Кодомандри, Olexii 01.11): редактор завжди світлий, як у відеоуроках, — налаштування Windows / телефона
// (темний режим, контраст) не враховуємо. Темна тема — лише якщо дитина сама вибере її в меню.
const systemPreferencesTheme = () => Theme.light;

/**
 * @param {function} onChange callback; no guarantees about arguments
 * @returns {function} call to remove event listeners to prevent memory leak
 */
// kdm: системні налаштування не стежимо (див. вище) — слухати нічого.
const onSystemPreferenceChange = () => () => {};

/**
 * @returns {Theme} the theme
 */
// kdm: вибір теми в меню живе до кінця сесії вкладки (sessionStorage), наступного разу — знову світлий.
const detectTheme = () => {
    const systemPreferences = systemPreferencesTheme();

    try {
        const local = sessionStorage.getItem(STORAGE_KEY);

        // Migrate legacy preferences
        if (local === 'dark') {
            return Theme.dark;
        }
        if (local === 'light') {
            return Theme.light;
        }

        const parsed = JSON.parse(local);
        // Any invalid values in storage will be handled by Theme itself
        return new Theme(
            parsed.accent || systemPreferences.accent,
            parsed.gui || systemPreferences.gui,
            parsed.blocks || systemPreferences.blocks
        );
    } catch (e) {
        // ignore
    }

    return systemPreferences;
};

/**
 * @param {Theme} theme the theme
 */
const persistTheme = theme => {
    const systemPreferences = systemPreferencesTheme();
    const nonDefaultSettings = {};

    if (theme.accent !== systemPreferences.accent) {
        nonDefaultSettings.accent = theme.accent;
    }
    if (theme.gui !== systemPreferences.gui) {
        nonDefaultSettings.gui = theme.gui;
    }
    // custom blocks are managed by addon at runtime, don't save here
    if (theme.blocks !== systemPreferences.blocks && theme.blocks !== BLOCKS_CUSTOM) {
        nonDefaultSettings.blocks = theme.blocks;
    }

    if (Object.keys(nonDefaultSettings).length === 0) {
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            // ignore
        }
    } else {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nonDefaultSettings));
        } catch (e) {
            // ignore
        }
    }
};

export {
    onSystemPreferenceChange,
    detectTheme,
    persistTheme
};

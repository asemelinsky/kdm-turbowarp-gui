import {STAGE_DISPLAY_SIZES, SMALL_STAGE_MAX_HEIGHT} from '../lib/layout-constants.js';

const SET_STAGE_SIZE = 'scratch-gui/StageSize/SET_STAGE_SIZE';

// Кодомандри: невисоке вікно — мала сцена з першого кадру (SMALL_STAGE_MAX_HEIGHT).
const isLowWindow = () => typeof window !== 'undefined' && window.innerHeight > 0 &&
    window.innerHeight < SMALL_STAGE_MAX_HEIGHT;

const initialState = {
    stageSize: isLowWindow() ? STAGE_DISPLAY_SIZES.small : STAGE_DISPLAY_SIZES.full
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_STAGE_SIZE:
        return {
            stageSize: action.stageSize
        };
    default:
        return state;
    }
};

const setStageSize = function (stageSize) {
    return {
        type: SET_STAGE_SIZE,
        stageSize: stageSize
    };
};

export {
    reducer as default,
    initialState as stageSizeInitialState,
    setStageSize
};

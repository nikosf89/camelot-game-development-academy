import * as PIXI from "pixi.js-legacy";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import Loader from "./Loader";
import ResizeHandler from "./ResizeHandler";
import { store } from "./store";

export default class App {

    constructor(props) {
        this._createPixiApplication(props);
        this._loadAssets(props);

        this._subscribe();
    }

    _createPixiApplication(props) {
        const { width, height, antialias, canvas, forceCanvas = false, onResize } = props;

        // register the plugin
        gsap.registerPlugin(PixiPlugin);

        // give the plugin a reference to the PIXI object
        PixiPlugin.registerPIXI(PIXI);

        PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.POW2;

        this._app = new PIXI.Application({ width, height, antialias, forceCanvas, view: canvas, powerPreference: "high-performance" });

        ResizeHandler({ width, height, canvas, app: this._app, onResize });
    }

    _loadAssets(props) {
        const loader = new Loader({ ...props, loader: this._app.loader });
        loader.load();
    }

    _createGame() {
        const resources = this._app.loader.resources;

        const bg = new PIXI.Sprite(resources.bg.texture);
        this._app.stage.addChild(bg);
    }

    _state() {
        return store.getState().app;
    }

    _subscribe() {
        const unsubscribeCanRenderGameplay = store.subscribe(() => {
            const assetsAreLoaded = this._state().assetsAreLoaded;
            if (assetsAreLoaded) {
                unsubscribeCanRenderGameplay();
                this._createGame();
            }
        });
    }

}

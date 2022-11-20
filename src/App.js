import * as PIXI from "pixi.js-legacy";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import Loader from "./Loader";
import ResizeHandler from "./ResizeHandler";
import { store } from "./store";
import {Globals} from "./Globals";
import { MainScene } from "./MainScene";

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

        //Define a global object that all files
        //will have access to.
        Globals.resources = resources;
        Globals.centerX = this._app.stage.width/2;
        Globals.centerY = this._app.stage.height/2;
        Globals.width = this._app.stage.width
        Globals.height = this._app.stage.height;
        Globals.winningBoxesPressed = 0;
        Globals.playerBoxesPressed = 0;
        Globals.moneyWon = 0;
        Globals.winningNumbers = [];

        Globals.mainScene = new MainScene();
        this._app.stage.addChild(Globals.mainScene.container);

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

import * as PIXI from "pixi.js-legacy";
import {Globals} from "./Globals";
import { WinningNumber } from "./WinningNumber";
import { PlayerNumber } from "./PlayerNumber";

const min = 1;
const max = 100;

export class MainScene{

    constructor(){
        this.container = new PIXI.Container();
        this.container.x = 0;
        this.container.y = 0;
        this.container.interactive = true;

        this.createLogoGame();
        this.createBgSides();
        this.createInfo();
        this.createGameHolder();
        this.createSettings();
        this.createWinningNumbers();
        this.createPlayerNumbers();
    }

    createLogoGame(){
        this.logoSprite = new PIXI.Sprite(Globals.resources.logoGame.texture);
        this.container.addChild(this.logoSprite);
        this.logoSprite.anchor.set(0.5, 0)
        this.logoSprite.x = Globals.centerX;
        this.logoSprite.y = 0;
    }

    createBgSides(){
        this.bgSideLeft = new PIXI.Sprite(Globals.resources.bgSides.texture);
        this.container.addChild(this.bgSideLeft);
        this.bgSideLeft.anchor.set(0, 1);
        this.bgSideLeft.x = 0;
        this.bgSideLeft.y = Globals.height;

        this.bgSideRight = new PIXI.Sprite(Globals.resources.bgSides2.texture);
        this.container.addChild(this.bgSideRight);
        this.bgSideRight.anchor.set(1,1);
        this.bgSideRight.x = Globals.width;
        this.bgSideRight.y = Globals.height
    }


    createInfo(){
        this.infoSprite = new PIXI.Sprite(Globals.resources.info.texture);
        this.container.addChild(this.infoSprite);
        this.infoSprite.anchor.set(0.5, 0.5);
        this.infoSprite.x = Globals.centerX;
        this.infoSprite.y = Globals.height - 40;
    }

    createGameHolder(){
        this.gameHolderContainer = new PIXI.Container();
        this.gameHolderSprite = new PIXI.Sprite(Globals.resources.gameHolder.texture);
        this.gameHolderContainer.addChild(this.gameHolderSprite);
        this.container.addChild(this.gameHolderContainer);
        this.gameHolderSprite.anchor.set(0.5, 0);
        this.gameHolderSprite.x = Globals.centerX;
        this.gameHolderSprite.y = this.logoSprite.y + this.logoSprite.height;

        this.gameTitleSprite = new PIXI.Sprite(Globals.resources.title.texture);
        this.gameHolderContainer.addChild(this.gameTitleSprite);
        this.gameTitleSprite.anchor.set(0.5,0);
        this.gameTitleSprite.x = Globals.centerX;
        this.gameTitleSprite.y = this.gameHolderSprite.y;  
    }


    createSettings(){
        this.settingsSprite = new PIXI.Sprite(Globals.resources.settings.texture);
        this.container.addChild(this.settingsSprite);
        this.settingsSprite.anchor.set(0,1);
        this.settingsSprite.y = this.gameHolderSprite.height + this.logoSprite.height;
    }

    createWinningNumbers(){
        
        this.winningNumbersContainer = new PIXI.Container();
        this.gameHolderContainer.addChild(this.winningNumbersContainer);
        this.winningNumbersContainer.x = Globals.centerX;
        const height = this.gameHolderSprite.y + 100;

        for (let i=-2; i<3; i++){
            const numBox = new WinningNumber(150*i, height);
            this.winningNumbersContainer.addChild(numBox.container);
            Globals.winningNumbers.push(numBox);
        }

    }


    createPlayerNumbers(){
        this.playerNumbersContainer = new PIXI.Container();
        this.gameHolderContainer.addChild(this.playerNumbersContainer);
        this.playerNumbersContainer.x = Globals.centerX;
        
        for (let i=-4; i<4; i++){
            for (let j=0; j<3; j++){
                let numBox = new PlayerNumber(65*(2*i + 1) , 300 + (2*j+1)*50)
                this.playerNumbersContainer.addChild(numBox.container);
                
            }
        }

    }

}
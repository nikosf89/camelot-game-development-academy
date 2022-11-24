import * as PIXI from "pixi.js-legacy";
import {Globals} from "./Globals";
import { gsap } from "gsap";

const min = 1;
const max = 100;


export class WinningNumber{

    constructor(x, y){
        this.container = new PIXI.Container()
        this.container.sortableChildren = true;
        this.numberBoxSprite = new PIXI.Sprite(Globals.resources.boxBase1.texture);
        this.isPressed = false;
        this.hover = false;

        this.container.x = x;
        this.container.y = y;

        this.container.addChild(this.numberBoxSprite);
        this.numberBoxSprite.interactive = true;
        this.numberBoxSprite.hitArea = new PIXI.Rectangle(-50, -75/2, 100, 75);
        this.numberBoxSprite.buttonMode = true;
        this.numberBoxSprite.anchor.set(0.5);

        

        this.createRotation();
        this.onhover();
        this.onout();
        this.onPressed();
    }


    createRotation(){
        this.sparkleSprite1 = new PIXI.Sprite(Globals.resources.sparkle.texture);
        this.sparkleSprite1.x = -50;
        this.sparkleSprite1.y = -10;
        this.sparkleSprite1.anchor.set(0.5);
        this.sparkleSprite1.scale.set(0.5);

        this.sparkleSprite2 = new PIXI.Sprite(Globals.resources.sparkle.texture);
        this.sparkleSprite2.x = 50
        this.sparkleSprite2.y = 30;
        this.sparkleSprite2.anchor.set(0.5);
        this.sparkleSprite2.scale.set(0.5);

        this.container.addChild(this.sparkleSprite1);
        this.container.addChild(this.sparkleSprite2);

        this.rot1 = gsap.to(this.sparkleSprite1, {rotation: -360, duration: 300, repeat: -1, ease: "none"});
        this.rot2 = gsap.to(this.sparkleSprite2, {rotation: 360, duration: 300, repeat: -1, ease: "none"});

    }


    onhover(){   
        this.numberBoxSprite.on("pointerover", () => {
            if (!this.isPressed){
                this.hover = true;
                this.hilight = new PIXI.Sprite(Globals.resources.boxHilight.texture);
                this.container.addChild(this.hilight);
                this.hilight.anchor.set(0.5)
                this.numberBoxSprite.scale.set(1.05);
                this.hilight.scale.set(1.05);

                this.particleAnimation = setInterval(() => {
                    const particle = new PIXI.Sprite(Globals.resources.particle.texture);
                    const particle2 = new PIXI.Sprite(Globals.resources.particle2.texture);
                    const min = -50;
                    const max = 50;
                    const x1 = Math.floor(Math.random() * (max - min + 1) + min);
                    const x2 = Math.floor(Math.random() * (max - min + 1) + min);
                    particle.x = x1;
                    particle2.x = x2;
                    particle.y = 0;
                    particle2.y = 0;
                    particle.anchor.set(0.5);
                    particle2.anchor.set(0.5);
                    particle2.scale.set(0.5)
                    this.numberBoxSprite.addChild(particle, particle2);
                    this.questionMark = gsap.to(particle2, {y: -40, duration: 1, onComplete: () => {particle2.destroy()} });
                    this.particle = gsap.to(particle, {y: -40, duration: 1, onComplete: () => {particle.destroy()}});
                
                }, 500);
            }
        
        })    
    }


    onout(){
        this.numberBoxSprite.on("pointerout", () => {
            if (!this.isPressed){
                this.hover = false;
                this.hilight.destroy();
                this.numberBoxSprite.scale.set(1);
                clearInterval(this.particleAnimation);
            }
        })
    }


    onPressed(){
        this.numberBoxSprite.on("pointerdown", () => {
            if (!this.isPressed){
                this.isPressed = true;
                clearInterval(this.particleAnimation);
                this.numberBoxSprite.buttonMode = false;
                Globals.winningBoxesPressed += 1;
                

                const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
                this.number = randomNum;

                this.numberText = new PIXI.Text(String(randomNum));
                this.numberText.style = {
                    fontSize: 60,
                    fill: 0xffffff,
                    align: "center",
                    fontFamily: "Helvetica"
                };

                this.numberText.anchor.set(0.5);
                this.numberText.x = 0
                this.numberText.y = 0
                this.numberText.zIndex = 2;
                this.container.addChild(this.numberText);


                this.holder2Sprite = new PIXI.Sprite(Globals.resources.holder2.texture);
                this.holder2Sprite.anchor.set(0.5);
                this.holder2Sprite.x = 0
                this.holder2Sprite.y = 0
                this.container.addChild(this.holder2Sprite);

                this.rot1.kill();
                this.rot2.kill();
                this.sparkleSprite1.destroy();
                this.sparkleSprite2.destroy();
                this.hilight.destroy();
                this.numberBoxSprite.destroy();
            }
                
                
        })          
    }


}
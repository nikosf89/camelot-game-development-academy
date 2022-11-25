import * as PIXI from "pixi.js-legacy";
import {Globals} from "./Globals";
import { gsap } from "gsap";

const amountArray = ["10", "100", "1000", "10000", "100000"];
const min = 1;
const max = 100;


export class PlayerNumber{

    constructor(x, y){
        this.container = new PIXI.Container();
        this.container.sortableChildren = true;
        this.numberBoxSprite = new PIXI.Sprite(Globals.resources.boxBase2.texture);
        this.isPressed = false;
        this.hover = false;

        this.container.x = x;
        this.container.y = y;

        this.container.addChild(this.numberBoxSprite);
        this.numberBoxSprite.interactive = true;
        this.numberBoxSprite.anchor.set(0.5)
        this.numberBoxSprite.hitArea = new PIXI.Rectangle(-50, -75/2, 100, 75);
        this.numberBoxSprite.buttonMode = true;

        this.createRotation();
        this.onHover();
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


    onHover(){ 
        this.numberBoxSprite.on("pointerover", () => {
            if (!this.isPressed){
                this.hover = true;
                this.hilight = new PIXI.Sprite(Globals.resources.boxHilight.texture);
                this.container.addChild(this.hilight);
                this.hilight.anchor.set(0.5)
                this.hilight.y = -5;
                this.numberBoxSprite.scale.set(1.05);
                this.hilight.scale.set(1.1);

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
                if (Globals.winningBoxesPressed === 5){

                    this.numberBoxSprite.buttonMode = false;
                    clearInterval(this.particleAnimation);
                    this.isPressed = true;
                    Globals.playerBoxesPressed++;

        
                    this.prizeAmount = amountArray[Math.floor(Math.random() * amountArray.length)];
                    this.prizeAmountText = new PIXI.Text("€" + this.prizeAmount);
                    this.prizeAmountText.style = {
                        fontSize: 20,
                        fill: 0x00ffff,
                        align: "center",
                        fontFamily: "Helvetica"
                    };
                    this.container.addChild(this.prizeAmountText);
                    this.prizeAmountText.anchor.set(0.5, 1);
                    this.prizeAmountText.zIndex = 2;
                    this.prizeAmountText.x = 0
                    this.prizeAmountText.y = 40


                    this.holder1Sprite = new PIXI.Sprite(Globals.resources.holder1.texture);
                    this.holder1Sprite.anchor.set(0.5);
                    this.holder1Sprite.x = 0
                    this.holder1Sprite.y = 0
                    this.holder1Sprite.scale.set(0.9);
                    this.holder1Sprite.zIndex = 2;
                    this.container.addChild(this.holder1Sprite);

                    if (Math.random() < 0.01){
                        this.number = null;
                        this.symbol = Math.floor(Math.random() * 3 + 1);
                        this.symbolSprite = new PIXI.Sprite(Globals.resources[`symbol${this.symbol}`].texture);
                        this.container.addChild(this.symbolSprite);
                        this.symbolSprite.anchor.set(0.5);
                        this.symbolSprite.x = 0;
                        this.symbolSprite.y = -10;
                        this.symbolSprite.scale.set(0.7);
                        this.symbolSprite.zIndex = 2;
                        this.shimmerAnimation(this.holder1Sprite);
                        
                    }

                    else{
                        this.number = Math.floor(Math.random() * (max - min + 1) + min);
                        this.numberText = new PIXI.Text(String(this.number));
                        this.numberText.style = {
                            fontSize: 50,
                            fill: 0xffffff,
                            align: "center",
                            fontFamily: "Helvetica"
                        };
                        this.container.addChild(this.numberText);
                        this.numberText.anchor.set(0.5);
                        this.numberText.zIndex = 2;
                        this.numberText.x = 0
                        this.numberText.y = -10
                    } 


                    if (!this.number){
                        this.holder1WonSprite = new PIXI.Sprite(Globals.resources.holder1Won.texture);
                        this.container.addChild(this.holder1WonSprite);
                        this.holder1WonSprite.anchor.set(0.5);
                        this.holder1WonSprite.x = this.holder1Sprite.x;
                        this.holder1WonSprite.y = this.holder1Sprite.y;
                        this.holder1WonSprite.width = this.holder1Sprite.width;
                        this.holder1WonSprite.height = this.holder1Sprite.height;
                        this.holder1WonSprite.scale.set(0.9);
                        this.prizeAmountText.style = {fill: 0xffff00, fontSize: 20};
                        if (this.symbol === 1){
                            this.prizeAmountText.text = "€50"; 
                            Globals.moneyWon += 50;
                        }

                        else if (this.symbol === 2){
                            Globals.moneyWon += Number(this.prizeAmount);
                        }
                        else{
                            Globals.moneyWon += 2*Number(this.prizeAmount);
                            
                        }

                    }
               


                    else {
                        Globals.winningNumbers.forEach((elem) => {
                            if (elem.number === this.number){
                                Globals.moneyWon += Number(this.prizeAmount);
                                
                                this.numberText.style = {fill: 0xffff00, fontSize: 50};
                                this.prizeAmountText.style = {fill: 0xffff00, fontSize: 20};
                                this.holder1WonSprite = new PIXI.Sprite(Globals.resources.holder1Won.texture);
                                this.container.addChild(this.holder1WonSprite);
                                this.holder1WonSprite.anchor.set(0.5);
                                this.holder1WonSprite.x = this.holder1Sprite.x;
                                this.holder1WonSprite.y = this.holder1Sprite.y;
                                this.holder1WonSprite.width = this.holder1Sprite.width;
                                this.holder1WonSprite.height = this.holder1Sprite.height;
                                this.holder1WonSprite.scale.set(0.9);
                                this.shimmerAnimation(this.holder1Sprite);
                                

                                this.holder1WonSprite2 = new PIXI.Sprite(Globals.resources.holder1Won.texture);
                                elem.container.addChild(this.holder1WonSprite2);
                                elem.numberText.style = {fill: 0xffff00, fontSize: 60};
                                this.shimmerAnimation(elem.container)
                                this.holder1WonSprite2.anchor.set(0.5);
                                this.holder1WonSprite2.x = elem.numberText.x;
                                this.holder1WonSprite2.y = elem.numberText.y;
                            }

                        
                        })

                    
                    }
               

                    this.rot1.kill();
                    this.rot2.kill();
                    this.sparkleSprite1.destroy();
                    this.sparkleSprite2.destroy();
                    this.hilight.destroy();
                    this.numberBoxSprite.destroy();
                
                }


                if (Globals.playerBoxesPressed === 24){
                    setTimeout(()=> {
                        if (Globals.moneyWon === 0){
                            this.animation = gsap.to(Globals.mainScene.gameHolderContainer, {x: -2000, duration: 2, onComplete: this.onLoss});
                            Globals.mainScene.infoSprite.destroy();
                        }
                        else{
                            this.animation = gsap.to(Globals.mainScene.gameHolderContainer, {x: -2000, duration: 2, onComplete: () => {
                                Globals.mainScene.gameHolderContainer.destroy();
                                Globals.mainScene.finish = new PIXI.Sprite(Globals.resources.finish.texture);
                                Globals.mainScene.container.addChild(Globals.mainScene.finish);
                                Globals.mainScene.finish.anchor.set(0.5)
                                Globals.mainScene.finish.x = Globals.centerX;
                                Globals.mainScene.finish.y = Globals.height - 100;

                                if (Globals.moneyWon > 0 && Globals.moneyWon <= 20){
                                    this.winMessage = new PIXI.Sprite(Globals.resources.esText1.texture);
                                }

                                else if (Globals.moneyWon > 20 && Globals.moneyWon <= 300){
                                    this.winMessage = new PIXI.Sprite(Globals.resources.esText2.texture);
                                }

                                else if (Globals.moneyWon > 300 && Globals.moneyWon <= 6000){
                                    this.winMessage = new PIXI.Sprite(Globals.resources.esText3.texture);
                                }

                                else if (Globals.moneyWon > 6000 && Globals.moneyWon <= 200000){
                                    this.winMessage = new PIXI.Sprite(Globals.resources.esText4.texture);
                                }

                                else{
                                    this.winMessage = new PIXI.Sprite(Globals.resources.esText5.texture);
                                }

                                this.winMessage.anchor.set(0.5, 1);
                                this.winMessage.x = Globals.centerX;
                                this.winMessage.y = Globals.centerY;
                                Globals.mainScene.container.addChild(this.winMessage);

                                this.moneyWonText = new PIXI.Text("€" + String(Globals.moneyWon));
                                this.moneyWonText.style = {
                                    fontSize: 150,
                                    fill: 0xFFBF00,
                                    align: "center",
                                    fontFamily: "Helvetica"
                                };
                                this.moneyWonText.anchor.set(0.5, 0);
                                this.moneyWonText.x = Globals.centerX;
                                this.moneyWonText.y = Globals.centerY;
                                Globals.mainScene.container.addChild(this.moneyWonText);

                                this.coinFalling();
                                }});
                                Globals.mainScene.infoSprite.destroy();
                            }

                            }, 2000)

                }
            }

        })
    }

    onLoss(){
        Globals.mainScene.gameHolderContainer.destroy();
        Globals.mainScene.lossMessage = new PIXI.Sprite(Globals.resources.finishText.texture);
        Globals.mainScene.container.addChild(Globals.mainScene.lossMessage);
        Globals.mainScene.lossMessage.anchor.set(0.5)
        Globals.mainScene.lossMessage.x = Globals.centerX;
        Globals.mainScene.lossMessage.y = Globals.centerY - 20;
       
        Globals.mainScene.finish = new PIXI.Sprite(Globals.resources.finish.texture);
        Globals.mainScene.container.addChild(Globals.mainScene.finish);
        Globals.mainScene.finish.anchor.set(0.5)
        Globals.mainScene.finish.x = Globals.centerX;
        Globals.mainScene.finish.y = Globals.height - 100;
    }


    shimmerAnimation(elem){
        
        const animatedSpriteArray = [];
        for (let i=1; i<2; i++){
            for (let j=1; j<=12; j++){
                animatedSpriteArray.push(Globals.resources[`g2Shimmer${i}${j}`].texture);
            }
        
        }
        
        
        const shimmer = new PIXI.AnimatedSprite(animatedSpriteArray);
        shimmer.anchor.set(0.5)
        elem.addChild(shimmer);
        shimmer.zIndex = 2;
        shimmer.loop = true;
        shimmer.animationSpeed = 0.1;
        shimmer.play();
    
    }


    coinFalling(){
        let duration = 0;
        const coinArray = [];
        for (let i=1; i<=8; i++){
            coinArray.push(Globals.resources[`coin${i}`].texture);
        }
        this.coinAnimation = setInterval(() => {
            if (duration >= 10000){
                return;
            }
            const coinSprite = new PIXI.AnimatedSprite(coinArray);
            Globals.mainScene.container.addChild(coinSprite);
            const min = 0;
            const max = Globals.width;
            const y = -20;
            const x = Math.floor(Math.random() * (max - min + 1) + min);
            coinSprite.x = x;
            coinSprite.anchor.set(1, 0);
            coinSprite.loop = true;
            coinSprite.animationSpeed = 0.1;
            coinSprite.play();
            gsap.to(coinSprite, {y: Globals.height + 50, duration: 5, onComplete: () => {
                coinSprite.destroy();
            }})
            duration += 400;
        }, 400);

    }


}